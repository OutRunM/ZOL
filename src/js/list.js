/**
 * 商品列表分页
 */
require(["require.config"],()=>{
    require(["jquery","url","template","header","footer","nav","search"],($,url,template)=>{
        class List{
            constructor(){
                this.page = 1;
                this.j = true;
                this.init().then(()=>{
                    this.getdata();
                    this.roll();
                   
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
                let arr = location.search.split("&"),
                type = arr[1].split("=")[1];
                this.mod = arr[0].split("=")[1];
                
                //商品类型调用
                this.shoptype(type);
                
                $.get(url.baseUrl+this.mod,(res)=>{
                    if(res.res_code == 1 ){
                        this.list = res.res_body.data.list;
                        //判断页码
                        this.judge()
                        //调用渲染页面
                        this.render();
                        // 调用创建页码
                        this.setapage();
                    }
                    });
            }
            //渲染页面
            render(){

                $("#shoplist").html(template("shoplist-data",{list:this.nowlist}));
                //排序
                
                if(this.j){
                    this.sortbinds();
                    this.j = false;
                }
                
                this.godetail();
            }
            //判断页码改变当页显示的数量范围
            judge(){
                //判断数据长度是否有12
                if(this.list.length > 12){
                    let overpage =  12*this.page;
                    
                    if(overpage>this.list.length){
                        overpage = this.list.length;
                    }

                    this.nowlist = this.list.slice(12*(this.page-1),overpage);
                    $(".page").css({"display":"inline-block"});// 显示页码按钮
                }else{
                    
                    this.nowlist = this.list;
                    
                }
            }
            //商品类型
            shoptype(type){
                switch(type){
                    case "all":
                    $(".all").addClass("red");break;
                    case "sj":
                    $(".sj").addClass("red");break;
                    case "dn":
                    $(".dn").addClass("red");break;
                    case "diy":
                    $(".diy").addClass("red");break;
                    case "sm":
                    $(".sm").addClass("red");break;
                    case "ws":
                    $(".ws").addClass("red");break;
                    case "zn":
                    $(".zn").addClass("red");break;
                    case "qt":
                    $(".qt").addClass("red");break;
                }
                
            }
            //跳转详情页
            godetail(){
                let _this = this;
                $(".mspurchase").on("click", function(){
                    let id = $(this).data("id");
                    window.location="/html/details.html?id="+id+"&mod="+_this.mod;
                });
            }
            //创建页码
            setapage(){
                //根据数据长度来创建页码按钮个数
                let allpage = Math.ceil(this.list.length/12);
                for(let i = 2;i<=allpage;i++){
                    $(".aPage").append("<li class='btn'>"+i+"</li>");
                } 
                //调用页码绑定
                this.gotopage(); 
            }
            //页数跳转
            gotopage(){
                let _this = this;
                // 单页码绑定
                $(".btn").click(function(){
                    
                    if(!$(this).hasClass("red")){
                        //当点击正确页码时排序按钮回归到默认
                        $(".sort-content").children("li").removeClass("red");
                        $("#idsort").parent().addClass("red");
                        //所有按钮去掉样式
                        $(this).parent().children("li").removeClass("red");
                        //点击该按钮添加样式
                        $(this).addClass("red");
                        //调到页面开头
                        $(window).scrollTop(0);
                        //渲染相应页码的数据
                        _this.page = $(this).html();
                        _this.judge();
                        _this.render();
                    }
                })
                
                //下一页按钮绑定
                $(".nextpage").click(function(){
                    
                    $(".btn").each(function(){
                        
                        if($(this).hasClass("red")){
                            //当点击正确页码时排序按钮回归到默认
                            $(".sort-content").children("li").removeClass("red");
                            $("#idsort").parent().addClass("red");
                            $(this).next().click();
                            //跳出循环
                            return false;
                        }
                        
                    })
                    
                })
                //上一页按钮绑定
                $(".prevpage").click(function(){
                    
                    $(".btn").each(function(){
                        
                        
                        if($(this).hasClass("red")){
                            //当点击正确页码时排序按钮回归到默认
                            $(".sort-content").children("li").removeClass("red");
                            $("#idsort").parent().addClass("red");
                            $(this).prev().click();
                            //跳出循环
                            return false;
                        }
                        
                    })
                    
                })
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
                    console.log(11);
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
        new List(); 
    })
})