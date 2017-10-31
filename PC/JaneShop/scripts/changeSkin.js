$(document).ready(function(){
    // 网页换肤的原理：
    // 通过调用不同的样式表文件来实现不同皮肤的切换，并且需要将换好的皮肤计入Cookie中，这样用户下次访问时，就可以显示用户自定义的皮肤了。
    
      var $li = $('ul#skin li');
      $li.click(function(event) {
        $('#'+this.id)  
          .addClass('selected')  //当前li元素被选中
          .siblings().removeClass('selected');  //去掉其他同辈li元素的选中
          $('#cssfile').attr('href', 'styles/'+this.id +'.css'); //设置不同皮肤
          $.cookie( 'MyCssSkin',this.id,{ path: '/', expires: 10});  //计入cookie
      });

      var cookie_skin = $.cookie( 'MyCssSkin');  //获取Cookie的值
      if(cookie_skin) {
        $('#'+cookie_skin)
          .addClass('selected')
          .siblings().removeClass('selected');
          $('#cssfile').attr('href', 'styles/'+ cookie_skin +'.css');
          $.cookie( 'MyCssSkin',cookie_skin,{ path: '/', expires: 10});
      }    
    
});