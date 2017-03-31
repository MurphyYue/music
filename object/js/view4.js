(function(){
	function getUrlParams() {
		var params = {};
		var url = window.location.href;

		var p = url.split("#");
		if(p.length == 2)
			p = p[1];
		else
			p = url;

		p = p.split("?");
		if(p.length < 2) {
			params.anchor = p[0];
			return params;
		}

		params.anchor = p[0];
		p = p[1].split("&");

		for(var i = 0; i < p.length; i++) {
			var kv = p[i].split("=");
			params[kv[0]] = kv[1];
		}
		return params;
	};
	function getPlaylist(callBack){
		
		var id=getUrlParams().id;
		
		$.ajax({
			type:"get",
			url:"https://api.imjad.cn/cloudmusic/?type=playlist&id="+id,
			async:true,
			success:function(data){
				if(data.code==200){
					callBack(data.playlist)
				}
			}
		});
	};
	getPlaylist(function(data){
		
		var $playList=$(".list ol");
		var listItem=$(".playlistTemplate").html()
		var $myPlayList=(".myPlayList ul")
		var myListItem=$("myPlayListTemplate").html();
		$(".playlist-info").find(".info-title").html(data.name).end()
							.find(".author").html(data.creator.nickname).end()
							.find("img").attr({"src":data.creator.backgroundUrl})
							
		for(var i=0;i<data.tracks.length;i++){
			var index="";
			$(listItem)
			.find(".song").html(data.tracks[i].name).end()
			.find(".singer").html(data.tracks[i].ar[0].name).end()
			.data("music",data.tracks[i])
			.on("click",function(){
				var m=$(this).data("music");
				$(".fixed-bot")
				.css({"display":"block"})
				.find(".pic img").attr({"src":m.al.picUrl})
				audioPlay.play(m);
				myPlayList.push(m);
				index=$(this).index()
				
				console.log(index)
				/*$(myListItem)
				.find(".song").html(myPlayList.name).end()
				.find(".singer").html(myPlayList.ar[0].name).end()
				.appendTo($myPlayList)*/
				
			})
			.appendTo($playList)
			
			$(".control .next").on("click",function(){
				index++;
				if(index>=data.tracks.length){
					index=0
				}
				console.log(index)
				audioPlay.play(data.tracks[index]);		
			})
		}
		
	});
	$(".head .back").on("click",function(){
		route("table");
	})
	
})()