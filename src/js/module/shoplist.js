/**
     * 主页商品列表
     */
define(["jquery","template","url"], ($,template,url)=> {
    
    class Shoplist{
        constructor(){
            this.list;
            this.nowlist;
            this.i = 2;
            this.init().then(()=>{
                
                this.getdata();
                this.load();
                this.sortbinds();
                
            });
        }
        init(){
            return new Promise(resolve=>{
                $("#shoplist").load("/html/module/shoplist.html",()=>{
                    resolve();
                })
            })
        }
        //获取数据
        getdata(){
            $.get(url.baseUrl+"shoplist",(res)=>{
                    if(res.res_code==1){
                        //记录全部商品
                        this.list = res.res_body.data.list;
                        //记录刚开始加载时的前12个商品
                        this.nowlist = this.list.slice(0,12);
                        this.render();
                    }
                })
        }
        //渲染页面
        render(){
            $("#shoplist").html(template("shoplist-data",{list:this.nowlist}));
            
            this.godetails();

        }
        // 跳转详情页
        godetails(){
            $(".mspurchase").on("click", function(){
                let id = $(this).data("id");
                window.location="/html/details.html?id="+id+"&mod=shoplist";
            });
        }
        //加载更多商品
        load(){
            $("#load").click(()=>{ 
                if(this.i>this.list.length){
                    this.i = this.list.length;
                }
                //记录加载后显示的商品
                this.nowlist = this.list.slice(0,12*this.i++);
                
                this.render();
                
            });
        }
        //排序绑定
        sortbinds(){            
            let j = false;
            $("#idsort").click(()=> {
                // console.log($(this).parent());
                $(".sort-content").children("li").removeClass("red");
                $("#idsort").parent().addClass("red");
                j = !j;
                this.nowlist.sort((a,b)=>{
                    if(j){
                        return b.id-a.id;
                    }else{
                        return a.id-b.id;
                    }
                    
                })
                this.render();
            });
            $("#timesort").click(()=> {
                $(".sort-content").children("li").removeClass("red");
                $("#timesort").parent().addClass("red");
                j = !j;
                this.nowlist.sort((a,b)=>{
                    if(j){
                        return b.time.day - a.time.day;
                    }else{
                        return a.time.day - b.time.day;
                    }
                    
                })
                this.render();
            });
            $("#pricesort").click(()=> {
                $(".sort-content").children("li").removeClass("red");
                $("#pricesort").parent().addClass("red");
                j = !j;
                this.nowlist.sort((a,b)=>{
                    if(j){
                        return b.price - a.price;
                    }else{
                        return a.price - b.price;
                    }
                    
                })
                this.render();
            });
            $("#salessort").click(()=> {
                $(".sort-content").children("li").removeClass("red");
                $("#salessort").parent().addClass("red");
                j = !j;
                this.nowlist.sort((a,b)=>{
                    if(j){
                        return b.sales - a.sales;
                    }else{
                        return a.sales - b.sales;
                    }
                    
                })
                this.render();
            });
        }

    }
    return new Shoplist();
});