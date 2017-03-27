(function() {
	function getPlaylists(callBack,limit,offset){
		//访问网络
		offset=offset||0;
		limit=limit||6;
		//var server="http://musicapi.duapp.com/api.php?";
	var server="api/topPlayList.json"
		limit=limit||6;
		$.ajax({
			type:"get",
			url:server/*+"type=topPlayList&cat=%E5%85%A8%E9%83%A8&offset="+offset+"&limit="+limit*/,
			async:true,
			success:function(data){
				if(data.code==200){
					callBack(data.playlists);
				}
			}
		});
	};
	function creatList(data){
		
		var $contentWrap=$(".content-wrap")
		var item=$(".contentTemplate").html()
		for(var i=0;i<data.length;i++){
			$(item)
			.find(".pic").attr("href","#view4?id="+data[i].id).end()
			.find(".pic img").attr("src",data[i].coverImgUrl).on("click",function(){
				route("view4",$("#share"));
			}).end()
			.find(".text").html(data[i].name).end()
			.find(".number").html(data[i].playCount).end()
			.appendTo($contentWrap)
		}
	}
	getPlaylists(function(data){
		$("#image-loading").hide();
		creatList(data);
	});	
	var offset=0;
	$("#image-loading").show()
	$(window).scroll(function(){
		var deviceHeight=$(window).height()-103;
		var documentHeight=$("#share").height();
		var scrollHeight=$(window).scrollTop();
		var limit=6;
		if(scrollHeight+deviceHeight>=documentHeight){
			offset+=limit;
			$("#image-loading").show();
			getPlaylists(function(data){
				$("#image-loading").hide();
				creatList(data);
			},limit,offset);
		}
	});
	/*$(".pic img").each(function(){
		$(this).on("click",function(){
			
			route("detail",$("#share"))
		})
	})*/
	
})()

