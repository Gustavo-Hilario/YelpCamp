$('head').append("<link href='https://fonts.googleapis.com/css2?family=Rock+Salt&display=swap' rel='stylesheet'>");

$(document).ready(function(){
	$("div.card").mouseover(function(){
		$(this).find("p.card-text").css("font-weight", "400");
	});
	$("div.card").mouseout(function(){
		$(this).find("p.card-text").css("font-weight", "");
	});

	// Testimonials showing effect ...
	var testimonialsPosition = Math.floor($('#clientsTestimonials').position().top + $('#clientsTestimonials').innerHeight()/2);
	var windowPosition = 0;
	$('#rowOfTestiomonials').hide();

	$(window).scroll( () => {
		windowPosition = Math.floor(window.scrollY + window.innerHeight);

		if(windowPosition >= testimonialsPosition){
			$('#rowOfTestiomonials').show("drop", 2000);
		}
		// console.log('testimonialsPosition: ' + testimonialsPosition);
		// console.log('windowposition: ' + windowPosition);
	});
});