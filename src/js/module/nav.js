define(['jquery'], ($)=> {
    class Nav{
        constructor(){
            this.init().then(()=>{
                this.binds();
            });
        }
        init(){
            return new Promise(resolve=>{
                $("#nav").load("/html/module/nav.html",()=>{
                    resolve();
                })
            })
        }
        binds(){
            /**
             * 分类点击
             */
            $(".all").click(function(){
                if(!($(this).hasClass("red")))
                window.location="/html/list.html?mod=shoplist&type=all";
            })
            $(".sj").click(function(){
                if(!($(this).hasClass("red"))) 
                window.location = "/html/list.html?mod=shoplist&type=sj";
            });
            $(".dn").click(function(){
                if(!($(this).hasClass("red"))) 
                window.location = "/html/list.html?mod=shoplist&type=dn";
            });
            $(".diy").click(function(){
                if(!($(this).hasClass("red"))) 
                window.location = "/html/list.html?mod=shoplist&type=diy";
            });
            $(".sm").click(function(){
                if(!($(this).hasClass("red"))) 
                window.location = "/html/list.html?mod=shoplist&type=sm";
            });
            $(".ws").click(function(){
                if(!($(this).hasClass("red"))) 
                window.location = "/html/list.html?mod=shoplist&type=ws";
            });
            $(".zn").click(function(){
                if(!($(this).hasClass("red")))  
                window.location = "/html/list.html?mod=shoplist&type=zn";
            });
            $(".qt").click(function(){
                if(!($(this).hasClass("red")))  
                window.location = "/html/list.html?mod=newshop&type=qt";
            });

        }
    }
   return new Nav();
    
});