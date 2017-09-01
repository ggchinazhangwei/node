define(function(require,exports,module){
			var common=require("common");
			common.loadf();
			$.get("json/shuju.json",function(data){
				var obj=$.cookie("cart");
				if(obj==undefined){
					var html=template("nohave",data);
					$(".car").html(html);
					$(".jiesuan").remove();
				}else{					
					$(".car").css("border",0);					
					function showli(){
					var html="";
					obj=JSON.parse($.cookie("cart"));
					for(let i in obj){					
					   html+="<li class='valign' dataId='"+data.productjson[i].productId+"'><input type='checkbox' class='ock' checked><img src='"+data.productjson[i].img1url[0]+"'/><div class='tbox over'>"+data.productjson[i].title+"</div><span class='op'>"+data.productjson[i].price+"</span><span class='mgold'>￥"+(data.productjson[i].gold)*obj[i]+"</span><div class='carsum'><input type='button' value='+' class='zuo' dataId='"+data.productjson[i].productId+"'/><input type='' value='"+obj[i]+"' class='c-number'><input type='button' value='-' class='you' dataId='"+data.productjson[i].productId+"'/></div><div class='heji'>￥"+data.productjson[i].price*obj[i]+"</div><input type='button' value='删除' class='removep' dataId='"+data.productjson[i].productId+"'></li>";					   
					}
					$(".carbox").html("<ul class='plist'>"+html+"</ul>");
					}
					showli();
					/*初始化页面计算总价*/
					function foo(){
					var sum1=0;
					var sum2=0;
					var sum3=0;
					for(let i=0;i<$(".c-number").length;i++){
						if($(".c-number").eq(i).parents("li").find("input[type='checkbox']").prop("checked")){
						sum1+=Number($(".c-number").eq(i).val());
						sum2+=$(".c-number").eq(i).val()*($(".c-number").eq(i).parent().siblings(".mgold").html().substr(1));
						sum3+=$(".c-number").eq(i).val()*($(".c-number").eq(i).parent().siblings(".op").html());
						}					
					}
					$(".j3").html("￥"+sum3);
					$(".j2").html(sum2);
					$(".j1").html(sum1);
					}
					foo();
					/*判断数据为空时清除cookie*/
					function shanchu(){
						if(JSON.stringify(obj) == "{}"){
							console.log(111)
							var html=template("nohave",data);
							$(".car").html(html);
							$(".jiesuan").remove();
							$.removeCookie("cart");
						}

					}
					/*checkbox按钮事件*/
					/*点击全选按钮选中所有按钮*/
					$(".sumck").click(function(){
						var flag=$(this).prop("checked")
						$("input[type='checkbox']").prop("checked",flag);
						foo();
					})
					$("input[type='checkbox']").click(function(){
						if($(this).prop("checked")==false){
							$(".sumck").prop("checked",false);
						}
						foo();
					})
					
					/*加减删除按钮事件*/
					for(var j=0;j<$(".zuo").length;j++){
						$(".zuo").eq(j).click(function(){
							obj[$(this).attr('dataId')]+=1;
							$.cookie("cart",JSON.stringify(obj),{expires:7});
							$(this).siblings(".c-number").val(obj[$(this).attr('dataId')]);
							var jiage=data.productjson[$(this).attr('dataId')].price;
							var jinbi=data.productjson[$(this).attr('dataId')].gold
							$(this).parent().siblings(".heji").html("￥"+(jiage*obj[$(this).attr('dataId')]));
							$(this).parent().siblings(".mgold").html("￥"+(jinbi*obj[$(this).attr('dataId')]));
							foo();
						})
						$(".you").eq(j).click(function(){
							if(obj[$(this).attr('dataId')]>1){
								obj[$(this).attr('dataId')]-=1;		
								$.cookie("cart",JSON.stringify(obj),{expires:7});
								$(this).siblings(".c-number").val(obj[$(this).attr('dataId')]);
								 jiage=data.productjson[$(this).attr('dataId')].price;
								var jinbi=data.productjson[$(this).attr('dataId')].gold
								$(this).parent().siblings(".heji").html("￥"+(jiage*obj[$(this).attr('dataId')]));
								$(this).parent().siblings(".mgold").html("￥"+(jinbi*obj[$(this).attr('dataId')]));
								foo();
							}							
						})
						$(".removep").eq(j).click(function(){
								delete obj[$(this).attr('dataId')];
								$.cookie("cart",JSON.stringify(obj),{expires:7});
								$(this).parent().remove();
								foo();
								shanchu();
						})
					}
					/*清空购物车事件*/
					$(".btn2").click(function(){
						var html=template("nohave",data);
						$(".car").html(html);
						$(".jiesuan").remove();
						$.removeCookie("cart");
					})
					/*删除选中商品*/
					$(".btn1").click(function(){
						for(let i=0;i<$(".ock").length;i++){
						if($(".ock").eq(i).prop("checked")){
							delete obj[$(".ock").eq(i).parent().attr('dataId')];
							$.cookie("cart",JSON.stringify(obj),{expires:7});
							$(".ock").eq(i).parent().remove();
							foo();
						}
						}
						shanchu();
					})
				}
			})
})
			