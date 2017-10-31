$(document).ready(function(){
    // 1.产品图片放大镜效果
    // 2.产品图片遮罩层效果
    // 3.单击产品小图片切换大图
    // 4.产品属性介绍之类的选项卡
    var $aLi = $("div.tab_menu ul li");
    $aLi.click(function(event) {
      $(this).addClass('selected')  //当前li元素高亮
              .siblings().removeClass('selected');

      var index = $(this).index();
      $("div.tab_box > div")
              .eq(index).show()  //显示li元素对应的div元素
              .siblings().hide();  //隐藏其他几个同辈的div元素
    }).hover(function() {
      $(this).addClass('hover');
    }, function() {
      $(this).removeClass('hover');
    });

    // 5.右侧产品颜色切换
    // 6.右侧产品尺寸切换
    $(".pro_size li").click(function(){
      $(this).addClass('cur').siblings().removeClass('cur');
      $(this).parent("ul").siblings('span.last').text( $(this).text() );
    })

    // 7.右侧产品数量和价格联动
    var $span = $(".pro_price span.last");
    var price = $span.text();

    $("#num_sort").change(function(event) {
      var num = $(this).val();
      var amount = num * price;
      $span.text( amount);
    });

    // 8.右侧给产品评分的效果
    // 用户单击不同的五角星图片时，可以动态的进行评分
    $("ul.rating li a").click(function(event) {
      var title = $(this).attr("title");
      alert("您给的评分是 " + title);

      var liclass = $(this).parent().attr("class");
      $(this).parent().parent().removeClass().addClass("rating " + liclass + "star");
      $(this).blur();  //去掉超链接的虚线框
      return false;
    });

    // 9.加入购物车
    var $product = $(".jnProDetail");
    $("#cart a").click(function (e) {        
      var pro_name = $product.find("h4:first").text();
      var pro_size = $product.find(".pro_size span.last").text();
      var pro_color =  $(".color_change strong").text();
      var pro_num = $product.find("#num_sort").val();
        var pro_price = $product.find(".pro_price span.last").text();
      var dialog = "感谢您的购买。<div style='font-size:12px;font-weight:400;'>您购买的产品是："+pro_name+"；"+
          "尺寸是："+pro_size+"；"+
          "颜色是："+pro_color+"；"+
          "数量是："+pro_num+"；"+
          "总价是："+pro_price +"元。</div>";
        alert(dialog);
      // $("#jnDialogContent").html(dialog);
      // $('#basic-dialog-ok').modal();
      return false;//避免页面跳转
    });    
});