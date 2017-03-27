(function() {
	//生成轮播图的icon
	for(var i = 0; i < $(".banner .pic").length; i++) {
		$("<div class='icon'></div>").appendTo($(".banner .icon-wrap"))
	}
	
	$(".icon").each(function(){
			$(this).css({"background":"#ccc"})
		})
	$(".icon").eq(0).css({"background":"#E1A64A"})
	//点击icon时实现；轮播
	$(".icon").on("click",function(){
		$(".icon").each(function(){
			$(this).css({"background":"#ccc"})
		})
		$(this).css({"background":"#E1A64A"})
		var i=$(this).index()
		$(".banner .pic").each(function(){
			$(this).css({transform:"translateX(-"+i*100+"vw)"})
		})
	})
	
	function getPlaylists(callBack,limit){
		
	if(getCache()){
		//访问缓存
		console.log("访问缓存")
		callBack( JSON.parse(localStorage.playlists) )
	}else{
		//访问网络
		console.log("访问网络")	
		var server="http://musicapi.duapp.com/api.php?"
//	var server="api/topPlayList.json"
		limit=limit||6;
		$.ajax({
			type:"get",
			url:server+"type=topPlayList&cat=%E5%85%A8%E9%83%A8&offset=0&limit="+limit,
			async:true,
			success:function(data){
				if(data.code==200){
					localStorage.playlists=JSON.stringify(data.playlists);
					localStorage.cacheTime=new Date().getTime();
					callBack(data.playlists)
				}
			}
		});
	}
	function getCache(){
		if(!localStorage.playlists)
		return false;
		if(new Date().getTime()-localStorage.cacheTime>=10*60*1000)
		return false;
		return true;
	}
	};
	getPlaylists(function(data){
		console.log(data)
		var $listContent=$(".list .content")
		var $item=$(".template-item").html()
		$listContent.html("")
		for(var i=0;i<data.length;i++){
			$($item)
			.find(".pic img").attr("src",data[i].coverImgUrl).end()
			.find("p").html(data[i].name).end()
			.find(".number").html(data[i].playCount).end()
			.appendTo($listContent)
		}
	});	
})()
