$(document).ready(function(){
  // 1.搜索框文字效果
  // 获得焦点时
   $("#inputSearch").focus(function(event) {
     $(this).addClass("focus");
     if($(this).val() == this.defaultValue) {
      $(this).val("");
     }
   }).blur(function(event) {
     $(this).removeClass("focus");
     if($(this).val() == "") {
      $(this).val(this.defaultValue);
     }
   }).keyup(function(e) {
     if(e.which == 13) {  //event.which--在键盘事件中获取键盘的按键
      alert("回车提交表单！");
     }
   });
});