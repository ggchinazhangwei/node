define(function(require,exports,module){
	var common1=require("common1");
	common1.loadh();
	common1.loadf();
	common1.insert();
			//banner 轮播
			$(".b-tab b:first-child").addClass("active");
			for(let i=0;i<$(".banner li").length;i++){	
				$(".banner li").eq(i).css({"background":"url(image/banner"+(i+1)+".jpg) no-repeat center"});
				$(".b-tab").append("<b>"+(i+1)+"</b>");
				
			}
			$(".b-tab b:first-child").addClass("active");
			var i=0;
			function lunbo(){
				$(".banner li").eq(i).stop().fadeIn(200).siblings().stop().fadeOut(200);
				$(".b-tab b").eq(i+1).addClass("active").siblings().removeClass("active");
				i++;
				if(i==4){
					i=0;
					$(".b-tab b").eq(0).addClass("active").siblings().removeClass("active");
				}
				
			}
			var timer=setInterval(function(){
				lunbo();
			},3000);
			
			$(".b-tab b").on("mouseover click",function(){
			i=$(this).index()-1;
			lunbo();
			});
			//mian
			//调用轮播插件
			$(".lunbo").Silder({"width":200,height:500});
			$(".lunbo2").Silder({"width":200,height:500});
			$(".lunbo3").Silder({"width":200,height:500});
			$(".lunbo4").Silder({"width":200,height:500});
			$(".lunbo5").Silder({"width":200,height:500});
			//设置数据模板引擎
			$.get("/shu",function(data){
				console.log(data);
				var html=template("pro",data);
				$(".prouctList").html(html);
			})
		
		
})
			