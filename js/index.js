$(document).ready(function () { 
        // console.log( $('#scroller')[0].scrollHeight);
                 
                              
            function loaded() {  
                     let   myScroll = new IScroll('#wrapper', {  
                        scrollbars: false//有滚动条  
                        });
                              
                }
        loaded();
        // next();
                $('#scroller').on('touchend',function(){
                                var nScrollHight = 0; //滚动距离总长(注意不是滚动条的长度)
                                var nScrollTop = 0;   //滚动到的当前位置
                                var nDivHight = $("#scroller").height();
                                nScrollHight = $(this)[0].scrollHeight;
                                nScrollTop = $('#wrapper')[0].offsetTop;
                                console.log(nDivHight,nScrollTop,nScrollHight)
                                if(nScrollTop + nDivHight >= nScrollHight){
                                        alert("滚动条到底部了");
                                }
                                        
                        alert('ok')
                })
              function next(){
                        let windowHeight = $(window).height(),
                　　$body = $("body");

                　　$body.css("height", windowHeight); //重要代码
                let len = $('.page').length;
           $(".page").on("touchstart", function(e) {
                　　　　e.preventDefault();
                　　　　startX = e.originalEvent.changedTouches[0].pageX,
                　　　　startY = e.originalEvent.changedTouches[0].pageY;
                　　});
        　　$(".page").on("touchmove", function(e) {
        　　　　e.preventDefault();

        　　　　moveEndX = e.originalEvent.changedTouches[0].pageX,
        　　　　moveEndY = e.originalEvent.changedTouches[0].pageY,
        　　　　X = moveEndX - startX,
        　　　　Y = moveEndY - startY;
                
                if ( Math.abs(Y) > Math.abs(X) && Y > 0) {
                        console.log(Y)
                        let index=  $(this).index();
                        if( Y > 60 && index>0){
                                $(this).addClass('slideOutDown').removeClass('slideInUp').prev()
                                        .animate({
                                        width:'94%',
                                        left:'3%'
                                })
                        }
                        if(index == len-1){
                        $('.page').eq(0).fadeIn(); 
                        }
        　　　　}
        　　　　else if ( Math.abs(Y) > Math.abs(X) && Y < 0 ) {
                        let index=  $(this).index();
                        console.log
                        if( Y < -60 && index < len-1){
                                $(this).next().removeClass('slideOutDown');
                                $(this).removeClass('slideOutDown slideInUp').animate({
                                        width:'90%',
                                        left:'5%'
                                }).next().show().addClass('slideInUp')
                        }  
                        if(index==1){
                                $('.page').eq(0).fadeOut();
                        }   
        　　　　}
        　　});
              }
         
})