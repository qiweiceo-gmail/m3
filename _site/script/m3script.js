//---Global Variables-//
var treeCurrentNodeName="";
/**
* function show current time,and need to pass in component id to identify
*/
function showCurrentTime(){
 //alert("coming in");
    //alert("show Time");
 //show current time when load page
 var d = new Date()
 var vYear = d.getFullYear()
 var vMon = d.getMonth() + 1
 var vDay = d.getDate()
 var h = d.getHours(); 
 var m = d.getMinutes(); 
 var se = d.getSeconds(); 
 s=vYear+"-"+(vMon<10 ? "0" + vMon : vMon)+"-"+(vDay<10 ? "0"+ vDay : vDay)+" "+(h<10 ? "0"+ h : h)+":"+(m<10 ? "0" + m : m) ;
   // alert(s);
   //idSign="#"+componentId;
    //alert(idSign);
    $(".locate-time").text(s);

  }
/**
 * get value from cookie
 */
 function getValFromCookie(key){
  return $.cookie(key);
}

/**
*
*  function to pagination show
   container, dom nodes
   count, page counts
   pageIndex,page Index
   */

   function setPage(container, count, pageindex) {
  //intial table data
  queryByPageIndexAndSetTableValues(pageindex,10);
  var container = container;
  var count = count;
  var pageindex = pageindex;
  var a = [];
  //总页数少于10 全部显示,大于10 显示前3 后3 中间3 其余....
  if (pageindex == 1) {
    a[a.length] = "<a href=\"#\" class=\"prev unclick\">上一页</a>";
  } else {
    a[a.length] = "<a href=\"#\" class=\"prev\">上一页</a>";
  }
  function setPageList() {
    if (pageindex == i) {
      a[a.length] = "<a href=\"#\" class=\"on\">" + i + "</a>";
    } else {
      a[a.length] = "<a href=\"#\">" + i + "</a>";
    }
  }
  //总页数小于10
  if (count <= 10) {
    for (var i = 1; i <= count; i++) {
      setPageList();
    }
  }
  //总页数大于10页
  else {
    if (pageindex <= 4) {
      for (var i = 1; i <= 5; i++) {
        setPageList();
      }
      a[a.length] = "...<a href=\"#\">" + count + "</a>";
    } else if (pageindex >= count - 3) {
      a[a.length] = "<a href=\"#\">1</a>...";
      for (var i = count - 4; i <= count; i++) {
        setPageList();
      }
    }
    else { //当前页在中间部分
      a[a.length] = "<a href=\"#\">1</a>...";
      for (var i = pageindex - 2; i <= pageindex + 2; i++) {
        setPageList();
      }
      a[a.length] = "...<a href=\"#\">" + count + "</a>";
    }
  }
  if (pageindex == count) {
    a[a.length] = "<a href=\"#\" class=\"next unclick\">下一页</a>";
  } else {
    a[a.length] = "<a href=\"#\" class=\"next\">下一页</a>";
  }
  container.innerHTML = a.join("");
  //事件点击
  var pageClick = function() {
    var oAlink = container.getElementsByTagName("a");
    var inx = pageindex; //初始的页码
    oAlink[0].onclick = function() { //点击上一页
      if (inx == 1) {
        return false;
      }
      inx--;
      setPage(container, count, inx);
      return false;
    }
    for (var i = 1; i < oAlink.length - 1; i++) { //点击页码
      oAlink[i].onclick = function() {
        inx = parseInt(this.innerHTML);
        setPage(container, count, inx);
        return false;
      }
    }
    oAlink[oAlink.length - 1].onclick = function() { //点击下一页
      if (inx == count) {
        return false;
      }
      inx++;
      setPage(container, count, inx);
      return false;
    }
  } ();
}

/**
* generate tables total counts 
*/
function generateTablesCounts(visitUrl){
 var pageCounts=0;
  // alert("visitUrl is "+visitUrl);
   //query counts by ajax method.
   $.ajax({ 
    type:"GET", 
    url: "../json/showCountsByTreeNodeName.json", 
    dataType:"json", 
    contentType:"application/json",
    beforeSend: function(request){
        //alert("request is "+request); 
      }, 
      success:function(data){  
        pageCounts=data.counts;
        setPage(document.getElementById("pagination"),pageCounts,1);
          //alert("pageCounts is "+pageCounts);
        },
        error:function(a,b,c){
            //show error msg alert
            var errorMsg="query counts ocurrs error,"+"a="+a+";b="+b+";c="+c;
            alert(errorMsg);

          } 
        }); 

 }
/**
* delete a row from table
*/
function deltr(self){
  //get equip Group name.
  var groupName=$(self).parent().prev().prev().prev().prev().text();
 // alert(groupName);
 var confirm=window.confirm("确定要删除"+groupName+"吗?");
 if(confirm){
//remove from background server
$.ajax({
  url: "../json/file.json?equipGroupName="+groupName,
  dataType: "text",
  contentType:"application/json",
  type: "get",
  success: function (response) {
    alert("删除成功!");
                  //  str = response;
                }
              })
//remove node from table
$(self).parent().parent().remove();

}
}

/**
* delete a hardware edition from table
*/
function deleteHw(self){
  //get equip Group name.
  var groupName=$(self).parent().prev().prev().text();
 // alert(groupName);
 var confirm=window.confirm("确定要删除"+groupName+"吗?");
 if(confirm){
//remove from background server
$.ajax({
  url: "../json/file.json?equipGroupName="+groupName,
  dataType: "text",
  contentType:"application/json",
  type: "get",
  success: function (response) {
    alert("删除成功!");
                  //  str = response;
                }
              })
//remove node from table
$(self).parent().parent().remove();

}
}


/**
* delete a wireless by ssid
*/
function deleteWireless(self){
  //get equip Group name.
  var ssid=$(self).parent().prev().prev().text();
 // alert(groupName);
 var confirm=window.confirm("确定要删除SSID为"+ssid+"吗?");
 if(confirm){
//remove from background server
$.ajax({
  url: "../json/file.json?ssid="+ssid,
  dataType: "text",
  contentType:"application/json",
  type: "get",
  success: function (response) {
    alert("删除成功!");
                  //  str = response;
                }
              })
//remove node from table
$(self).parent().parent().remove();

}
}
/**
* download equipment template data
*/
function downloadTemplateData(downloadUrl){
var form=$("<form>");//定义一个form表单
form.attr("style","display:none");
form.attr("target","");
form.attr("method","post");
form.attr("action",downloadUrl);
var input1=$("<input>");
input1.attr("type","hidden");
input1.attr("name","exportData");
input1.attr("value",(new Date()).getMilliseconds());
$("body").append(form);//将表单放置在web中
form.append(input1);
form.submit();//表单提交 
}
/**
 * import a csv file
 */
function importCSVFile()
  {
     alert("starting upload.....");
    $.ajaxFileUpload
    (
      {
        url:'http://localhost/php/uploadFile/doajaxfileupload.php',
        secureuri:false,
        fileElementId:'fileToUpload',
        dataType: 'json',
        data:{name:'logan', id:'id'},
        success: function (data, status)
        {
          if(typeof(data.error) != 'undefined')
          {
            if(data.error != '')
            {
              alert(data.error);
            }else
            {
              alert(data.msg);
            }
          }
        },
        error: function (data, status, e)
        {
          alert(e);
        }
      }
    )
    
    return false;

  }