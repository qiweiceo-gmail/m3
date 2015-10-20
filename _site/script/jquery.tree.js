
!(function(factory) {

  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else {
    factory(jQuery);
  }

})(function ($) {
  'use strict';

  var key = 'seTree';
  var namespace = '';
  var defaults = {
    checkable: false, // 是否显示复选框

    wrapClass: 'orginaze-manage-tree',
    rootKey: 'root',
    primaryKey: 'id',
    text: 'name',
    title: 'name',
    type: 1, // 1: 组织结构树 2: 文件夹树
    childKey: 'children',

    /**
     * 渲染每个节点时，自定义class
     * @param node
     * @return className
     */
    everyClass: function (node) {},

    /**
     * 勾选/取消勾选节点时回调
     * @param node
     */
    check: function (node) {},

    /**
     * 选中节点后回调
     * @param node
     */
    select: function (node) {
            generateTables(node.id,node.name);
           //alert(node.id+"-->"+node.name);
          // $("#equipGroupSpan").text("haha"+node.id); 
          }
  };

  var Tree = function ($target, options, data) {
    this.$target = $target;
    this.options = options;
    this.source = data;
    this.data = {
      root: [],
      resultSet: {}
    };
    this.selectedNode = null;
    this.selectedNodeList = [];
    this.init();
  };

  Tree.prototype = {
    constructor: Tree,

    init: function () {
      this.namespace = 'jQueryTree_' + (key.replace.call(Math.random(), /\D/, '') - 0).toString(32).toUpperCase();
      this.$target.addClass(this.options.wrapClass);
      this.format();
      this.$target.html(this.generate().join(''));

      this.event();
    },

    format: function () {
      var self = this;
      this.data.root = map(this.source[this.options.rootKey], function (node) {
        return self.packageNode(node);
      });
      return this;
    },

    packageNode: function (node) {
      var self = this;
      var primaryKey = this.options.primaryKey;
      var textKey = this.options.text;
      var titleKey = this.options.title;
      var childKey = this.options.childKey;
      var ns = this.namespace;

      var n = {
        $id: ns + '_' + node[primaryKey],
        $name: node[textKey],
        $title: node[titleKey],
        $checked: false,
        $hasChild: false,

        /**
         * 改变节点选中状态
         * @param checked 是否被选中
         * @param repeat 是否迭代到父节点
         * @param childRelated 是否联动子节点
         */
        $changed: function (checked, repeat, childRelated) {
          this.$checked = checked;
          // toggleCheckbox('checkbox_' + this.$id, checked);
          $('#checkbox_' + this.$id).iCheck(checked ? 'check' : 'uncheck');

          self.options.check(this);

          if (this.$hasChild && childRelated) {
            each(self.data.resultSet[this.$id].$children, function (item) {
              console.log('改变子节点');
              item.$changed(checked, false, true);
            });
          }

          if (this.$parentNode && repeat) {
            if (!checked && this.$parentNode.$checked) {
              console.log('取消父节点');
              this.$parentNode.$changed(false, true, false);
            } else {

              var allChecked = map(this.$parentNode.$children, function (item) {
                return item.$checked + 0;
              }).join('').split('1').join('').length === 0;
              if (allChecked && !this.$parentNode.$checked) {
                console.log('勾选父节点，不关联子节点，关联祖先节点');
                this.$parentNode.$changed(true, true, false);
              }
            }
          }
        }
      };

      $.extend(n, node);

      var children = node[childKey];
      if (children && children.length) {
        n.$hasChild = true;
        n.$children = map(children, function (node, index) {
          node.$parentNode = n;
          return self.packageNode(node);
        });
      }

      this.data.resultSet[n.$id] = n;
      return n;
    },

    generate: function () {
      var checkable = this.options.checkable;
      var everyClass = this.options.everyClass;
      var treetype = this.options.type;
      var html = ['<ul class="tree-root">'];
      each(this.data.root, function (node) {
        html = html.concat(render(node, checkable, everyClass, treetype));
      });

      html.push('</ul>');
      return html;
    },

    event: function () {
      var self = this;
      var $wrap = this.$target;
      var resultSet = this.data.resultSet;
      // 收起展开监听
      $wrap.on('click.toggle-switch', '.tree-switch', function (e) {
        var $this = $(this);
        $this.closest('li').toggleClass('opened');
        e.stopPropagation();
      });

      // 选中高亮监听
      $wrap.on('click.select-item', 'a', function () {
        self.select(this.id.split('_')[2]);

        $('#checkbox_' + this.id).iCheck('toggle');
      });

     // 复选框事件
     // $wrap.find(':checkbox').on('change', function () {
     //   var $id = this.id.substring(9);
     //   var node = resultSet[$id];
     //   var checked = this.checked;
     //   node.$changed(checked, true, true);
     // });

      this.$target.find(':checkbox').iCheck({
        checkboxClass: 'icheckbox_square',
        radioClass: 'iradio_square'
      }).on('ifToggled', function () {
        var $id = this.id.substring(9);
       var node = resultSet[$id];
       var checked = this.checked;
       console.log('toggle');
       node.$changed(checked, true, true);
      });

      // $wrap.on('click.checked', '.tree-checkbox', function (e) {
      //   e.stopPropagation();

      //   var $this = $(this);
      //   var checked = false;
      //   if ($this.hasClass('checked')) {
      //     $this.removeClass('checked');
      //   } else {
      //     checked = true;
      //     $this.addClass('checked');
      //   }

      //   var $id = this.id.substring(9);
      //   var node = resultSet[$id];
      //   node.$changed(checked, true, true);
      // });

    },

    /**
     * 选中节点
     * @param id
     */
    select: function (id) {
      var self = this;
      if (arguments.length > 1) {
        for (var i = 0; i < arguments.length; i++) {
          (function (id) {
            // self.$target.find('a.active').removeClass('active');
            $('#' + self.namespace + '_' + id).addClass('active');
            self.selectedNode = self.data.resultSet[self.namespace + '_' + id];
            self.options.select(self.selectedNode);
          })(arguments[i]);
        }
      } else {
        this.$target.find('a.active').removeClass('active');
        $('#' + this.namespace + '_' + id).addClass('active');
        this.selectedNode = this.data.resultSet[this.namespace + '_' + id];
        this.options.select(this.selectedNode);
      }
      return this;
    },

    /**
     * 勾选/取消勾选状态
     * @param id
     * @param checked
     */
    change: function (id, checked) {
      this.data.resultSet[this.namespace + '_' + id].$changed(checked, true, true);
      return this;
    },

    /**
     * 获取选中节点
     * @returns {null|*}
     */
    getSelectedNode: function () {
      return this.selectedNode;
    },

    /**
     * 获取所有已选节点集合
     * @returns {Array}
     */
    getSelectedNodeList: function () {
      var self = this;
      this.selectedNodeList = [];
      for (var key in this.data.resultSet) {
        (function (node) {
          if (node.$checked) {
            self.selectedNodeList.push(node)
          }
        })(this.data.resultSet[key]);
      }
      return this.selectedNodeList;
    },

    /**
     * 选中指定节点
     * @param idList
     */
    setSelectedNodeList: function (idList) {
      var self = this;
      each(idList, function(id) {
        self.change(id, true);
      });
      return this;
    },

    /**
     * 取消全部勾选
     */
    clear: function () {
      each(this.data.root, function (node) {
        node.$changed(false, true, true);
      });
      return this;
    }
  };

  $.fn.tree = function (options, data) {
    var treeObj = this.data(key);

    if (treeObj) {
      return treeObj;
    }

    treeObj = new Tree(this, $.extend(true, {}, defaults, options || {}), data);

    this.data(key, treeObj);

    return treeObj;

  };

  function render(node, checkable, everyClass, treetype) {
    var html = [];

    html.push('<li' + (node.$hasChild ? ' class="opened has-child"' : '') + '>');

    var cls = everyClass(node);

    html.push('<a' + (cls ? ' class="' + cls + '"' : '') + ' href="javascript:void(0)" title="' + node.$title + '" id="' + node.$id + '">');

    if (node.$hasChild) {
      html.push('<span class="tree-switch"></span>');
    }

    if (checkable) {
      // html.push('<span class="tree-checkbox" id="checkbox_' + node.$id + '"></span>');
      html.push('<input type="checkbox" id="checkbox_' + node.$id + '" />');
    }

    html.push(node.$name + '</a>');

    if (node.$hasChild) {
      html.push('<ul class="tree-child">');
      each(node.$children, function (node) {
        html = html.concat(render(node, checkable, everyClass, treetype));
      });
      html.push('</ul>')
    }

    return html;
  }

  function packageNode(node, pk, nk, tk, ck, ns, resultSet) {
    var n = {
      $id: ns + '_' + node[pk],
      $name: node[nk],
      $title: node[tk],
      $checked: false,
      $hasChild: false,
      $changed: function (checked) {
        this.$checked = checked;
        // toggleCheckbox('checkbox_' + this.$id, checked);
        $('#checkbox_' + this.$id).iCheck(checked ? 'check' : 'uncheck');
      }
    };
    $.extend(n, node);

    var children = node[ck];
    if (children && children.length) {
      n.$hasChild = true;
      n.$children = map(children, function (node, index) {
        node.$parentNode = n;
        return packageNode(node, pk, nk, tk, ck, ns, resultSet);
      });
    }
    resultSet[n.$id] = n;
    return n;
  }

  function toggleCheckbox(id, checked) {
    var $this = $('#' + id);
    if (checked) {
      $this.addClass('checked');
    } else {
      $this.removeClass('checked');
    }
  }

  function each(array, callback) {
    var i = 0, len = array.length;
    for (; i < len; i++) {
      callback(array[i], i);
    }
  }

  function map(array, callback) {
    var i = 0, len = array.length, result = [];
    for (; i < len; i++) {
      result.push(callback(array[i], i));
    }
    return result;
  }

  function _(id) {
    return document.getElementById(id);
  }

});
