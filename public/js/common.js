define(function(require, exports, module) {
	var str = $.cookie("cart");
	var obj = str ? JSON.parse(str) : {};

	function Sum() {
		var sum = 0;
		for(var i in obj) {
			sum += obj[i];
		}
		$(".shopsum").html(sum);
	}

	function loadh() {
		$.ajaxSettings.async = false;
		$("#bao").load("public/common.html");

		Sum();
	}

	function loadf() {
		//获取尾部
		$("footer").load("public/footer.html");
	}
	/*导航栏插入*/
	function insert() {
		$.get("json/nav.json", function(data) {
			var html = template("lei", data);
			$(".lei").html(html);
		})

	}

	/*分页操作*/
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
				html += "<li><img src='" + arr[i].img1url[0] + "' class='shang'><p class='p1'>￥" + arr[i].price + "</p><p class='p2'>" + arr[i].title + "</p><p>已有2342条评价</p><img src='image/zi.png'></li>"
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
				let oindex = arr[$(this).parent().parent().index()].productId;
				if(obj[oindex] == undefined) {
					obj[oindex] = Number($(this).siblings("input[class='pronu']").val());
				} else {
					obj[oindex] += Number($(this).siblings("input[class='pronu']").val());

				}
				$("#carmsg").css("display", "block");
				var objTostr = JSON.stringify(obj);
				$.cookie("cart", objTostr, { expires: 7 });
				Sum();

			})
			$("#carmsg").height(document.body.clientHeight);
			/*设置关闭事件*/
			setInterval(function() {
				$("#carmsg").css("display", "none");
			}, 4000)
			$(".cha").click(function() {
				$("#carmsg").css("display", "none");
			})
			var html0 = "";
			for(let i = 0; i < 4; i++) {
				html0 += "<li><a href='particulars.html?" + arr[i].productId + "'><img src='" +arr[i].img1url[0]+ "'></a></li>"
			}
			$(".guild").html(html0);
		})
	}
	module.exports = {
		loadh: loadh,
		loadf: loadf,
		insert: insert,
		fenye: fenye
	}
})