define(function(require,exports,module) {
    //渲染公共头部sum的数量
    function topSum() {
        function Sum() {
            var str = $.cookie("cart");
            var obj = str ? JSON.parse(str) : {};
            var sum = 0;
            for (var i in obj) {
                sum += obj[i];
            }
            $(".shopsum").html(sum);
        };
        $.ajax({
            url:"only",
            success:function(data){
                if(data.msg){
                    let count=0;
                    for(var i in data.pronews){
                        count+=Number(data.pronews[i]);
                    };
                    $(".shopsum").html(count);
                    //！！！！！！当判断到用户已经登录时重新渲染头部页面
                    $(".only").html("hi ~ 你好"+data.username+"<input type='button' class='cancel' value='注销'>");
                    //将cookie的内容加到当前用户数据库当中，然后删除cookie
                    if($.cookie("cart")){
                        let objC=JSON.parse($.cookie("cart"));
                        for(var i in objC){
                            if(data.pronews[i]){
                                data.pronews[i]=Number(data.pronews[i])+Number(objC[i]);
                            }else{
                                data.pronews[i]=objC[i];
                            }
                        }
                        //发送请求改写后端mongodb数据库将cookie和数据库同步，将data.pronews同步
                        $.get("/top",{newPronews:data.pronews},function(date){
                            //渲染页面shopsum
                            let counts=0;
                            for(var i in date){
                                counts+=Number(date[i]);
                            };
                            $(".shopsum").html(counts);
                            $.removeCookie("cart");
                        });

                    };

                    //点击注销清除cookie
                    $(".cancel").click(function(){
                        $.get("/cancel");
                        $.removeCookie("cart");
                        location.reload();
                    });
                }else{
                    Sum();
                }
            }
        });
    }

    //头部渲染
    function loadh() {
        $.ajaxSettings.async = false;
        $("#bao").load("public/common.html");
        topSum();
    }
    /*导航栏插入*/
    function insert() {
        $.get("json/nav.json", function(data) {
            var html = template("lei", data);
            $(".lei").html(html);
        })

    }
    //尾部渲染
    function loadf() {
        //获取尾部
        $("footer").load("public/footer.html");
    }
    /*事件！！！！！！！！！！点击加入购物车出事件*/
    function Shop(data,domval,cdata){
       $.get("only",function(date){
            //如果用户存在点击购物车按钮改写数据库
           if(date.msg){
               $.get("/shop",{num:domval.val(),xuhao:data.productId},function(){
               });
               $("#carmsg").css("display","block");
           }else{
               //如果用户不存在点击按钮增加cookie
               var str=$.cookie("cart");
               var obj=str? JSON.parse(str):{};
               if(obj[data.productId]==undefined){
                   obj[data.productId]=Number($(".pronu").val());
               }else{
                   obj[data.productId]+=Number($(".pronu").val());

               }
               $("#carmsg").css("display","block");
               var objTostr=JSON.stringify(obj);
               $.cookie("cart",objTostr,{expires:7});
           }

        });
        topSum();
        $("#carmsg").height(document.body.clientHeight);
        //设置弹窗
        var html0 = "";
        for (let i = 0; i < 4; i++) {
            html0 += "<li><a href='particulars.html?" + cdata.productjson[i].productId + "'><img src='" + cdata.productjson[i].img1url[0] + "'></a></li>"
        }
        $(".guild").html(html0);
        /*设置关闭事件*/
        setInterval(function(){
            $("#carmsg").css("display","none");
        },4000)
        $(".cha").click(function(){
            $("#carmsg").css("display","none");
        });
}
    /*暴露接口*/
    module.exports={
        loadh:loadh,
        loadf: loadf,
        insert: insert,
        Shop:Shop,
        topSum:topSum
    }
})
