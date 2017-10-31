$(document).ready(function(){
    // 品牌活动 产品轮播
    // 基本效果分析
    $("#jnBrandTab li a").click(function(event) {
      $(this).parent().addClass('chos')
             .siblings().removeClass('chos');
      // 获得元素相对于选择器的 index 位置。
      var num = $("#jnBrandTab li a").index(this); 
      showBrandList(num);
      return false; 
    }).eq(0).click();  //默认显示'运动'

    // 切换不同模块
    function showBrandList(index){
      var $rollobj = $("#jnBrandList");
      //outerWidth(true)包含margin，如不加表示匹配元素的宽度+padding+border
      var $rollWidth = $rollobj.find('li').outerWidth(true); 
      rollWidth = $rollWidth * 4;  //一个版面的宽度
      // alert(rollWidth);
      $rollobj.stop(true,false).animate({ left: -rollWidth * index}, 1000);
    }
});