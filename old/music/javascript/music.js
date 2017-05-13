//$(function(){
$(window).load(function(){

	$("#player").find('*').disableTextSelect();
	$("#info_bubble").find('*').disableTextSelect();
	
	//In the case that web browser CAN play <audio> 
	if(!!document.createElement('audio').canPlayType){
		//write html to insert
	//	var insert_audio_html= ' insert after finished testing';
	//	$(insert_audio_html).insertAfter("#header2");
	
	
		//Name button and tape_player DOM elements
		var  play_button      = $("#play_button"),
			 pause_button     = $("#pause_button"),
			 backward_button  = $("#backward_button"),
			 forward_button   = $("#forward_button"),
			 eject_button     = $("#eject_button"),
			 volume_button    = $("#volume_icon_container"),
			 volume_bar_panel = $("#volume_bar_panel"),
			 playing          = false,
			 mute             = false,
			 loaded           = false,
			 time_remaining   = $("#time_left"),
			 manual_seeking   = false,
			 tape_player      = $("#tape_player"),
			 audio            ,//= $("#sounds").get(0),
			 file_path        ,
			 track_number     = 1,
			 album_length     = 0,
			 pre_mute_volume  = 0.5,
			 tape_inserted    = false,
			 current_tape_div ,
			 current_tape_img ;
		
		time_remaining.text("--:--"); 	
		
		//Draggable cassettes
		$(".cassette").draggable({
			snap: "#tape_deck", 
			snapMode: "inner",
			snapTolerance: 50,
			revert: "invalid"
		});
				
		$("#tape_deck").droppable({
			tolerance: "intersect",
			accept: function(ui){ return true;},
			drop: function(evnt, ui){
				loaded = false;
					current_tape_div  = ui.draggable;
					current_tape_img  = current_tape_div.children();
					current_tape_div.draggable("disable").attr({"style": " "});
					$(this).prepend(current_tape_img);
					tape_inserted = true;
					$(this).droppable({ accept: false});
					
					for (i in Music_list[current_tape_img.attr("id")]["songs"]) {
					    if (Music_list[current_tape_img.attr("id")]["songs"].hasOwnProperty(i)) {
					        album_length++;
					    }
					}
					nowPlaying(Music_list, current_tape_img);
					$(".table_row").eq(track_number - 1).removeClass("current_tr");
					switchSongs(current_tape_img, track_number, album_length, Music_list);
					audio = $("#sounds").get(0);
					audioUpdate(audio, loaded);

				}
		});
		
		
				volume_button.click(function(){
					if(!mute){
						$("#volume_icon").addClass("volume_icon_mute");
						mute = true;
						if(tape_inserted){
							audio.volume = 0;
						}
					}
					else if(!!mute){
						$("#volume_icon").removeClass("volume_icon_mute");
						mute = false;
						if(tape_inserted){
							audio.volume = pre_mute_volume;
						}
					}
				});
				volume_button.hover(function(){
					volume_bar_panel.stop(true,true).fadeIn();
				}, function(){
					volume_bar_panel.stop(true,true).fadeOut(900);
				});
				volume_bar_panel.hover(function(){
					volume_bar_panel.stop(true,true).fadeIn();
				}, function(){
					volume_bar_panel.stop(true,true).fadeOut(900);
				});
				

				play_button.mousedown(function(){
					tape_player.removeClass("plyr_play plyr_pause plyr_backward plyr_forward plyr_eject").addClass("plyr_play");
					if(tape_inserted){
						current_tape_img.addClass("cassette_img_play");
						audio.play();
						playing = true;
					}
				});
				play_button.mouseup(function(){	
					if(!tape_inserted){
						tape_player.removeClass("plyr_play plyr_pause plyr_backward plyr_forward plyr_eject");
					}
				});
	
				pause_button.mousedown(function(){
					tape_player.removeClass("plyr_play plyr_pause plyr_backward plyr_forward plyr_eject").addClass("plyr_pause");
					if(tape_inserted){
						current_tape_img.removeClass("cassette_img_play");
						audio.pause();
						playing= false;
					}
				});
				pause_button.mouseup(function(){	
					if(!tape_inserted){
						tape_player.removeClass("plyr_play plyr_pause plyr_backward plyr_forward plyr_eject");
					}
				});

				// Backward_button animation and function
				backward_button.mousedown(function(){
					tape_player.removeClass("plyr_play plyr_pause plyr_backward plyr_forward plyr_eject").addClass("plyr_backward");
				});
				backward_button.mouseup(function(){
					tape_player.removeClass("plyr_play plyr_pause plyr_backward plyr_forward plyr_eject");
					if(tape_inserted){
						if(audio.currentTime > 1){
							audio.currentTime= 0;
						}
						else if(audio.currentTime<= 1){
							$(".table_row").eq(track_number - 1).removeClass("current_tr");
							if(track_number > 1){
								track_number--;
								switchSongs(current_tape_img, track_number, album_length, Music_list);
								audio = $("#sounds").get(0);
							}
							else if(track_number == 1){
								track_number = album_length;
								switchSongs(current_tape_img, track_number, album_length, Music_list);
								audio = $("#sounds").get(0);
							}
						}
						loaded= false;
						audioUpdate(audio, loaded);
						if(playing){
							tape_player.addClass("plyr_play");
							audio.play();
						}
						else if(!playing){
							current_tape_img.removeClass("cassette_img_play");
						}
					}
				});
				//Forward_button animation and function
				forward_button.mousedown(function(){
					tape_player.removeClass("plyr_play plyr_pause plyr_backward plyr_forward plyr_eject").addClass("plyr_forward");
				});
				forward_button.mouseup(function(){
					tape_player.removeClass("plyr_play plyr_pause plyr_backward plyr_forward plyr_eject");
					if(tape_inserted){
						$(".table_row").eq(track_number - 1).removeClass("current_tr");
						if(track_number < album_length){
							track_number++;
							switchSongs(current_tape_img, track_number, album_length, Music_list);
							audio = $("#sounds").get(0);
						}
						else if(track_number == album_length){
							track_number= 1;
							switchSongs(current_tape_img, track_number, album_length, Music_list);
							audio = $("#sounds").get(0);
						}
						loaded= false;
						audioUpdate(audio, loaded);
						if(playing){
							tape_player.addClass("plyr_play");
							audio.play();
						}
						else if(!playing){
							current_tape_img.removeClass("cassette_img_play");
						}
					}
				});
				//Eject Button
				eject_button.mousedown(function(){
					tape_player.removeClass("plyr_play plyr_pause plyr_backward plyr_forward plyr_eject").addClass("plyr_eject");
				});
				eject_button.mouseup(function(){
					tape_player.removeClass("plyr_play plyr_pause plyr_backward plyr_forward plyr_eject");
					if(tape_inserted){
						current_tape_img.removeClass("cassette_img_play");
						audio.pause();
						audio.currentTime=0;
						playing= false;
						current_tape_div.draggable("enable").prepend(current_tape_img);
						tape_inserted = false;
						album_length=0;
						track_number=1;
						$("#tape_deck").droppable({ accept: function(ui){return true;}});
						$(audio).unbind();
						time_remaining.text("--:--");
						$(".table_row").eq(track_number - 1).removeClass("current_tr");
						$("#info_bubble").animate({"opacity": 0},500,function(){
							$("#project_name").empty();
							$("#project_img").attr({"src":"./img/satan.jpeg"});
							$("#track_list").empty();
							$("#descriptions").empty();
							$("#photo_container").empty();
							$("#download").empty();
						});
					}
				});
				
				//Volume bar
				$('#volume_bar_container').slider({
			      value: pre_mute_volume,
			      step: 0.1,
			      orientation: "vertical",
			      range: "min",
			      max: 1,
			      animate: true,         
			      stop:function(e,ui) {    
				  	if(tape_inserted){
			        	audio.volume = ui.value;
						pre_mute_volume = ui.value;
					}
					if(!!mute){
						$("#volume_icon").removeClass("volume_icon_mute");
						mute = false;
					}
			      }
			    });
		
		function audioUpdate( aud , loaded){
				time_remaining.text("--:--");
				if(mute){
					audio.volume =0;
				}
				else{
					audio.volume = pre_mute_volume;
				}
				//Update when current song time updates!
				$(aud).bind("timeupdate", function(){
					var rem = parseInt(aud.duration - aud.currentTime, 10),
				  		mins = Math.floor(rem/60,10),
				  		secs = rem - mins*60,
					 	pos = (aud.currentTime / aud.duration) * 100;
					time_remaining.text('-' + mins + ':' + (secs > 9 ? secs : '0' + secs));
					if (!manual_seeking) {$("#time_bar .ui-slider-handle").css({left: pos + '%'}); }
					if(!loaded){
						loaded= true;
					    $('#time_bar').slider({
					      value: 0,
					      step: 0.01,
					      orientation: "horizontal",
					      range: "min",
					      max: aud.duration,
					      animate: true,         
					      slide: function() {            
					        manual_seeking = true;
					      },
					      stop:function(e,ui) {
					        manual_seeking = false;        
					        aud.currentTime = ui.value;
					      }
					    });
					}
				});
				$(aud).bind("ended", function(){
					$(".table_row").eq(track_number - 1).removeClass("current_tr");
					if(track_number < album_length){
						track_number++;
						switchSongs(current_tape_img, track_number, album_length, Music_list);
						audio = $("#sounds").get(0);
					}
					else if(track_number == album_length){
						track_number= 1;
						switchSongs(current_tape_img, track_number, album_length, Music_list);
						audio = $("#sounds").get(0);
					}
					loaded= false;
					audioUpdate(audio, loaded);
					if(mute){
						audio.volume =0;
					}
					else{
						audio.volume = pre_mute_volume;
					}
					audio.play();
				}) 
			}
			
		
		function switchSongs(current_tape, song_number, album_length, Music_list){
			
			//load audio in html
			$(".table_row").eq(song_number - 1).addClass("current_tr");
			var file_path = "./audio/" + current_tape.attr("id") + "/" + Music_list[current_tape.attr("id")]["songs"][song_number].replace(/\s/g,"%20");
			var source  = "<audio id= 'sounds'>";
				source += "<source  id = 'mp3_file' src= '" + file_path + ".mp3' type= 'audio/mpeg'></source>";
				source += "<source  id = 'wave_file' src= '" + file_path + ".wav' type= 'audio/x-wav'></source>";
				source += "</audio>";
			$("#audio_container").html(source);
			
			// handling loading indicator when audio is loading
		    $("audio").bind("waiting", function(){
				//show loading indicator
				$("#tapeloading").fadeIn("fast");
			})
			$("audio").bind("canplay", function() { 
				//dismiss loading indicator
				$("#tapeloading").fadeOut("fast");
		    });
			
			
		}
		
		
	
		//Info Management
		function nowPlaying(data, current_tape){
			$("#project_name").html(data[current_tape.attr("id")]["name"]);
			$("#project_img").attr({"src": "./audio/" + current_tape.attr("id") + "/img/" + data[current_tape.attr("id")]["cover"]});
			$("#download").prepend("<a href='./audio/" + current_tape.attr("id") + "/" + data[current_tape.attr("id")]["name"] + ".zip'> Download Album</a>");
			var rowdata= " "; //, count = 1;
			for (k in data[current_tape.attr("id")]["songs"]){
				rowdata += "<tr class='table_row' id='"+k+"'> <td class= 'trk_number'>" + k + ". </td><td class= 'trk_name'> ";
				$("#info_container").prepend("<span id='length_test' style= 'font-size: .55em;'>" + data[current_tape.attr("id")]["songs"][k] + "</span>");
				var length_text = $("#length_test").width();
					if(length_text > 250){
						rowdata += "<div class='marquees'>" + data[current_tape.attr("id")]["songs"][k] + "</div></td>" ;
					}
					else{
						rowdata += data[current_tape.attr("id")]["songs"][k] + "</td>" ;
					}
				$("#length_test").remove();
				rowdata += "<td class= 'trk_time'>" + data[current_tape.attr("id")]["times"][k] +"</td> </tr>";
			}
			$("#track_list").prepend(rowdata);
			
			var pic_list = "";
				for(gg in data[current_tape.attr("id")]["pictures"]){
					var pic_url = "./audio/" + current_tape.attr("id") + "/img/" + data[current_tape.attr("id")]["pictures"][gg];
					pic_list += "<a href = '" + pic_url + "' rel= 'lightbox[bandphotos]'><img width= '150' src= '" + pic_url + "'></a>";
				}

				$("#photo_container").prepend(pic_list);
				$("#photo_container").imagesLoaded( function(){
					$("#photo_container a").wookmark({container: $("#photo_container"), offset: 2});
				})
			
			$("#descriptions").prepend(data[current_tape.attr("id")]["description"]);
			$(".marquees").marquee({
				speed: 9000,
				gap: 50,
				delayBeforeStart: 2000,
				direction: 'left',
				duplicated: true
			});	
			

			$("#info_bubble").animate({"opacity": 1},500);

			
			$(".table_row").dblclick(function(){
				$(".table_row").eq(track_number - 1).removeClass("current_tr");
				tape_player.removeClass("plyr_play plyr_pause plyr_backward plyr_forward plyr_eject").addClass("plyr_play");
				track_number = this.id;
				$(".table_row").eq(track_number - 1).addClass("current_tr");
				current_tape_img.addClass("cassette_img_play");
				switchSongs(current_tape_img, track_number, album_length, Music_list);
				audio = $("#sounds").get(0);
				playing = true;
				loaded= false;
				audioUpdate(audio, loaded);
				audio.play();
			})
		}
		
		

		

		
	}
	//In the case that browser CANNOT play <audio>
	else if(!document.createElement("audio").canPlayType){
		
	}
	
	
	
})


