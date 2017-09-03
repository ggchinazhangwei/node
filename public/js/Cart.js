define(function(require,exports,module){
			/*全局公有方法部分！！！！！！！！！*/
			var common1=require("common1");
			common1.loadf();
			/*foo 初始化页面总价信息，封装函数，在之后每次点击按钮中调用该函数可以重新渲染页面价格*/
			function foo(){
				var sum1=0;
				var sum2=0;
				var sum3=0;
				for(let i=0;i<$(".c-number").length;i++){
					if($(".c-number").eq(i).parents("li").find("input[type='checkbox']").prop("checked")){
						sum1+=Number($(".c-number").eq(i).val());
						sum2+=Number($(".c-number").eq(i).parent().siblings(".mgold").html().substr(1));
						sum3+=$(".c-number").eq(i).val()*($(".c-number").eq(i).parent().siblings(".op").html());
					}
				}
				$(".j3").html("￥"+sum3);
				$(".j2").html(sum2);
				$(".j1").html(sum1);
			}
			/*点击全选按钮选中所有按钮*/
			function Checked(_this){
				var flag=_this.prop("checked")
				$("input[type='checkbox']").prop("checked",flag);
				foo();
			}
			function subChecked(_this){
				if(_this.prop("checked")==false){
					$(".sumck").prop("checked",false);
				}
				foo();
			};
			/*当购物车中没有商品显示nohave模式ui*/
			function shanchu(str,condition){
				if(str == condition){
					var html=template("nohave");
					$(".car").html(html);
					$(".jiesuan").remove();
					if($.cookie("cart")){
						$.removeCookie("cart");
					}
				}

			}
			/*删除单个li事件*/
			function RemoveLi(_this,arr){
				$.get("/removeli",{productId:_this.attr("dataid")});
				_this.parent().remove();
				shanchu(arr.length,0)
				foo();
			};
	/*！！！！！！！！！！！！！！！！全局共有变量方法结束部分*/
	//判断用户是否登录
	$.get("/only",function(result){
		if(result.msg){
			//调用cart接口，根据only接口返回的数据寻找商品数据库里的详细信息，根据用户的数量和详细信息参数利用template渲染页面
			var arr=[];
			for(var i in result.pronews){
				arr.push(Number(i));
			};
			$.post("/cart",{"my":arr},function(data){
				console.log(data);
				shanchu(data.length,0)
				let date={"productlist":data,"num":result.pronews};
				var html=template("pro",date);
				$(".carbox").html("<ul class='plist'>"+html+"</ul>");
				//调用foo计算总价
				foo();
				//调用全局函数判断全选事件
				$(".sumck").click(function(){
					Checked($(this));
				});
				$("input[type='checkbox']").click(function(){
					subChecked($(this));
				});
				/*加减按钮事件*/
				for(var j=0;j<$(".zuo").length;j++){
					$(".zuo").eq(j).click(function(){
						//点击增加c-number的数量,改变总价
						$(this).siblings(".c-number").val(Number($(this).siblings(".c-number").val())+1);
						for(var i in data){
							if($(this).attr("dataid")==data[i].productId){
								$(this).parent().siblings(".heji").html("￥"+$(this).siblings(".c-number").val()*data[i].price);
								$(this).parent().siblings(".mgold").html("￥"+$(this).siblings(".c-number").val()*data[i].gold);
								/*发送ajax请求改写该条商品在购物车中账户表register中信息*/
								$.ajax({
									url:"/update",
									data:{
										productId:$(this).attr("dataid"),
										num:$(this).siblings(".c-number").val()
									}
								});
							};
						};

						/*没点击一次重新渲染总价表*/
						foo();
					});
					$(".you").eq(j).click(function(){
						//点击增加c-number的数量,改变总价
						if($(this).siblings(".c-number").val()>1){
							$(this).siblings(".c-number").val(Number($(this).siblings(".c-number").val())-1);
							for(var i in data){
								if($(this).attr("dataid")==data[i].productId){
									$(this).parent().siblings(".heji").html("￥"+$(this).siblings(".c-number").val()*data[i].price);
									$(this).parent().siblings(".mgold").html("￥"+$(this).siblings(".c-number").val()*data[i].gold);
									/*发送ajax请求改写该条商品在购物车中账户表register中信息*/
									$.ajax({
										url:"/update",
										data:{
											productId:$(this).attr("dataid"),
											num:$(this).siblings(".c-number").val()
										}
									});
								};
							};
						};
						/*没点击一次重新渲染总价表*/
						foo();
					});
					/*删除按钮事件*/
					$(".removep").eq(j).click(function(){
						var _this=$(this);
							arr.splice(0,1);
							RemoveLi(_this,arr);
					});
				};
				/*删除选中商品事件*/
				$(".btn1").click(function(){
					for(let i=0;i<$(".ock").length;i++){
						if($(".ock").eq(i).prop("checked")){
							var _this=$(".ock").eq(i);
								arr.splice(0,1);
								RemoveLi(_this,arr);
						}
					}
				});
				/*清空购物车事件*/
				$(".btn2").click(function(){
					var html=template("nohave");
					$(".car").html(html);
					$(".jiesuan").remove();
					$.get("removeul");
				});

			});
		}else{
			$.get("/shu",function(data){
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
							if(i=="1010"){
								var a=9;
							}else{
								var a=i.substr(3)-1;
							}

							html+="<li class='valign' dataId='"+data.productjson[a].productId+"'><input type='checkbox' class='ock' checked><img src='"+data.productjson[a].img1url[0]+"'/><div class='tbox over'>"+data.productjson[a].title+"</div><span class='op'>"+data.productjson[a].price+"</span><span class='mgold'>￥"+(data.productjson[a].gold)*obj[i]+"</span><div class='carsum'><input type='button' value='+' class='zuo' dataId='"+data.productjson[a].productId+"'/><input type='' value='"+obj[i]+"' class='c-number'><input type='button' value='-' class='you' dataId='"+data.productjson[a].productId+"'/></div><div class='heji'>￥"+data.productjson[a].price*obj[i]+"</div><input type='button' value='删除' class='removep' dataId='"+data.productjson[a].productId+"'></li>";
						}
						$(".carbox").html("<ul class='plist'>"+html+"</ul>");
					}
					showli();
					/*初始化页面计算总价*/
					foo();
					/*判断数据为空时清除cookie*/
					shanchu(JSON.stringify(obj),"{}");
					/*checkbox按钮事件*/
					$(".sumck").click(function(){
						Checked($(this));
					})
					$("input[type='checkbox']").click(function(){
						subChecked($(this));
					})

					/*加减删除按钮事件*/
					for(var j=0;j<$(".zuo").length;j++){
						$(".zuo").eq(j).click(function(){
							obj[$(this).attr('dataId')]+=1;
							$.cookie("cart",JSON.stringify(obj),{expires:7});
							$(this).siblings(".c-number").val(obj[$(this).attr('dataId')]);
							let num=$(this).attr('dataId').substr(3);
							if(num==-1){
								num=9;
							}
							var jiage=data.productjson[num].price;
							var jinbi=data.productjson[num].gold
							$(this).parent().siblings(".heji").html("￥"+(jiage*obj[$(this).attr('dataId')]));
							$(this).parent().siblings(".mgold").html("￥"+(jinbi*obj[$(this).attr('dataId')]));
							foo();
						})
						$(".you").eq(j).click(function(){
							if(obj[$(this).attr('dataId')]>1){
								obj[$(this).attr('dataId')]-=1;
								$.cookie("cart",JSON.stringify(obj),{expires:7});
								$(this).siblings(".c-number").val(obj[$(this).attr('dataId')]);
								let num=$(this).attr('dataId').substr(3);
								if(num==-1){
									num=9;
								}
								jiage=data.productjson[num].price;
								var jinbi=data.productjson[num].gold
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
					});
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
			});
		}
	})

})
			