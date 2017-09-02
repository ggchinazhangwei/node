define(function(require,exports,module){
	var common1=require("common1");
	common1.loadh();
	common1.loadf();
	function fenye(url, pageNum) {
		$.get(url, function(data) {
			var arr = data.productjson;
			/*设置按钮事件*/
			var num = Math.ceil(arr.length / pageNum);
			for(let i = 0; i < num; i++) {
				var target = "<a href='listview.html?page" + (i + 1) + "'>" + (i + 1) + "</a>"
				$(".pageo").before(target);
			}
			var ohref = Number(location.search.substr(-1));

			if(ohref > 1) {
				$(".pagep").attr("href", "listview.html?page" + (ohref - 1));
			}
			if(ohref < num) {
				$(".pageo").attr("href", "listview.html?page" + (ohref + 1));
			}
			$(".page>a").eq(ohref).addClass("active")
			$("a").mousedown(function() {
				$(this).addClass("active")
			});
			$("a").mouseup(function() {
				$(this).removeClass("active")
			});
			/*设置分页显示数据*/
			var date = [];
			for(let i = (ohref - 1) * pageNum; i < (ohref * pageNum > arr.length ? arr.length : ohref * pageNum); i++) {
				date.push(arr[i]);
			}
			var html = "";
			for(var i in date) {
				html += "<li data-id='"+arr[i].productId+"'><img src='" + arr[i].img1url[0] + "' class='shang'><p class='p1'>￥" + arr[i].price + "</p><p class='p2'>" + arr[i].title + "</p><p>已有2342条评价</p><img src='image/zi.png'></li>"
			}
			$(".shuju").html(html);
			$(".shuju>li").append($(".shujub"));
			$(".shuju>li img").click(function() {
				var url1 = "particulars.html?" + arr[$(this).parent().index()].productId;
				window.open(url1);
			})
			/*加减加购物车事件*/
			$(".addbtn").click(function() {
				var txt = $(this).parent().siblings("input[class='pronu']");
				txt.val(Number(txt.val()) + 1);

			});
			$(".minusbtn").click(function() {
				var txt = $(this).parent().siblings("input[class='pronu']");
				if(txt.val() > 1) {
					txt.val(Number(txt.val()) - 1);
				}
			})
			/*存cooki事件*/
			$(".shopcar1").click(function() {
				let number=$(this).parents("li").index();
				let date=data.productjson[number];
				var odom=$(".pronu").eq(number)
				common1.Shop(date,odom,data)
			});
		});
	};
	fenye("/list",24);
});

