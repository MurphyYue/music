audioPlay={
	server:"api/playlist.json",
	play:function paly(music) {
		$.ajax({
			type: "get",
			url: this.server,
			success: function(data) {
				if(data.code == 200) {
					var audio = $("#audio")[0];
					audio.src = music.;
					audio.paly();
				}
			}
		});
	}
}
