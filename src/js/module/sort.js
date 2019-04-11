/**
 * 排序绑定 渲染页面
 */
define(["jquery","template"], function($,template) {

    //(element 点击的事件源父元素
    //data template的script的ID名
    // nowlist 请求的数据
    // shoplist 需要渲染到的容器
    return function (element,shoplist,data,nowlist){
        let j = false;
        function render(shoplist,data,nowlist){

            shoplist.html(template(data,{list:nowlist}));
              
        }

        element.on("click","a",function(){
            $(this).parent().parent().children("li").removeClass("red");
            $(this).parent().addClass("red");
            switch($(this).attr("class")){
                case "idsort":
                    j = !j;
                    nowlist.sort((a,b)=>{
                        if(j){
                            return b.id - a.id;
                        }else{
                            return a.id - b.id;
                        }
                    })
                    render(shoplist,data,nowlist);
                ;break;
                case "timesort":
                    j = !j;
                    nowlist.sort((a,b)=>{
                        if(j){
                            return b.time.day - a.time.day;
                        }else{
                            return a.time.day - b.time.day;
                        }
                        
                    })
                    render(shoplist,data,nowlist);
                ;break;
                case "salessort":
                    j = !j;
                    nowlist.sort((a,b)=>{
                        if(j){
                            return b.sales - a.sales;
                        }else{
                            return a.sales - b.sales;
                        }
                        
                    })
                    render(shoplist,data,nowlist);
                ;break;
                case "pricesort":
                    j = !j;
                    nowlist.sort((a,b)=>{
                        if(j){
                            return b.price - a.price;
                        }else{
                            return a.price - b.price;
                        }
                        
                    })
                    render(shoplist,data,nowlist);
                ;break;
            }
        })
    }   
});