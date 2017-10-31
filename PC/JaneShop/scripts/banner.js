$(document).ready(function(){
    // banner大屏广告
    // 光标滑入广告文字时：
    // 滑过文字1时，需要显示第1张图片；
    // 滑过文字2时，需要显示第2张图片；
    // ...
    // 光标滑出时，自动滚动切换
    var $imgrolls = $("#jnImageroll div a");
    $imgrolls.css("opacity", "0.7");
    var index = 0;
    var timer = null;

    $imgrolls.mouseover(function(event) {
      index = $(this).index();
      showImg(index);
    }).eq(0).mouseover();  //初始化，让第一个文字高亮并显示对应的第一个图片

    // 自动滚动切换：滑入时，停止动画；滑出时开始动画
    $("#jnImageroll").hover(function() {
      if(timer) {
        clearInterval(timer);
      }
    }, function() {
      timer = setInterval(function(){
        showImg(index);
        index++;
        if(index == $imgrolls.length){
          index = 0;
        }
      }, 3000);
    }).trigger("mouseleave");  //用户一进入页面，即开始动画


    // 显示不同的幻灯片
    function showImg(index) {

      $imgrolls.removeClass("chos").css("opacity", "0.7")
        .eq(index).addClass("chos").css("opacity", "1");
      // a#JS_imgWrap的href改变，与文字对应的图片显示，其余的隐藏
      var newhref = $imgrolls.eq(index).attr('href');
      $("#JS_imgWrap").attr('href', newhref)
                      .find("img").eq(index).stop(true,true).fadeIn()
                      .siblings().fadeOut();
      
    }
});