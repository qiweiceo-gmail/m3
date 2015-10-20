jQuery(function() {
    $(':radio, :checkbox').iCheck({
        checkboxClass: 'icheckbox_square',
        radioClass: 'iradio_square'
    });


    // 组织结构树
    $.getJSON('../json/tree.json').done(function(result) {
        //alert("load tree data......");
        $('[data-tree]').each(function() {
            var $this = $(this);
            var str = $this.data('tree') || '{}';
            var options = (new Function('return ' + str))() || {};
            var treeObj = $this.tree(options, result);

            if (options.selects) {
                treeObj.select.apply(treeObj, options.selects.split(','));
            } else {
                treeObj.select(4);
            }
        });
    });

    function map(array, callback) {
        var i = 0,
            len = array.length;
        var result = [];

        for (; i < len; i++) {
            result.push(callback(array[i], i));
        }
        return result;
    }

    var $confirmModal = $('#confirmModal');
    jQuery.confirm = function(message) {
        var deferred = jQuery.Deferred();
        $confirmModal.find('.confirm-tips').text(message || '');
        $confirmModal.modal('show');

        $confirmModal
            .on('click.confirm-sure', '.btn-save', function() {
                deferred.resolve();
                $confirmModal.modal('hide');
            })
            .on('click.confirm-cancel', '.btn-cancel', function() {
                deferred.reject();
                $confirmModal.modal('hide');
            });

        return deferred.promise();
    };


    var $alertModal = $('#alertModal');
    jQuery.alert = function(message, delay) {
        $alertModal.find('.alert-tips').text(message || '');
        $alertModal.addClass('in');

        setTimeout(function() {
            $alertModal.removeClass('in');
        }, delay || 3000);

        $alertModal.on('click', '.close', function() {
            $alertModal.removeClass('in');
        });
    };

    $('[data-title]').each(function () {
        var $this = $(this);
        var data = $this.data('title') || 'overflow';

        $this.title({
            overflow: data.indexOf('overflow') > -1,
            always: data.indexOf('always') > -1,
            mousefollow: data.indexOf('mousefollow') > -1,
            fromright: data.indexOf('fromright') > -1
        });
    });

    });