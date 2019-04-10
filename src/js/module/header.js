define(["jquery","tools","template"],function ($) {
    class Header{
        constructor(){
            this.init().then(()=>{
                //页面加载成功执行login();
                this.login();
                this.cartNum();
            });
        }
        init(){
            return new Promise((resolve,reject)=>{
                $("#header").load("/html/module/header.html",()=>{
                    //页面加载成功后执行的代码
                    resolve();
                })
            })
            
        }
        login(){
            /**
             * 验证是否登录
             */
            if(localStorage.getItem("user")){ 
                $("#loginAndregister").addClass("islogin");
                $("#header-username").html(localStorage.getItem("user"));
            }
            if(document.cookie){
                $("#loginAndregister").addClass("islogin");
                $("#header-username").html(tools.cookie("user"));
            }
            $("#outusername").on("click",function(){
                $("#loginAndregister").removeClass("islogin");
                localStorage.removeItem("user");
                tools.cookie("user","",{"path":"/","expires":-1});
            })
            
        }
        // 购物车个数
        cartNum(){
            if(localStorage.getItem("cart")){
                let cartnum = (JSON.parse(localStorage.getItem("cart"))).length;
                console.log(22);
            $(".cart-num").html(cartnum);
            }
            
        }
        
    }
    return new Header();
})