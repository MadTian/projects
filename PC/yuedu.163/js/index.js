
$(document).ready(function(){
    
    // 获取焦点时，占位文字隐藏
    var oInput=$('input');

    oInput.focus(function(event) {
        $(this).attr('value', '');
    });
    
    // 当页面滚动超过250px 时让scrollScreen显示
    // 否则隐藏
    var oScroll=$('.scrollScreen');

    $(window).scroll(function(event) {
        
        if( $(this).scrollTop()>250 ){
            oScroll.css('visibility','visible');
        }else{
            oScroll.css('visibility','hidden');
        }
    });

    // banner区域左侧S
    
    // 点击.catagory区域,'more'显示
    var oCatag=$('.catagory');
    // var oMore=$('.catagory>.more');
    // var oArrow=$('.catagory>h3>i');
    oCatag.hover(function() {
        $(this).children('.more').css('display','block').siblings('.more').css('display','none');
        $(this).find('.catArrow').css('display','none').siblings('.catArrow').css('display','block');
    }, function() {
        $(this).children('.more').css('display','none').siblings('.more').css('display','block');
        $(this).find('.catArrow').css('display','block').siblings('.catArrow').css('display','none');
    });

    // banner区域左侧E
    
    // banner S
    
    // 设置一个定时器timer
    var timer;

    var oBanner,aBtn,aImg;
    oBanner=$('.banner');
    aBtn=$('.btnList li');
    aImg=$('.imgList li');

    var oNextBtn,oPreBtn;
    oNextBtn=$('.nextBtn');
    oPrevBtn=$('.prevBtn');

    // 设置一个变量，用来模拟上|下一个标识
    var num=0;

    // 封装“下一张”功能
    function nextFn(){

        // 按钮切换
        // 需要一个标识去代表下一个..
        // 下一个标识是有规律的：1 2 3  0 1 2 3  0...
        
        // 下一张切换时，将标识进行递增
        num++;
        if(num>3){
            num=0;
        }

        // num在控制完毕后，就代表下一个
        
        // 让下一个具备current，同时做排他，让其他按钮移除current
        aBtn.eq(num).addClass('current').siblings('li').removeClass('current');

        // 图片切换
        aImg.eq(num).stop().fadeIn().siblings('li').stop().fadeOut();
    }

    // banner功能分成两个板块：手动和自动
    // 先设置手动 再自动，因为自动建立在手动基础上
    
    // 自动切换：说白了，就是每隔一段时间，做下一张切换
    timer=setInterval(nextFn, 2000);

    // 停止和重启定时器
    oBanner.hover(function() {
        clearInterval(timer);
    }, function() {
        // 重启定时器，但是重启一定要先清空旧的
        clearInterval(timer);
        timer=setInterval(nextFn, 2000);
    });

    // 手动里面：按钮切换 和 图片切换
    
    // 下一张切换
    oNextBtn.click(nextFn);

    // 封装'上一张'功能
    function prevFn(){

        // 按钮切换
        // 需要一个标识去代表上一个..
        // 上一个标识是有规律的：0 3 2 1 0 3 2 1 0 3 2 1 0...
        
        // 上一张切换时，将标识进行递减
        num--;
        if(num<0){
            num=3;
        }

        // num在控制完毕后，就代表上一个
        
        // 让上一个具备current，同时做排他，让其他按钮移除current
        aBtn.eq(num).addClass('current').siblings('li').removeClass('current');

        // 图片切换
        aImg.eq(num).stop().fadeIn().siblings('li').stop().fadeOut();
    }
    oPrevBtn.click(prevFn);

    // 点击轮换点
    
    aBtn.click(function(event) {

        // 让当前轮播点具备current，同时做排他
        $(this).addClass('current').siblings('li').removeClass('current');

        // 让当前页面上残留的图片淡出，与当前轮播点匹配的图片淡入
        // 辞旧迎新
        
        // 1.先辞旧
        aImg.eq(num).stop().fadeOut();

        // 2.再“迎新”
        // 让与当前角标匹配的图片淡入
        var i=$(this).index();
        aImg.eq(i).stop().fadeIn();

        //小点点击时，为了不影响上、下切换，一定要同步全局标识变量！！！
        num=i;

    });

    // banner E
    
    // 书籍推荐 'tabs'切换
    var aTabs=$('.tabs li');
    var aRecItem=$('.editorRec>.recItems>.recItem');
    
    aTabs.mouseover(function() {
        // debugger;
        i=$(this).index();
        aRecItem.eq(i).show().siblings().hide();

    });

    // 排行榜鼠标移入'.fold','.unfold'显示，'.fold'隐藏
    
    $(".rankList li").mouseover(function(event) {

        // debugger;
        $(this).children('p').hide().siblings().show();
        $(this).siblings().children('p').show().siblings('div').hide()
    });    
    

});