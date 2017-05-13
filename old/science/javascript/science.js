$(window).load(function(){
	
	//Set Up Terminal
	$("#Terminal").terminal({
		addSine: function(amp,freq){
			getFlashMovie("Osc").addSine(amp,freq);
		},
		addCosine: function(amp,freq){
			getFlashMovie("Osc").addCosine(amp,freq);
		},
		modulate: function(amp,freq){
			getFlashMovie("Osc").addModulation(amp,freq);
		},
		reset: function(){
			getFlashMovie("Osc").resetSignal();
		},
		playSignal: function(){
			getFlashMovie("Osc").playSignal();
		},
		stopSignal: function(){
			getFlashMovie("Osc").stopSignal();
		},
		run: function(Demo){
			switch(Demo.toLowerCase()){
				case 'montecarlo':
					$("#Computer").append("<object id='Demo'></object>");
					swfobject.embedSWF("./experiments/pie.swf", "Demo", "744", "400", "9.0.0");
					//We want to populate the paper div
						loadDemo("MonteCarlo");
						$("#paper").css('height',2730);//2730
						$("#article").css('height',2730);
					//Print paper
					$("#paper").stop(true,true);
					$("#paper").show("slide", {direction: "up"}, 9000); //9000
				break;
			}
		},
		help: function(){
			if(arguments.length < 1){
				this.echo("[[b;#FFE83C;]help] [[;#ffd9c0;]{-command}] :\n"
				+"\t \t-Returns description of a given command if a command argument is included;\n"
				+"\t \t-Otherwise returns a list of valid commands.\n"
				+"[[b;#FFE83C;]clear] :\n"
				+"\t \t-Clears terminal screen.\n"
				+"[[b;#FFE83C;]addSine] [[;#ffd9c0;]-Amplitude -Frequency] :\n"
				+"\t \t-Adds a sine wave of given Amplitude and Frequency to the signal of the oscilloscope\n"
				+"[[b;#FFE83C;]addCosine] [[;#ffd9c0;]-Amplitude -Frequency] :\n"
				+"\t \t-Adds a cosine wave of given Amplitude and Frequency to the signal of the oscilloscope\n"
				+"[[b;#FFE83C;]modulate] [[;#ffd9c0;]-Amplitude -Frequency] :\n"
				+"\t \t-Modulates the signal of the oscilloscope with the given Amplitude and Frequency\n"
				+"[[b;#FFE83C;]reset] :\n"
				+"\t \t-Resets the signal of the oscilloscope\n"
				+"[[b;#FFE83C;]playSignal] :\n"
				+"\t \t-Converts the signal of the oscilloscope to audio and plays it\n"
				+"[[b;#FFE83C;]stopSignal] :\n"
				+"\t \t-Stops the audio signal of the oscilloscope\n"
				+"[[b;#FFE83C;]run] [[;#ffd9c0;]montecarlo]:\n"
				+"\t \t-Runs a Monte Carlo experiment to determine the digits of Pi\n"
				);
			}
		}
	}, { prompt: 'tuntun>', name: 'tuntun terminal', tabcompletion: true, greetings: "[[b;#fdc7c7;]Welcome to tuntun terminal] \ntype '[[b;#FFE83C;]help]' for a list of commands" });
	
	
	
	//work out if we are on Mac or PC 
	function getFlashMovie(movieName) {
	    var isIE = navigator.appName.indexOf("Microsoft") != -1;
	    return (isIE) ? window[movieName] : document[movieName];
	}

	
});

function endDemo(){
	swfobject.removeSWF("Demo");
	$("#paper").stop(true,true);
	$("#paper").hide("slide", {direction: "up"}, 1000);
};

function loadDemo(Demo){
	// Load the xml file using ajax 
	$.ajax({
	    type: "GET",
	    url: "XML/Demos.xml",
	    dataType: "xml",
	    success: function (xml) {

	        // Parse the xml file and get data
			$(xml).find('demo[name="' + Demo +'"]').each(function(){
				$("#Headline").html($(this).find("Headline").text());
				$("#Description").html($(this).find("Description").text());
				$("#Footnotes").html($(this).find("Footnotes").text());
				MathJax.Hub.Queue(["Typeset",MathJax.Hub,"Computer"]);
			});
	    }
	});
}
