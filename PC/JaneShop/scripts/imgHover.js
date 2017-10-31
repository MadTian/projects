
$(document).ready(function(){
    // 效果：为产品列表添加光标滑过的效果
    // 分析：可为产品列表中的每个产品都创建一个span元素，它们的高度和宽度都与产品图片相同，然后为她们设置定位方式，上边距和左边距，使之刚好处于图片上方
    // each()为每个匹配元素规定运行的函数。
    $('#jnBrandList li').each(function(index, el) {
      var $img = $(this).find("img");
      var img_w = $img.width();
      var img_h = $img.height();

      var spanHtml = '<span class="imgMask" style="position: absolute;left: 5px; top:0; width:'+img_w+'px+height: '+img_h+'px></span>';
      $(this).append(spanHtml);
    });
    $('#jnBrandList').find(".imgMask").live('hover', function(event) {
      $(this).toggleClass('imageOver');
    });
});