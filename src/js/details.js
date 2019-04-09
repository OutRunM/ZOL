/**
 * 详情页面
 */
require(["require.config"],()=>{
    require(["jquery","template","Swiper","url","header","zoom","footer","search","nav"],($,template,Swiper,url,Header)=>{
        class Details{
            constructor(){
                this.init();

            }
            init(){
                let arr = location.search.split("&");
                this.id = arr[0].slice(5);//id
                let lid = arr[0].slice(4,5);//类型
                this.mod = arr[1].slice(4);//数据地址
                

                $.get(url.baseUrl+this.mod,
                    res=> {
                        let i = 0;
                        if(res.res_body.data.list.some((n,m)=>{
                            i = m;
                            return n.id==this.id;
                        })){
                            this.render(res.res_body.data.list[i],lid);
                        }
                    },
                    
                );
                
            }
            //渲染页面
            render(shop,lid){
                switch(lid){
                    case "1": 
                        $("#lid").html("手机");
                    ;break;
                    case "2":
                        $("#lid").html("电脑");
                    ;break;
                }
                console.log(shop);
                $(".main-content").html(template("details",{...shop}));
                this.zoom();
                this.lunbo();
                this.joincart();
                this.purnum();
                this.addBorder();
                
            }
            //放大镜
            zoom () {
                // 放大镜插件
                $(".zoom-img").elevateZoom({
                    gallery:'gal1',
                    cursor: 'pointer',
                    galleryActiveClass: 'active',
                    borderSize:'1',    
                    borderColor:'#e0e0e0',
                    imageCrossfade: true, 
	        	    scrollZoom : true
                });
              }
              //轮播
              lunbo(){
                var mySwiper = new Swiper ('.swiper-container', {
                    slidesPerView : 4,
                    // freeMode : true,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                        }
                  })        
              }
              //选中加框
              addBorder(){
                  $(".s").click(function(){
                    $(".s").css({"border":"2px solid #f7f7f7"})
                      $(this).css({"border":"2px solid #ff0000"});
                  });
              }
              //添加数量
              purnum(){
                //加
                $(".add").click(function(){
                    
                    let num = $(this).parent().children("#purnum").val();
                    if(++num > $(this).data("num")){
                        num = $(this).data("num");
                    }
                    
                    $(this).parent().children("#purnum").val(num);
                   
                });
                //减
                $(".red").click(function(){
                    let num = $(this).parent().children("#purnum").val();
                    if(--num < 1){
                        num = 1;
                    }
                    $(this).parent().children("#purnum").val(num);
                });
                //输入框
                $("#purnum").keyup(function(){
                    if($(this).val() == "" || $(this).val() == 0 || $(this).val() == undefined || $(this).val() == null){
                        $(this).val(1);
                    }
                });
              }
              //加入购物车
              joincart(){
                
                $("#joincart").click(()=>{ 
                    
                    let id = this.id,
                    name = $("#name").html(),
                    zpic = $("#zpic").data("image"),
                    day = $("#day").html(),
                    shi = $("#shi").html(),
                    fen = $("#fen").html(),
                    miao = $("#miao").html(),
                    price = $("#price").html(),
                    originalprice = $("#originalprice").html(),
                    purnum = $("#purnum").val(),
                    limit = $("#limit").html(),
                    num = $("#purnum").val(),
                    i = 0,
                    mod = this.mod,
                    obj = {num,id,mod,name,zpic,day,shi,fen,miao,price,originalprice,purnum,limit};
                    
                    //存localStorage
                    if(localStorage.getItem("cart")){
                        this.arr = JSON.parse(localStorage.getItem("cart"));
                        if(this.arr.some((item,index)=>{
                            i = index;
                            return item.id === obj.id && item.mod === mod; 
                        })){
                            this.arr[i] = obj;
                        }else{
                            this.arr.push(obj);
                            this.tis();
                        }

                    }else{
                        this.arr = [];
                        this.arr.push(obj);
                        this.tis();
                    }
                    localStorage.setItem("cart",JSON.stringify(this.arr));
                    Header.cartNum();  
                });
              }
              //添加新商品就提示用户
              tis(){
                  
                  $(".tis").css({"opacity":"1"})
                  setTimeout(()=>{
                      $(".tis").css({"opacity":"0"});
                  },2000);
              }             
        }
        new Details();
    })
})