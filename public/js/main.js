$(document).ready(function () {
	// SCROLLING NAVBAR VARIABLES
	if ($('div#topCampgrounds').length) {
		var maxYPositionwithoutNavbar = $('#topCampgrounds').position().top;
	} else {
		var maxYPositionwithoutNavbar = 50;
	}
	var previousYPosition = window.pageYOffset;

	// SHOW/HIDE NAVBAR WHEN SCROLL UP/DOWN LOGIC
	$(window).scroll(function () {
		var currentYPosition = window.pageYOffset;
		if (currentYPosition > maxYPositionwithoutNavbar) {
			$("nav").removeClass("d-none");
		} else {
			$("nav").addClass("d-none");
		}
		if (currentYPosition < previousYPosition) {
			$("nav").addClass("d-none");
		}
		previousYPosition = currentYPosition;
	})
});
