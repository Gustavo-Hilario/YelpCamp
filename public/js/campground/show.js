var form;
var dialogID;

$(document).ready(function(){
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
			
//RESOLVE THIS
			{
				text: "Delete",
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
 
    $( ".dialogOpener" ).on( "click", function() {
		form = $(this).parent().attr("id");
		dialogID = $(this).attr("id");
		console.log("Form: " + form + " dialogID: " + dialogID);
		$( "#dialog" + dialogID).dialog( "open" );
    });
	
 });