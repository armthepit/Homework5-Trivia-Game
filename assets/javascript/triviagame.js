$(document).ready(function(){

	// Variables

	var wins = 0;
	var loses = 0;
	var outoftimes = 0;
	var currentQuestions = [0,0,0,0,0,0,0,0,0,0];
	var currentAnswers = ['','','',''];
	var newHtml = '';

	function Bird (number, state, birdName, photo, sound, year) {
	  this.number = number;
	  this.state = state;
	  this.birdName = birdName;
	  this.photo = photo;
	  this.sound = sound;
	  this.year = year;
	}

	var alabama = new Bird(1,"Alabama","Northern Flicker",1927);
	var alaska = new Bird(2,"Alaska","Willow Ptarmigan",1955);
	var arizona = new Bird(3,"Arizona","Cactus Wren",1931);

	// initalize variables and display opening screen to begin new game.

	function newGame() {
		// reset variables
		wins = 0;
		loses = 0;
		outoftimes = 0;
		currentQuestions = [0,0,0,0,0,0,0,0,0,0];
		currentAnswers = ['','','',''];

		//redraw intro screen
		newHtml = '<img src="assets/images/usa_baldeagle.jpg" alt="Bald Eagle" class="center-block img-responsive img-rounded">';
		newHtml = newHtml + '<h1 class="text-center">Think you know you\'re state birds?</h1>';
		newHtml = newHtml + '<h2 class="text-center">Take our quiz to find out.</h2>';
		$('#question').html(newHtml);
	}

	// display question

	function question() {
		console.log('Works');

	}

	// check to begin quiz

	$('#beginQuiz').on("click", function() {
		question();
	});













































	
})