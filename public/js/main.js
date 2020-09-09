$(document).ready(function(){
		// SCROLLING NAVBAR VARIABLES
		var maxYPositionwithoutNavbar;
		if(window.innerWidth >= 768 ){
			maxYPositionwithoutNavbar = $('#advantages').height();
		} else {
			maxYPositionwithoutNavbar = $('#advantagesRow1').height();
		}
		var previousYPosition = window.pageYOffset;
	// SHOW/HIDE NAVBAR WHEN SCROLL UP/DOWN LOGIC
		$(window).scroll(function(){
			var currentYPosition = window.pageYOffset;
			if(currentYPosition > maxYPositionwithoutNavbar){
				$("nav").removeClass( "d-none" );
			} else{
				$("nav").addClass( "d-none" );
			}
			// if(currentYPosition < previousYPosition){
			// 	$("nav.navbar").hide("fade", 300);
			// }
			previousYPosition = currentYPosition;
		})
});
