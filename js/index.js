$(document).ready(function () { 
        // console.log( $('#scroller')[0].scrollHeight);
                 
        var OneHight = $("#wrapperOne").height();  
        var ScrollOneHight = $("#wrapperOne")[0].scrollHeight; //滚动距离总长(注意不是滚动条的长度)
        var TwoHight = $("#wrapperTwo").height();  
        var ScrollTwoHight = $("#wrapperTwo")[0].scrollHeight; //滚动距离总长(注意不是滚动条的长度)
        var ThreeHight = $("#wrapperThree").height();  
        var ScrollThreeHight = $("#wrapperThree")[0].scrollHeight; //滚动距离总长(注意不是滚动条的长度)
        console.log(OneHight,ScrollOneHight,TwoHight,ScrollTwoHight,ThreeHight,ScrollThreeHight);
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
                if ( Math.abs(Y) > Math.abs(X) && Y > 0) {
                        if (((Y*4) >(ScrollOneHight-OneHight) &&(Y*4) >(ScrollTwoHight-TwoHight) && (Y*4)  >(ScrollThreeHight-ThreeHight))&& index>0){ 
                        //  if (Y*3 >= $(this).offset().top&& index>0){ 
                                console.info(Y, '到上一页',$(this).offset().top);
                                let widthP = $(this).parent().prev().css('width');
                                        if(index == len-1){
                                                $('.page').eq(0).fadeIn(); 
                                }
                                        
                                        $(this).parent().addClass('slideOutDown').removeClass('slideInUp').prev()
                                        .animate({
                                        "width":"94%",
                                        "left":'3%'
                                })
                        }    
                }
                  
        　　　　else if ( Math.abs(Y) > Math.abs(X) && Y < 0 ) {
                        if (((Y*4) <(OneHight-ScrollOneHight) && (Y*4) <(TwoHight-ScrollTwoHight) && (Y*4) <(ThreeHight-ScrollThreeHight)) && index < len-1){ 
                                // if (Y*3 <= $(this).offset().top && index < len-1){ 
                                console.info(Y,'到下一页',$(this).offset().top);

                                let widthN = $(this).parent().next().css('width');
                                $(this).parent().next().removeClass('slideOutDown');
                                $(this).parent().removeClass('slideOutDown slideInUp').animate({
                                        "width": "90%",
                                        "left": "5%"
                                }).next().show().addClass('slideInUp');
                                if(index==1){
                                $('.page').eq(0).fadeOut();
                                } 
                        }       
        　　　　}
        　　});
              }
         
})