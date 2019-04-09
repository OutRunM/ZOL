require(["require.config"],()=>{
    require(["jquery","template","header","footer"],($,template,Header)=>{

        class Cart{
            constructor(){
                
                this.init();
            }
            init(){
                //获取localStorage
                let cart = JSON.parse(localStorage.getItem("cart"));

                

                $(".tbody").load("/html/module/cart-content.html",()=>{
                    $(".tbody").html(template("cart-content",{cart}));
                    this.binds();
                    this.money();
                    this.total();
                    this.allcheck();
                    this.allMoney();
                    this.noshop();
                });
                
            }
            binds(){
                let _this = this; 
                
                //加
                $(".add").click(function(){
                    
                    let id = $(this).parent().parent().data("id");
                    //数量
                    let num = $(this).parent().children(".purnum").val();
                    //数据地址
                    let mod = $(this).parent().data("mod");
                    if( ++num > $(this).data("num") ){
                        num = $(this).data("num");
                        //数量超规定数量时显示提示
                        _this.none(this);
                    }
                    $(this).parent().children(".purnum").val(num);
                    _this.money();
                    //存数量
                    _this.setlocalStorage(num,id,mod);
                    _this.total();
                    _this.allMoney();
                });
                //减
                $(".red").click(function(){
                    let id = $(this).parent().parent().data("id");
                    let num = $(this).parent().children(".purnum").val();
                    let mod = $(this).parent().data("mod");
                    if( --num < 1 ){
                        num = 1;
                    }
                    $(this).parent().children(".tip").css({"display":"none"});
                    $(this).parent().children(".purnum").val(num);
                    _this.setlocalStorage(num,id,mod);
                    _this.money();
                    _this.total();
                    _this.allMoney();
                });
                //输入框
                $(".purnum").keyup(function(){
                    let num = $(this).val(),
                    id = $(this).parent().parent().data("id"),
                    mod = $(this).parent().data("mod");
                    if(num == "" || num <= 0 || num == undefined || num == null){
                        num = 1;
                    }else if(num >  $(this).data("num")){
                        num = $(this).data("num");
                        //数量超规定数量时显示提示
                        _this.none(this);
                    }
                    _this.setlocalStorage(num,id,mod);
                    _this.money();
                    _sthis.total();
                    _this.allMoney();
                })
                // 单选
                $(".checkbox").click(()=>{
                    _this.checkbox();
                    _this.allMoney()
                });
                //全选
                $(".check").click(()=>{
                    _this.allcheck();
                    _this.allMoney();
                });
                // 单删除
                $(".delBtn").click(function (){
                    let id = $(this).parent().parent().data("id"),
                    mod = $(this).parent().parent().children(".wrap_3").data("mod");
                    if(confirm("确定要删除？")){
                        
                        $(this).parent().parent().remove();
                        _this.delete(id,mod);
                    }
                });
                //全删
                $("#delAll").click(()=>{
                    if(confirm("确定要删除？")){

                    $(".checkbox").each((index,item)=>{
                        if(item.checked){
                            let id = $(item).parent().parent().parent().data("id"),
                            mod = $(item).parent().parent().parent().children(".wrap_3").data("mod");
                                
                                $(item).parent().parent().parent().remove();
                                this.delete(id,mod);
                            }
                        })
                        
                    
                        
                    }
                })
            }
            //删除
            delete(id,mod){
                let cart = JSON.parse(localStorage.getItem("cart")),
                i = 0;
                if(cart.some((item,index)=>{
                    i = index;
                    return item.id == id && item.mod == mod;
                })){
                    cart.splice(i,1);
                    
                } 
                    localStorage.setItem("cart",JSON.stringify(cart));
                    Header.cartNum();
                    this.checkbox()
                    this.total();
                    this.allMoney();
                    this.noshop();
            }
            //单商品数量价格
            money(){
                $(".price").each((index,item)=>{
                    
                    let zprice = $(item).parent().siblings(".wrap_3").children(".purnum").val() * $(item).html();
                    
                    $(item).parent().siblings(".wrap_5").html(zprice);
                })
            }
            //显示
            none(_this){
                clearTimeout(_this.timer);
                $(_this).parent().children(".tip").css({"display":"block"});
                _this.timer = setTimeout(()=>{
                    $(_this).parent().children(".tip").css({"display":"none"});
                },2000);
            }
            //设置localStorage
            setlocalStorage(num,id,mod){
                let obj = JSON.parse(localStorage.getItem("cart")),
                i = 0;
                if(obj.some((item,index)=>{
                    i = index;
                    //id和数据地址相同时
                    return item.id == id && item.mod == mod;
                })){
                    obj[i].num = num;
                    localStorage.setItem("cart",JSON.stringify(obj));
                }
                
            }
            //总计
            total(){
                let t = 0;
                $(".wrap_5").each((index,item)=>{
                    t += Number($(item).html());
                    
                })
                $(".total").html(t);
            }
            //全选
            allcheck(){
                
                    if($(".check").prop("checked")){
                        $(".checkbox").prop("checked",true);
                    }
                
            }
            //单选
            checkbox(){
                    this.i = 0;
                    $(".checkbox").each((index,item)=>{
                        if(item.checked){
                            this.i++;
                        }
                    })

                    if(this.i !=  $(".checkbox").length){
                        $(".check").get(0).checked = false;
                    }else{
                        $(".check").get(0).checked = true;
                    }
                    console.log(this.i);
            }
            //选中商品总价
            allMoney(){
                let allprice = 0;
                $(".checkbox").each((index,item)=>{
                    if(item.checked){
                        allprice += Number($(item).parent().parent().parent().children(".wrap_5").html());
                    }
                })
                $("#allprice").html(allprice);
            }
            //购物车无商品
            noshop(){
                let cart = JSON.parse(localStorage.getItem("cart"));
                if(cart.length==0 || cart==null){
                    
                    $(".cart-main").css({"display":"none"});
                    $(".noshop").css({"display":"block"});
                    
                }
            }
        }
        new Cart();
    })
})
