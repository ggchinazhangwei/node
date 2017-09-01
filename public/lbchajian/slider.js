//$(".silderBox").Slider({number:false,showA:false,interval:1000,width:400,height:500})
//showA 是否显示锚点;
//number 锚点是否有数字
//interval 定时器事件
$(function(){
			(function($){$.fn.extend({
			Silder:function(now){
				var defaults={
					width:200,
					height:470,
					interval:3000,
					showA:true,
					number:true
				};			
				var options=$.extend(true,{},defaults,now);
				class Silder{
					constructor(main){
						this.main=main;
						this.width=options.width;
						this.height=options.height;
					}
					clone(){
						
						this.main.children("ul").append(this.main.children("ul").children().first().clone(true));
					}
					layout(){
						this.main.width(this.width);
						this.main.height(this.height);
						this.main.children("ul").children().width(this.width);
						this.main.children("ul").children().height(this.height);
						this.main.children("ul").width((this.main.children("ul").children().length)*this.main.children("ul").children().width());
						this.main.children("ul").height(this.height);
						var str="";
						this.main.append("<div class='anchorbox'></div>");
						for(let i=1;i<this.main.children("ul").children().length;i++){
							str+="<b>"+i+"</b>"
						}
						this.main.find(".anchorbox").html(str);
						this.main.find(".anchorbox").children().first().addClass("active");
						if(options.showA==false){
							this.main.find(".anchorbox").hide()
						}
						if(options.number==false){
							this.main.find(".anchorbox").children().html("");
						}
					}
					show(){
						var i=0;
						function move(x){
							i++;
							var oul=x.main.children("ul");
							var oli=oul.children();	
							if(i==oli.length){
								oul.css("left",0);
								i=1;
							}
							if(i==oli.length-1){
							x.main.find(".anchorbox").children().first().addClass("active").siblings().removeClass("active");	
							}
							x.main.find(".anchorbox").children().eq(i).addClass("active").siblings().removeClass("active");
							oul.stop().animate({"left":-i*oli.width()},200,function(){
								clearInterval(timer);
								timer=setInterval(function(){
									move(_this);
								},options.interval);
							});
							
						}
						var _this=this;
						var timer=setInterval(function(){
							move(_this);
						},options.interval);
						this.main.find(".anchorbox").children().on("click mouseover",function(){
							clearInterval(timer);
							i=$(this).index()-1
							move(_this);
						})
			
					}
				}
				var silder=new Silder($(this));
				silder.clone();
				silder.layout(this);
				silder.show();
			}		
		})})($)
		})