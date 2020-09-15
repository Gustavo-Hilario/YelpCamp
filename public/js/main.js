$(document).ready(function () {
	// SCROLLING NAVBAR VARIABLES
	var previousYPosition = window.pageYOffset;

	if ($('div#topCampgrounds').length > 0) {
		var maxYPositionwithoutNavbar = $('#topCampgrounds').position().top;

		// SHOW/HIDE NAVBAR WHEN SCROLL UP/DOWN LOGIC
		$(window).scroll(function () {
			var currentYPosition = window.pageYOffset;
			if (currentYPosition > maxYPositionwithoutNavbar) {
				$("#topCampgrounds").css("margin-top", "200px");
				$("nav").removeClass("d-none");
			} else {
				$("#topCampgrounds").css("margin-top", "50px");
				$("nav").addClass("d-none");
			}
			if (currentYPosition < previousYPosition) {
				$("#topCampgrounds").css("margin-top", "50px");
				$("nav").addClass("d-none");
			}
			previousYPosition = currentYPosition;
		})
	} else if ($('div#allCampgrounds').length > 0) {
		$("nav").removeClass("d-none");
		$(window).scroll(function () {
			var currentYPosition = window.pageYOffset;
			if (currentYPosition == 0) {
				$("nav").removeClass("d-none");
			} else if (currentYPosition < previousYPosition) {
				$("nav").addClass("d-none");
			} else {
				$("nav").removeClass("d-none");
			}
			previousYPosition = currentYPosition;
		})
	}
});
