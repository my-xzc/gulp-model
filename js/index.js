$(document).ready(function () { 
        // console.log( $('#scroller')[0].scrollHeight);
                 
        var OneHight = $("#scrollerOne").height();  
        var ScrollOneHight = $("#scrollerOne")[0].scrollHeight; //滚动距离总长(注意不是滚动条的长度)
        var TwoHight = $("#scrollerTwo").height();  
        var ScrollTwoHight = $("#scrollerTwo")[0].scrollHeight; //滚动距离总长(注意不是滚动条的长度)
        var ThreeHight = $("#scrollerThree").height();  
        var ScrollThreeHight = $("#scrollerThree")[0].scrollHeight; //滚动距离总长(注意不是滚动条的长度)
        console.log(OneHight,ScrollOneHight,TwoHight,ScrollTwoHight,ThreeHight,ScrollThreeHight)
        next();
        function next(){
                let windowHeight = $(window).height(),
                　　$body = $("body");
                　　$body.css("height", windowHeight); //重要代码
                let len = $('.page').length;
           $(".content").on("touchstart", function(e) {
                　　　　e.stopPropagation();
                　　　　startX = e.originalEvent.changedTouches[0].pageX,
                　　　　startY = e.originalEvent.changedTouches[0].pageY;
                　　});
        　　$(".content").on("touchmove", function(e) {
        　　　　e.stopPropagation();
        　　　　moveEndX = e.originalEvent.changedTouches[0].pageX,
        　　　　moveEndY = e.originalEvent.changedTouches[0].pageY,
        　　　　X = moveEndX - startX,
                    Y = moveEndY - startY;
            let index = $(this).parent().index();        
            console.log($(this).index());
                if ( Math.abs(Y) > Math.abs(X) && Y > 0) {
                        if ((Y>(ScrollOneHight-OneHight) &&Y>(ScrollTwoHight-TwoHight) &&Y>(ScrollThreeHight-ThreeHight))&& index>0){ 
                                console.log(Y, '到上一页', $(this).parent().prev().css('width'), $(this));
                                let widthP = $(this).parent().prev().css('width');
                                        if(index == len-1){
                                                $('.page').eq(0).fadeIn(); 
                                }
                                        
                                        $(this).parent().addClass('slideOutDown').removeClass('slideInUp').prev()
                                        .animate({
                                        "width":( widthP*1.3)+"px",
                                        // left:'3%'
                                })
                        }    
                }
                  
        　　　　else if ( Math.abs(Y) > Math.abs(X) && Y < 0 ) {
                        if ((Y<(OneHight-ScrollOneHight) && Y<(TwoHight-ScrollTwoHight) && Y<(ThreeHight-ScrollThreeHight)) && index < len-1){ 
                                console.log(Y, '到下一页',$(this).parent().next().css('width'),$(this));
                                let widthN = $(this).parent().next().css('width');
                                $(this).parent().next().removeClass('slideOutDown');
                                $(this).parent().removeClass('slideOutDown slideInUp').animate({
                                        width: (widthN*.6)+"px",
                                        // left: width-5%
                                }).next().show().addClass('slideInUp');
                                if(index==1){
                                $('.page').eq(0).fadeOut();
                                } 
                        }       
        　　　　}
        　　});
              }
         
})