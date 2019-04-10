/**
 * 主页
 */
require(["require.config"],function(){
    require(["jquery","Swiper","search","template","tools","header","boutique","nav","shoplist","footer"],function($,Swiper){
        class Index{
            constructor(){
                this.init();
            }
            init(){
                this.swiper();
                this.isplay();
                this.autoplay();
                this.roll();
            }
            //轮播图
            swiper(){
                
                var mySwiper = new Swiper('.header-lunbotu',{
                    loop: true,
                    pagination: {
                        el: '.swiper-pagination',
                        bulletElement : 'li',
                        clickable: true,
                      },
                      navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                            }
                    })
                    for(var i=0;i<mySwiper.pagination.bullets.length;i++){
                      mySwiper.pagination.bullets[i].onmouseover=function(){
                        this.click();
                      };
                    } 
                    
                    
            }
            /**
             * 自动播放轮播图
             */
            autoplay(){
                this.timer = setInterval( function () {  
                       $("#swiper-button-next").trigger("click");

                    },3000);
            }
            isplay(){
                $(".header-lunbotu").mouseenter(()=>{
                    clearInterval(this.timer);
                }).mouseleave(()=>{
                    this.autoplay();
                });
            }

            /*滚动显示隐藏 */
            roll(){
                $(window).scroll(function () { 
                    
                    if($(this).scrollTop()>=1200){

                        $(".fixed").show();
                    }else{
                        $(".fixed").hide();
                    };
                });
                //点击回头部
                $("#goTop").click(()=>{
                    
                    let i = $(window).scrollTop();
                    let timer = setInterval(()=>{
                        i -= 300;
                        $(window).scrollTop(i);
                        if($(window).scrollTop()==0){
                            clearInterval(timer);
                        }
                    },30)
                    
                    
                })
            }
                
           
        }

    
        new Index();
    })
})
