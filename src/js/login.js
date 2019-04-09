/**
 * 登录验证
 */
require(["require.config",],()=>{
    require(["jquery","url","tools"],($,url)=>{
        class Login{
            constructor(){
                this.init();
            }
            init(){
                $("#login-btn").on("click",function(){
                    var username = $("#username").val(),
                        password = $("#password").val(),
                        check = $("#check")[0];
        
                        $.ajax({
                            type:"post",
                            url:url.phpbaseUrl+"login.php",
                            data:{ //【这里填写是传给服务端的数据 可传可不传 数据必须是json格式】
                                username,password
                            },
                            dataType:'json',  //【这里要小心啊，不要用jsonp，一定是json】
                            crossDomain: true,  //【这个很重要，一定要加】
                            success:function(res){
                                    if(res.res_code === 1 ){
                                        if(check.checked){
                                            localStorage.setItem("user",username);
                                        }else{
                                            tools.cookie("user",username,{"path":"/"});
                                        }
                                        
                    
                                        alert(res.res_message+",将调整至首页！");
                                        window.location="/index.html";
                                        
                                    }else{
                                        alert(res.res_message+"！");
                                    }
                                    
                                }
                        });
                    // $.post(url.phpbaseUrl+"login.php",{username,password},,"json");
                })
        
            }
        }
        new Login();
    })
})
