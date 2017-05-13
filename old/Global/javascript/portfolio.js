
$(window).load(function(){
	//Page Transitions -----------------------
		$("div.loading").fadeOut("slow",function(){
			$("div.content").fadeIn(2000);
		});
	    
	    $("a.transition").click(function(event){
	        event.preventDefault();
	        linkLocation = this.href;
	        $("div.content").fadeOut(1000, function(){
				$("div.loading").fadeIn("slow", function(){
					window.location = linkLocation;
				}); 
		    });    
	    });
	
})

$(document).ready(function(){

	//Disable Selection function
	$.extend($.fn.disableTextSelect = function() {
		return this.each(function(){
			if($.browser.mozilla){//Firefox
				$(this).css('MozUserSelect','none');
			}else if($.browser.msie){//IE
				$(this).bind('selectstart',function(){return false;});
			}else{//Opera, etc.
				$(this).mousedown(function(){return false;});
			}
		});
	});

});





