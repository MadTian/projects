
$(document).ready(function(){
    // 导航效果
    $("#nav li").hover(function() {
      $(this).find(".jnNav").show();
    }, function() {
      $(this).find(".jnNav").hide();
    });
});