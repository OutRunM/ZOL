define(['jquery','Swiper', 'template','url'], function($,Swiper,template,url) {
    
    class Boutique{
        constructor(){
            this.init().then(()=>{
                
                this.getdata();
            });
        }
        init(){
            return new Promise(resolve=>{
                $("#boutique").load("/html/module/boutique.html",()=>{
                    resolve();
                })
            }) 
        }
        // 获取数据
        getdata(){
            
                $.get(url.baseUrl+"newshop",(res)=>{
                    if(res.res_code==1){
                        this.render(res.res_body.data.list);
                    }
            })
           
        }
        //渲染页面
        render(list){
            $("#boutique-shoplist").html(template("boutique-shop",{list}));
            this.swiper();
            this.autoplay();
            this.isplay();
            this.godetails();
        }
        //轮播图样式
        swiper(){
            var mySwiper = new Swiper('.boutique-lunbotu',{
                loop: true,
                slidesPerView : 4,
// centeredSlides : true,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev-lunbotu',
                  },
                loopedSlides: 4,
                // slidesPerView : 4,
                // spaceBetween : 10,
                // slidesOffsetBefore : -20,
                
              })
        }
        //是否自动播放
        isplay(){
            $(".boutique-lunbotu").mouseenter(()=>{
                clearInterval(this.timer);
            }).mouseleave(()=>{
                this.autoplay();
            });
        }
        //自动播放
        autoplay(){
            this.timer = setInterval(()=>{
                $(".swiper-button-next-lunbotu").trigger("click");
            },4000)
        }
        // 进入详情页面
        godetails(){
            $(".purchase").on("click",function(){
                let id = $(this).data("id");
                window.location = "/html/details.html?id="+id+"&mod=newshop";
                
            })
        }
        
    }
    return new Boutique();
});
