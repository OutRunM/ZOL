/**
 * 公共尾部
 */
define(["jquery"], ($)=> {
    class Footer{
        constructor(){
            this.init();
           }
        init(){
            $(".footer").load("/html/module/footer.html",()=>{
                
            })
        }
    }
    return new Footer();
    
});