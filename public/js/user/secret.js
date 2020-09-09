var form;
var campgroundID;
var dialogID;

$(document).ready(function(){
	
//OPEN HIDDEN BUTTON
	$("#editCamp").click(function(){
		if($(this).text() === 'Edit Campgrounds')
		{
			$(this).text('Finish Editing');
		} else 
		{
			$(this).text('Edit Campgrounds');
		}
		
		$("div.ownerButtons").toggle("");
	});

// CARD MOUSEOVER 
	$("div.card").mouseover(function(){
		$(this).find("p.card-text").css("font-weight", "400");
	});
	$("div.card").mouseout(function(){
		$(this).find("p.card-text").css("font-weight", "");
	});
	
// DIALOG SETTING	
    $(".dialog").dialog({
		autoOpen: false,
		resizable: false,
		height: "auto",
		width: 400,
		modal: true,
		
		show: {
			effect: "shake",
			duration: 250
		},
		
		hide: {
			effect: "clip",
			duration: 400
	  	},
		
		buttons: [
			
			{
				text: "Delete Campground",
				click: function() {
					$("#" + form).submit();	
					$( this ).dialog( "close" );
				}
			},
				
			{
				text: "Cancel",
				icon: "ui-icon-heart",
				click: function() {
					$( this ).dialog( "close" );
				}
			},
		]
    });
 
// OPEN MY DIALOG WHEN DELETE BUTTON CLICKED
	$(".openerButton").click(function(){
		campgroundID = $(this).attr("id");
		form = $(this).parent().attr("id");
		dialogID = "dialog" + campgroundID;
		$( "#" + dialogID ).dialog( "open" );
	});
	
 });