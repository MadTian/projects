define(["jquery"],function(require){ //依赖jQuery
    return commonObj = {
        ajaxstatus:true,
        pagesize : 5, //拖动一下显示5条 
        winH: $(window).height(),
        loadCanvas:function(){
         var imglength = $("#prolist").find("canvas").length;
            if (imglength > 0) {
                $("#prolist").find("canvas").each(function () {
                    var imgSrc = $(this).data("src");
                    var imageObj = new Image();
                    imageObj.canvs = $(this)[0];
                    var cvs = imageObj.canvs.getContext('2d');
                    if (cvs) {
                        imageObj.onload = function () {
                            imageObj.canvs.width = this.width;
                            imageObj.canvs.height = this.height;
                            cvs.drawImage(this, 0, 0);
                            $(imageObj.canvs).css("background-image", "none");
                        }
                        imageObj.src = imgSrc;
                    }
                })
            }
        },

        // 调用json
        getData: function(pagenumber){
            $.ajax({
                type: "get",
                url: "/wxshop/static/script/test.json",
                data: {
                    page:commonObj.pagenumber,//第几页
                    row: commonObj.pagesize, //表示每页几个，根据前面的数据可以得出拖动一下显示5条
                },
                // 如果成功，返回刚才得到的json
                dataType: "json",
                success: function(result){
                    $(".loaddiv").hide();
                    if(result.length > 0){
                        commonObj.ajaxstatus=true;
                        commonObj.insertDiv(result);
                        commonObj.loadCanvas();
                    }else{
                       $("#pagenumlength").val("0"); 
                    }
                },
                beforeSend: function () {
                   $(".loaddiv").show(); 
                },
                error: function () {
                    $(".loaddiv").hide();
                }
            });
        },
        insertDiv: function (json) {
            // 实现效果：滑动一下加载5条
            var $mainDiv = $("#scrollAdd");
            var html = '';
            var showlength=5;
            if(json.length<5){
                showlength=json.length;
            }

            for (var i = 0; i < showlength; i++) {              
                html += '<li><a href="#">'+
                    '<div class="promotion-word">'+
                    '<span class="triangle triangle1"></span>'+'<span class="pro-word word01" data_url="productinfo.html">专属</span>'+'</div>'+
                    '<div class="promotion-img fl"><canvas data-src="images/product/product1.png" ></canvas></div>'+
                     '<div class="production-des fr">'+
                         '<p class="title">广联达变更算量</p>'+
                          '<p class="pro-intro">简介这里简介这里简介这里简介这里简介这里简介这里简介这里简介介这里简介</p>'+
                          '<p class="price">价格：<span class="green">￥5000</span></p>'+
                    '</div></a></li>';
            }
            $mainDiv.append(html);
        },
        scrollHandler: function () {
            var docH = $(document).height();//整个网页的高度
            var winH = $(window).height();//浏览器可视窗口的高度
            var scrollT = $(window).scrollTop();// 滚动条top 浏览器可视窗口顶端距离网页顶端的高度（垂直偏移）

            // 当网页滚动条拉到最低端时，
            // $(document).height() == $(window).height() + $(window).scrollTop()
            if(parseInt(winH)+parseInt(scrollT)+50>=parseInt(docH) && commonObj.ajaxstatus){
                //commonObj.ajaxstatus:加上它是为了防止多次调用
                if($("#pagenumlength").val()=="1"){
                   commonObj.ajaxstatus=false;
                   commonObj.currentpage++;
                    commonObj.getData(commonObj.currentpage)
                }else{
                    return
                }
            }
        }
    }
})