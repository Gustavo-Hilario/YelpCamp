$('head').append("<link href='https://fonts.googleapis.com/css2?family=Rock+Salt&display=swap' rel='stylesheet'>");

$(document).ready(function(){
	$("div.card").mouseover(function(){
		$(this).find("p.card-text").css("font-weight", "400");
	});
	$("div.card").mouseout(function(){
		$(this).find("p.card-text").css("font-weight", "");
	});
});