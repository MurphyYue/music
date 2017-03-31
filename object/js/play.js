var audioPlay={
	server:"http://musicapi.duapp.com/api.php",
	play:function paly(music) {
		var audio = $("#audio").get(0);
		$(".picLoading").show()
		$(".display .pic").hide()
		$.ajax({
			type: "get",
			url: this.server+"?type=url&id="+music.id,
			success: function(data) {
				if(data.code == 200) {
					console.log("play")
					audio.src = data.data[0].url;
					audio.play();
					$(".picLoading").hide();
					$(".display .pic").show()
				};
			}
		});
		$(".fixed-bot h3").html(music.name);
		$(".fixed-bot p").html(music.ar[0].name);
		if(audio.play()){
			$(".playSong").css({"background-image":"url(images/playbar_btn_pause.png)"})
		}
		audio.play();
		var playsong="play";
		$(".playSong").on("click",function(){
			if(playsong=="play"){
			$(this).css({"background-image":"url(images/playbar_btn_play.png)"})	
			audio.pause();
			playsong="pause";
		}else if(playsong=="pause"){
			$(this).css({"background-image":"url(images/playbar_btn_pause.png)"})
			
			audio.play();
			playsong="play";
		}
		});
		
		
	}
}

	

