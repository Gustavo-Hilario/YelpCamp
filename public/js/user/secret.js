$(document).ready(function () {

	//OPEN HIDDEN BUTTON
	$("#editCamp").click(function () {
		if ($(this).text() === 'Edit Campgrounds') {
			$(this).text('Finish Editing');
		} else {
			$(this).text('Edit Campgrounds');
		}

		$("div.ownerButtons").toggle("");
	});
});