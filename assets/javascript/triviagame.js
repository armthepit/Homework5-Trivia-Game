$(document).ready(function(){

	// Variables

	var wins = 0;
	var loses = 0;
	var outoftimes = 0;
	var questionsAsked = [0,0,0,0,0,0,0,0,0,0];
	var numberQuestions = 1;
	var currentquestion = 0;
	var currentAnswers = [-1,-1,-1,-1];
	var currid = 0;
	var newHtml = '';

	var bird = [
	{"number":0,"state":"Alabama","birdName":"Northern Flicker","photo":"assets/images/alabama_northernflicker.jpg","sound":"assets/audio/alabama_northernflicker.mp3","year":1927},
	{"number":1,"state":"Alaska","birdName":"Northern Flicker","photo":"assets/images/alabama_northernflicker.jpg","sound":"assets/audio/alabama_northernflicker.mp3","year":1927}
	];

	console.log(bird[1].photo);

/*
	var alabama = new Bird(0,"Alabama","Northern Flicker","assets/images/alabama_northerflicker.jpg","assets/audio/alabama_northernflicker.mp3",1927);
	var alaska = new Bird(1,"Alaska","Willow Ptarmigan","assets/images/alaska_willowptarmigan.jpg","assets/audio/alaska_willowptarmigan.mp3",1955);
	var arizona = new Bird(2,"Arizona","Cactus Wren","assets/images/arizona_cactuswren.jpg","assets/audio/arizona_cactuswren.mp3",1931);
	var california = new Bird(3,"California","Valley Quail","assets/images/california_valleyquail.jpg","assets/audio/california_valleyquail.mp3",1931);
	var colorado = new Bird(4,"Colorado","Lark Bunting","assets/images/colorado_larkbunting.jpg","assets/audio/colorado_larkbunting.mp3",1931);
	var connecticut = new Bird(5,"Connecticut","American Robin","assets/images/connecticut_americanrobin.jpg","assets/audio/connecticut_americanrobin.mp3",1943);
*/
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
				currentQuestion = Math.round(Math.random()*1); //Change back to 49 when all birds loaded.
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
						currentAnswers[i] = Math.round(Math.random()*1); //Change back to 49 when all birds loaded.
					} while (currentAnswers[i] === currentQuestion);
				}
			};
			$('#question').html('');
			$('quizbutton').html('');
			for(var i=0; i < 4; i++) {
				currid = '#answer'+i;
				newHtml = '<img src="'+bird[currentAnswers[i]].photo+'" alt="'+bird[currentAnswers[i]].birdName+'" class="thumbnail">';			
				$(currid).html(newHtml);
			};
		}
	}

	// check to begin quiz

	$('#beginQuizButton').on("click", function() {
		question();
	});













































	
})