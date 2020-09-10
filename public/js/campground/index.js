$('head').append("<link href='https://fonts.googleapis.com/css2?family=Rock+Salt&display=swap' rel='stylesheet'>");

$(document).ready(function(){
	$("div.card").mouseover(function(){
		$(this).find("p.card-text").css("font-weight", "400");
	});
	$("div.card").mouseout(function(){
		$(this).find("p.card-text").css("font-weight", "");
	});

	// Testimonials showing effect ...
	var testimonialsPosition = $('#topCampgrounds').position().top + $('#topCampgrounds').innerHeight();
	var windowPosition = 0;
	$('#clientsTestimonials').hide();

	$(window).scroll( () => {
		windowPosition = window.scrollY + window.innerHeight;

		if(windowPosition > testimonialsPosition){
			$('#clientsTestimonials').show('drop', 2000);
		}
		// console.log('testimonialsPosition: ' + Math.floor(testimonialsPosition));
		// console.log('windowposition: ' + Math.floor(windowPosition));
	});
});