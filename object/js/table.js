(function() {
	route("view1", $("#container"))
		//选项卡的点击
	$(".nav-bar").each(function(index) {
		$(this).on("click", function() {

			$(".bot-bar").animate({
				"left": $(this).width() * index + "px"
			}, 200)
			var page = $(this).find("a").attr("class")
			route(page, $("#container"));
		})
	})

})()