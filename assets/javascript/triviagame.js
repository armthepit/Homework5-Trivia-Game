$(document).ready(function(){

	// Variables

	var correctAnswers = 0;
	var incorrectAnswers = 0;
	var outOfTimeAnswers = 0;
	var questionsAsked = [];
	var numberQuestions = 0;
	var remainingQuestionTime = 31;
	var counter = 0;
	var currentQuestionAnswer = 0;
	var currentAnswers = [-1,-1,-1,-1];
	var playerAnswer = -1;
	var answerResult = '';
	var answerAudio = '';
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
		{"index":6,"state":"Delaware","birdName":"Blue Hen Chicken","photo":"assets/images/delaware_bluehenchicken.jpg","sound":"assets/audio/delaware_bluehenchicken.mp3","year":1939},
		{"index":7,"state":"Florida","birdName":"Mockingbird","photo":"assets/images/florida_mockingbird.jpg","sound":"assets/audio/florida_mockingbird.mp3","year":1927},
		{"index":8,"state":"Georgia","birdName":"Brown Thrasher","photo":"assets/images/georgia_brownthrasher.jpg","sound":"assets/images/georgia_brownthrasher.mp3","year":1935},
		{"index":9,"state":"Hawaii","birdName":"Nene","photo":"assets/images/hawaii_nene.jpg","sound":"assets/audio/hawaii_nene.mp3","year":1957},
		{"index":10,"state":"Idaho","birdName":"Peregrine Falcon","photo":"assets/images/idaho_peregrinefalcon.jpg","sound":"assets/audio/idaho_peregrinefalcon.mp3","year":2004},
		{"index":11,"state":"Illinois","birdName":"Northern Cardinal","photo":"assets/images/illinois_northerncardinal.jpg","sound":"assets/audio/illinois_northerncardinal.mp3","year":1929},
		{"index":12,"state":"Indiana","birdName":"Northern Cardinal","photo":"assets/images/indiana_northerncardinal.jpg","sound":"assets/audio/indiana_northerncardinal.mp3","year":1933},
		{"index":13,"state":"Iowa","birdName":"Eastern Gold Finch","photo":"assets/images/iowa_easterngoldfinch.jpg","sound":"assets/audio/iowa_easterngoldfinch.mp3","year":1933},
		{"index":14,"state":"Kanasa","birdName":"Western Meadowlark","photo":"assets/images/kansas_westernmeadowlark.jpg","sound":"assets/audio/kansas_westernmeadowlark.mp3","year":1933}
	];

	// initalize variables and display opening screen to begin new game.

	function newGame() {
		// reset variables
		correctAnswers = 0;
		incorrectAnswers = 0;
		outOfTimeAnswers = 0;
		questionsAsked = [];
		numberQuestions = 0;
		currentAnswers = [-1,-1,-1,-1];

		//intro screen
		newHtml = '<img src="assets/images/usa_baldeagle.jpg" alt="Bald Eagle" class="center-block img-responsive img-rounded">';
		newHtml = newHtml + '<h1 class="text-center">Think you know you\'re state birds?</h1>';
		newHtml = newHtml + '<h2 class="text-center">Take our quiz to find out.</h2>';
		$('#question').html(newHtml);
		newHtml = '<button type="button" id="beginQuizButton" class="btn-custom center-block">Begin Quiz</button>';
		$('#quizButton').html(newHtml);
	}

	// display question

	function question() {
		// Increment number of questions asked
		numberQuestions++;
		if (numberQuestions < 11) {
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
			questionTimer();
		} else {
			quizResults();
		}
	}

	//Sets the 31sec time for each question
    function questionTimer(){
        counter = setInterval(countdown, 1000);
    }	

	// The question timer countdown function
	function countdown(){
	    // Decrease remaining time by one.
	    remainingQuestionTime--;
	    // Show the number in the #show-number tag.
	    $('#questionTimerDisplay').html('<h3 class="text-center">Time Remaining: ' + remainingQuestionTime + '</h3>');

	    // Check to see if time has run out answering question
	    if (remainingQuestionTime === 0){
	        // ...run the stop function.
	        outOfTime();
	    }
	}


	function outOfTime() {
		clearInterval(counter);
		remainingQuestionTime = 31;
		outOfTimeAnswers++;
		answerResult = '<h1 class="text-center">Out Of Time</h1>';
		answerAudio = new Audio('assets/audio/incorrectanswer.mp3');
		resetAnswers();
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
		answerAudio.play();
		newHtml = answerResult + '<img src="'+bird[currentQuestionAnswer].photo+'" alt="'+bird[currentQuestionAnswer].birdName+'" class="center-block img-responsive img-rounded">';
		newHtml = newHtml + '<h3 class="text-center">'+bird[currentQuestionAnswer].birdName+'</h3>';
		newHtml = newHtml + '<p class="text-center">The '+bird[currentQuestionAnswer].birdName+' was designated the official state bird of '+bird[currentQuestionAnswer].state+' in '+bird[currentQuestionAnswer].year+'.</p>';
		$('#question').html(newHtml);
		$('#questionTimerDisplay').html('');		
		setTimeout(nextQuestionTimer, 1000 * 5);
		
	}

	// Next Question Timer

	function nextQuestionTimer() {
		question();
	}

	// Quiz Results
	
	function quizResults() {
		newHtml = '<h1 class="text-center">Quiz Results</h1>';
		newHtml = newHtml + '<h3 class="text-center">Correct Answers: '+correctAnswers+'.</h3>';
		newHtml = newHtml + '<h3 class="text-center">Incorrect Answers: '+incorrectAnswers+'.</h3>';
		newHtml = newHtml + '<h3 class="text-center">Out Of Time Answers: '+outOfTimeAnswers+'.</h3>';
		$('#question').html(newHtml);	
		setTimeout(newQuizTimer, 1000 * 5);		
	}

	// New Quiz Timer

	function newQuizTimer() {
		newGame();
	} 

	// check to begin quiz

	$(document).on("click", '#beginQuizButton',function() {
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
		clearInterval(counter);
		remainingQuestionTime = 31;
		playerAnswer = $(this).attr("data-index");
		if(currentQuestionAnswer == playerAnswer) {
			correctAnswers++;
			answerResult = '<h1 class="text-center">Correct Answer</h1>';
			answerAudio = new Audio('assets/audio/correctanswer.mp3');
		} else {
			incorrectAnswers++;
			answerResult = '<h1 class="text-center">Incorrect Answer</h1>';
			answerAudio = new Audio('assets/audio/incorrectanswer.mp3');
		};
		resetAnswers();
	});		



































	
})