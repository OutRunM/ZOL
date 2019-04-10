/**
 * 主页商品列表
 */
define(["jquery","template","url","sort"], ($,template,url,sort)=> {
    
    class Shoplist{
        constructor(){
            this.list;
            this.nowlist;
            this.i = 2;
            this.init().then(()=>{
                this.getdata();
                this.load();
                this.godetails();
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
        // 跳转详情页
        godetails(){
            $("#shoplist").on("click",".mspurchase", function(){
                let id = $(this).data("id");
                window.location="/html/details.html?id="+id+"&mod=shoplist";
            });
        }
        //加载更多商品
        load(){
            $("#load").click(()=>{
                //当点击加载时排序按钮回归到默认
                $(".sort-content").children("li").removeClass("red");
                $(".idsort").parent().addClass("red");

                if(this.i>this.list.length){
                    this.i = this.list.length;
                }
                //记录加载后显示的商品
                this.nowlist = this.list.slice(0,12*this.i++);
                
                this.render();
                
            });
            
        }
        //渲染页面
        render(){
            $("#shoplist").html(template("shoplist-data",{list:this.nowlist}));
            //排序
            sort($(".sort-content"),$("#shoplist"),"shoplist-data",this.nowlist);
        }
        
    }
    return new Shoplist();
});