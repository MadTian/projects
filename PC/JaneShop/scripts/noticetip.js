$(document).ready(function(){
    //最新动态模块内容添加超链接提示
    var x,y;
    x = 10;
    y = 10;

    $("a.tooltip").mouseover(function(e) {
      this.myTitle = this.title;
      this.title = "";  //移除a标签自带的title提示功能

      var tooltip = "<div id='tooltip'>"+this.myTitle+"</div>";
      $("body").append(tooltip);  //把div元素追加到文档中
      $("#tooltip")
          .css({
            "top": (e.pageY+y) + "px",
            "left": (e.pageX+x) + "px"
          }).show("fast");  //自带的提示功能响应缓慢，为了良好的人机交互，需要鼠标移动到超链接的一瞬间就显示提示。
    }).mouseout(function(e) {
      this.title = this.myTitle;
      $("#tooltip").remove();
    }).mousemove(function(e) {
      $("#tooltip")
          .css({
            "top": (e.pageY+y) + "px",
            "left": (e.pageX+x) + "px"
          });
    });
});