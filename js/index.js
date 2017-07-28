$(document).ready(function () { 
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
        let len = $('.page').length;
        if ( Math.abs(Y) > Math.abs(X) && Y > 0) {
                 let index=  $(this).index();
                if( Y > 60 && index>0){
                        $(this).animate({
                                 height:'0'
                         },1000).prev().animate({
                                 width:'96%',
                                 left:'2%'
                         })
                  }
                if(index == len-1){
                       $('.page').eq(0).fadeIn(); 
                }
　　　　}
　　　　else if ( Math.abs(Y) > Math.abs(X) && Y < 0 ) {
                let index=  $(this).index();
                
                if( Y < -60 && index < len-1){
                         $(this).css({'zIndex':index}).animate({
                                 width:'92%',
                                 left:'4%'
                         }).next().animate({
                                 height:100-2*(index+2)+'%'
                         }).css('zIndex',index+1)

                }  
                if(index==len-2){
                        $('.page').eq(0).fadeOut();
                }    
　　　　}else{
        console.log($(this).index())
}
　　});
let windowHeight = $(window).height(),
　　$body = $("body");
　　 console.log($(window).height()); //627
　　 console.log($('body').height()); //0
　　$body.css("height", windowHeight); //重要代码

}
)