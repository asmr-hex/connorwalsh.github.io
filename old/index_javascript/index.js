
$(document).ready(function(){

  /*  var regular_icons = {"MUSIC"   : "url(./img/tape.png)",
						 "GAMES"   : "url(./img/games.png)",
						 "TRAVEL"  : "url(./img/compass.png)",
						 "SCIENCE" : "url(./img/wave.png)"};
    var	alt_icons     = {"MUSIC"   : "url(./img/tape2.png)",
						 "GAMES"   : "url(./img/games2.png)",
						 "TRAVEL"  : "url(./img/compass.gif)",
						 "SCIENCE" : "url(./img/wave.gif)"};

	
  $(".SectionItem").hover(
		function(){ 
			$("a",this).css({"background-image":alt_icons[this.id]});
			$("p",this).css({"color":"#0099BC"});
		}, 	
		function(){
			$("a",this).css({"background-image":regular_icons[this.id]});
	    	$("p",this).css({"color":"#00597C"});
	  	}
	)*/
	//control hide/show bio material
		$("#biography").hide();
	
		$("#BioLink").hover(function(){
			$("#imgLogo").css({"left": -80});
		},
		function(){
			$("#imgLogo").css({"left": 0});
		});
	
		$('#BioLink').click(function(){
	    $("#biography").slideToggle(700);
			return false;
	    });
		//Control scrolling through panels
			$('#right').click(function () {
			        $('#panel1').hide("slide", {
			            direction: "left"
			        }, 1000);
			        $('#panel2').show("slide", {
			            direction: "right"
			        }, 1000);
			    });
			    $('#left').click(function () {
			        $('#panel2').hide("slide", {
			            direction: "right"
			        }, 1000);
			        $('#panel1').show("slide", {
			            direction: "left"
			        }, 1000);
			    });
    
	
	//Drawing

	  var canvas, started = false, stroke_color="#DF56FF";
	
	  function init () {
	    canvas = document.getElementById('Drawing');
		frame = document.getElementById("etchAsketch");
	    ctx = canvas.getContext('2d');
	    frame.addEventListener('mousemove', ev_mousemove, false);
	  }
	  function ev_mousemove (ev) {
	    var x, y;
	    if (ev.layerX || ev.layerX == 0) { // Firefox
	      x = ev.layerX;
	      y = ev.layerY;
	    } else if (ev.offsetX || ev.offsetX == 0) { // Opera
	      x = ev.offsetX;
	      y = ev.offsetY;
	    }
	    if (!started) {
	      ctx.beginPath();
	      ctx.moveTo(x, y);
	      started = true;
	    } else {
	      ctx.lineTo(x, y);
		  ctx.strokeStyle= stroke_color;
	      ctx.stroke();
	    }
	  }
	  $("#etchAsketch").mouseout(function(){
		  started = false;
		  stroke_color= '#'+Math.floor(Math.random()*16777215).toString(16);
	  })
	  init();




	



         

});





