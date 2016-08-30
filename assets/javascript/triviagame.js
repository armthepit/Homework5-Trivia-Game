$(document).ready(function(){

	// Variables

	var wins = 0;
	var loses = 0;
	var outoftimes = 0;
	var questionsAsked = [0,0,0,0,0,0,0,0,0,0];
	var numberQuestions = 1;
	var currentquestion = 0;
	var currentAnswers = [-1,-1,-1,-1];
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
		questionsAsked = [0,0,0,0,0,0,0,0,0,0];
		numberQuestions = 1;
		currentAnswers = [-1,-1,-1,-1];

		//redraw intro screen
		newHtml = '<img src="assets/images/usa_baldeagle.jpg" alt="Bald Eagle" class="center-block img-responsive img-rounded">';
		newHtml = newHtml + '<h1 class="text-center">Think you know you\'re state birds?</h1>';
		newHtml = newHtml + '<h2 class="text-center">Take our quiz to find out.</h2>';
		$('#question').html(newHtml);
	}

	// display question

	function question() {
		numberQuestions++;
		if (numberQuestions < 11) {
			// Random number to find the next question. Compare to verify question not asked before.
			do {
				currentQuestion = Math.round(Math.random()*49);
			} while (questionsAsked.indexOf(currentQuestion) > -1);
			// Increment number of questions asked
			numberQuestions++
			// Push curent question into array of questions asked.
			questionsAsked.push("currentQuestion");
			// Random number to determine which position the correct answer will be in list of 4 possible answers
			currentAnswers[Math.round(Math.random()*3)] = currentQuestion;
			// loop thru to get 3 random numnber of wrong answers
			for(var i=0; i < 4; i++) {
				if (currentAnswers[i] === -1) {
					do {
						currentAnswers[i] = Math.round(Math.random()*49);
					} while (currentAnswers[i] === currentQuestion);
				}					
			}				
		}

		console.log(' A0 '+ currentAnswers[0] + ' A1 '+ currentAnswers[1] + ' A2 '+ currentAnswers[2] + ' A3 '+ currentAnswers[3]);
	}

	// check to begin quiz

	$('#beginQuizButton').on("click", function() {
		question();
	});













































	
})