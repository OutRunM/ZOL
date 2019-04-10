/**
 * 公共搜索
 */
define(['jquery',"header"], function($,Header) {
    class Search{
        constructor(){
            this.init().then(()=>{
                this.bind();
                Header.cartNum();//调用头部的记录购物车数量方法
            });
        }
        init(){
            return new Promise(resolve=>{
                $("#search").load("/html/module/search.html",()=>{
                    resolve();
                })
                
            })
           
        }
        bind(){
            var _this=this;
            $("#search-box").on("keyup",function(){
                _this.inputValue = $(this).val();
                _this.addUl(_this.inputValue); 
            }).blur( ()=> {
                setTimeout(()=>{
                    $("#uls").hide();
                },100) 
                $("#uls").on("click","li",function(){
                    $("#search-box").val($(this).html());
                })
            }).focus(()=>{
                _this.inputValue =$("#search-box").val();
                _this.addUl(_this.inputValue);
            });

        }
        /**
         *添加搜索内容框 
         */
        addUl(inputValue){
            if(inputValue){
                $("#uls").remove();
                $.getJSON("https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?cb=?&wd="+inputValue,
                function (res) {
                    let arr = res.s;
                    console.log(arr);
                    if(arr.length !== 0){
                        $(".search-input").append("<ul id='uls'>");
                        arr.forEach(function(item,index){
                        $("#uls").append("<li>"+item+"</li>");
                    });
                    }
                }
            );
           }else{
               $("#uls").hide();
           }
        }
        
    }
    return new Search();
});