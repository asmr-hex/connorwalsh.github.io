
$(document).ready(function(){
	
	var collection_size = 0;
	var html_append = "";
	for( i in art_list["pieces"]){
		collection_size++;
		var art_html = "<div class='piece'><div class='img_wrap'><img class='piece_img' src='./img/art/" + art_list["pieces"][i] + "'></div>";
		    art_html+= "<p class= 'piece_name'>" + art_list["piece_name"][i] + "</p>";
		    art_html+= "<p class= 'piece_info'>" + art_list["descriptions"][i] + "</p> </div>";
		html_append += art_html;
	}
	$("#art_container").prepend(html_append);
	
/*	$(window).click(function(){
		alert(html_append);
	});*/
	
	
	
	var lastscroll = 0;
	$( window).
	    bind( 'scroll', function ( e ) {
var dx = $(this).scrollLeft();
var leftpos = parseInt($("#art_container").css("left"),10);
$("#art_container").css({"left" : leftpos - (dx - lastscroll)});

	        e.preventDefault();
	lastscroll = dx;
	    });	
	
	
	/*
var lastscroll = 0;
$(window).scroll(function(ev){

	var dx = $(this).scrollLeft();

	//move home button if scroll
		var leftpos = parseInt($("#home_container").css("left"),10);
		$("#home_container").css({"left" : leftpos + (dx - lastscroll)});
	//move headers 1 and 2 if scroll
		leftpos = parseInt($("#header1").css("left"),10);
		$("#header1").css({"left" : leftpos + (dx - lastscroll)});
		leftpos = parseInt($("#header2").css("left"),10);
		$("#header2").css({"left" : leftpos + (dx - lastscroll)});
		
	lastscroll = dx;
})*/

         

});





