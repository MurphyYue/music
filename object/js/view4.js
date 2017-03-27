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
		
		var id=getUrlParams().id
		$.ajax({
			type:"get",
			//url:"https://api.imjad.cn/cloudmusic/?type=playlist&id="+id,
			url:"api/playlist.json",
			async:true,
			success:function(data){
				if(data.code==200){
					callBack(data.playlist)
				}
			}
		});
	};
	getPlaylist(function(data){
		console.log(data);
		var $playList=$(".list ol");
		var listItem=$(".playlistTemplate").html()
		$(".playlist-info").find(".info-title").html(data.name).end()
							.find(".author").html(data.creator.nickname).end()
		for(var i=0;i<data.tracks.length;i++){
			$(listItem)
			.find(".song").html(data.tracks[i].name).end()
			.find(".singer").html(data.tracks[i].ar[0].name).end()
			.appendTo($playList)
			.data("music",data.tracks[i]);
			.on("click",function(){
				var m=$(this).data("music");
				play(m);
			});
			
		}
	})
})()