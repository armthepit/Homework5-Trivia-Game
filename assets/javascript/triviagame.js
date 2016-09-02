$(document).ready(function(){

	// Variables

	var wins = 0;
	var loses = 0;
	var outoftimes = 0;
	var questionsAsked = [];
	var numberQuestions = 1;
	var currentQuestionAnswer = 0;
	var currentAnswers = [-1,-1,-1,-1];
	var playerAnswer = -1;
	var answerResult = '';
	var currid = 0;
	var newHtml = '';
	var birdSound = '';

	var bird = [
	{"index":0,"state":"Alabama","birdName":"Northern Flicker","photo":"assets/images/alabama_northernflicker.jpg","sound":"assets/audio/alabama_northernflicker.mp3","year":1927},
	{"index":1,"state":"Alaska","birdName":"Willow Ptarmigan","photo":"assets/images/alaska_willowptarmigan.jpg","sound":"assets/audio/alaska_willowptarmigan.mp3","year":1955},
	{"index":2,"state":"Arizona","birdName":"Cactus Wren","photo":"assets/images/arizona_cactuswren.jpg","sound":"assets/audio/arizona_cactuswren.mp3","year":1931},
	{"index":3,"state":"California","birdName":"Valley Quail","photo":"assets/images/california_californiavalleyquail.jpg","sound":"assets/audio/california_californiavalleyquail.mp3","year":1931},
	{"index":4,"state":"Colorado","birdName":"Lark Bunting","photo":"assets/images/colorado_larkbunting.jpg","sound":"assets/audio/colorado_larkbunting.mp3","year":1931},
	{"index":5,"state":"Connecticut","birdName":"American Robin","photo":"assets/images/connecticut_americanrobin.jpg","sound":"assets/audio/connecticut_americanrobin.mp3","year":1931},
	];

	// initalize variables and display opening screen to begin new game.

	function newGame() {
		// reset variables
		wins = 0;
		loses = 0;
		outoftimes = 0;
		questionsAsked = [];
		numberQuestions = 0;
		currentAnswers = [-1,-1,-1,-1];

		//intro screen
		newHtml = '<img src="assets/images/usa_baldeagle.jpg" alt="Bald Eagle" class="center-block img-responsive img-rounded">';
		newHtml = newHtml + '<h1 class="text-center">Think you know you\'re state birds?</h1>';
		newHtml = newHtml + '<h2 class="text-center">Take our quiz to find out.</h2>';
		$('#question').html(newHtml);
	}

	// display question

	function question() {
		// Increment number of questions asked
		numberQuestions++;
		if (numberQuestions < bird.length) {


			// Random number to find the next question. Compare to verify question not asked before.
			do {
				currentQuestionAnswer = Math.round(Math.random()*(bird.length-1)); 
			} while (questionsAsked.indexOf(currentQuestionAnswer) > -1);
			// Push curent question into array of questions asked.
			questionsAsked.push(currentQuestionAnswer);
			// Random number to determine which position the correct answer will be in list of 4 possible answers
			currentAnswers[Math.round(Math.random()*3)] = currentQuestionAnswer;
			// loop thru to get 3 random numnber of wrong answers
			for(var i=0; i < 4; i++) {
				if (currentAnswers[i] === -1) {
					do {
						currentAnswers[i] = Math.round(Math.random()*(bird.length-1)); 
					} while (currentAnswers[i] === currentQuestionAnswer || (currentAnswers.indexOf(currentAnswers[i]) !== i));
				}
			};
			newHtml = '<h1 class="text-center">What is the state bird of '+ bird[currentQuestionAnswer].state + '?</h1>';
			$('#question').html(newHtml);
			$('#beginQuizButton').remove();
			for(var i=0; i < 4; i++) {
				currid = '#answer'+i;
				newHtml = '<img src="'+bird[currentAnswers[i]].photo+'" alt="'+bird[currentAnswers[i]].birdName+'" class="thumbnail center-block">';			
				newHtml = newHtml + '<h3 class="text-center">'+bird[currentAnswers[i]].birdName+'</h3>';
				newHtml = newHtml + '<audio id="sound_'+bird[currentAnswers[i]].index+'"><source src="'+bird[currentAnswers[i]].sound+'" preload="auto"></audio>';
				$(currid).html(newHtml);
				$(currid).attr({'data-index': bird[currentAnswers[i]].index});
			};
		}
	}

	function resetAnswers() {
		for(var i=0; i < 4; i++) {
			currid='#answer'+i;
			newHtml = '';
			$(currid).html(newHtml);
			currentAnswers[i] = -1;
		};
		showAnswer();
	}

	// Show Answer
	function showAnswer () {

		newHtml = answerResult + '<img src="'+bird[currentQuestionAnswer].photo+'" alt="'+bird[currentQuestionAnswer].birdName+'" class="center-block img-responsive img-rounded">';
		newHtml = newHtml + '<h3 class="text-center">'+bird[currentQuestionAnswer].birdName+'</h3>';
		newHtml = newHtml + '<p class="text-center">The '+bird[currentQuestionAnswer].birdName+' was designated the official state bird of '+bird[currentQuestionAnswer].state+' in '+bird[currentQuestionAnswer].year+'.</p>';
		$('#question').html(newHtml);		

		/*question();*/
	}

	// check to begin quiz

	$('#beginQuizButton').on("click", function() {
		question();
	});

	// play bird sound when hovering over answer
	
	$(document).on('mouseenter','.answer',function() {
		$('#sound_'+$(this).attr("data-index")).trigger('play');
	});

	// stop bird sound when leaving answer
	
	$(document).on('mouseleave','.answer',function() {
		$('#sound_'+$(this).attr("data-index")).trigger('pause');
	});

	// check answer
	
	$(document).on('click','.answer', function() {
		playerAnswer = $(this).attr("data-index");
		if(currentQuestionAnswer == playerAnswer) {
			wins++;
			answerResult = '<h1 class="text-center">Correct Answer</h1>';
		} else {
			loses++;
			answerResult = '<h1 class="text-center">Incorrect Answer</h1>';
		};
		resetAnswers();
	});		



































	
})