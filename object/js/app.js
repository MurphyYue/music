
function route(m,container){
	container=container||$("#share")
	$.ajax({
		url:"views/"+m+".html",
		success:function(data){
			container.html(data);
			console.log("ok")
			loadJs(m);
			
		},
		error:function(){
			console.log("fail")
		}
	});
}
function loadJs(m){
	
	var jsUrl="js/"+m+".js"
	$.ajax({
		url:jsUrl,
		dataType:"script"
	})
}
$(function(){
	route("table");
	route("play",$("#global"));
	

})
var myPlayList=[];