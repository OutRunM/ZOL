require.config({
    baseUrl:"/",
    paths:{
        "jquery":"libs/jquery-1.11.3.js/jquery-1.11.3.min",
        "tools":"libs/tools/tools",
        "header":"js/module/header",
        "search":"js/module/search",
        "template":"libs/art-template/template-web",
        "Swiper":"libs/swiper/js/swiper.min",
        "boutique":"js/module/boutique",
        "nav":"js/module/nav",
        "shoplist":"js/module/shoplist",
        "footer":"js/module/footer",
        "zoom":"libs/jquery-plugins/jquery.elevateZoom-3.0.8.min",
        "url":"js/module/url",
        "list":"js/list",
        "sort":"js/module/sort",
        "fly":"libs/jquery-plugins/jquery.fly.min"
    },
    shim : {
		"zoom" : {
			deps: ["jquery"]
        },
        "fly":{
            deps: ["jquery"]
        }
	}
})