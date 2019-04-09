/**
 * 注册验证
 */
require(["require.config"],()=>{
    require(["jquery","url","tools"],($,url)=>{
        class Register{
            constructor(){
                this.init();
            }
            init(){
                $("#register-btn").on("click",function () {
                    var username = $("#username").val(),
                        password = $("#password").val();
                        $.ajax({
                            type:"post",
                            url:url.phpbaseUrl+"register.php",
                            data:{ //【这里填写是传给服务端的数据 可传可不传 数据必须是json格式】
                                username,password
                            },
                            dataType:'json',  //【这里要小心啊，不要用jsonp，一定是json】
                            crossDomain: true,  //【这个很重要，一定要加】
                            success:function (res) {
                        
                                if(res.res_code===1){
                                    alert(res.res_message+"，将跳转到登录界面！");
                                    window.location="/html/login.html";
                            }else{
                                    alert(res.res_message+"，请重新输入！");
                            }
                            }
                        });

                })
            }
        }
        new Register()
    })
})