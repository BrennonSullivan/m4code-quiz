const quizBody = document.getElementById("quiz");
const resultsEl = document.getElementById("result");
const finalScoreEl = document.getElementById("finalScore");
const gameoverDiv = document.getElementById("gameover");
const questionsEl = document.getElementById("questions");
const quizTimer = document.getElementById("timer");
const startQuizButton = document.getElementById("startbtn");
const startQuizDiv = document.getElementById("startpage");
const highscoreContainer = document.getElementById("highscoreContainer");
const highscoreDiv = document.getElementById("high-scorePage");
const highscoreInputName = document.getElementById("initials");
const highscoreDisplayName = document.getElementById("highscore-initials");
const endGameBtns = document.getElementById("endGameBtns");
const submitScoreBtn = document.getElementById("submitScore");
const highscoreDisplayScore = document.getElementById("highscore-score");
const buttonA = document.getElementById("a");
const buttonB = document.getElementById("b");
const buttonC = document.getElementById("c");
const buttonD = document.getElementById("d");

const quizQuestions = [
  {
    question: "How many elements can you apply an 'ID' attribute to?",
    choiceA: "As many as you want",
    choiceB: "3",
    choiceC: "1",
    choiceD: "128",
    correctAnswer: "c"
  },
  {
    question: "What does DOM stand for?",
    choiceA: "Document Object Model",
    choiceB: "Display Object Management",
    choiceC: "Digital Ordinance Model",
    choiceD: "Desktop Oriented Mode",
    correctAnswer: "a"
  },
  {
    question: "What is used primarily to add styling to a web page?",
    choiceA: "HTML",
    choiceB: "CSS",
    choiceC: "Python",
    choiceD: "React.js",
    correctAnswer: "b"
  },
  {
    question: "What HTML tags are JavaScript code wrapped in?",
    choiceA: "&lt;div&gt;",
    choiceB: "&lt;link&gt;",
    choiceC: "&lt;head&gt;",
    choiceD: "&lt;script&gt;",
    correctAnswer: "d"
  },
  {
    question: "When is localStorage data cleared?",
    choiceA: "No expiration time",
    choiceB: "On page reload",
    choiceC: "On browser close",
    choiceD: "On computer restart",
    correctAnswer: "a"},  
    {
    question: "What does WWW stand for?",
    choiceA: "Web World Workings",
    choiceB: "Weak Winter Wind",
    choiceC: "World Wide Web",
    choiceD: "Wendy Wants Waffles",
    correctAnswer: "c"},
    {
    question: "What HTML attribute references an external JavaScript file?",
    choiceA: "href",
    choiceB: "src",
    choiceC: "class",
    choiceD: "index",
    correctAnswer: "b"},
        
    
    ];
// Other global variables
var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 76;
var timerInterval;
var score = 0;
var correct;

// This function cycles through the object array containing the quiz questions to generate the questions and answers.
function generateQuizQuestion() {
    gameoverDiv.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex) {
      return showScore();
    }
  
    const currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = `<p>${currentQuestion.question}</p>`;
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
  };
  

// Start Quiz function starts the TimeRanges, hides the start button, and displays the first quiz question.
function startQuiz() {
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQuestion();
  
    // Timer
    timerInterval = setInterval(() => {
      timeLeft--;
      quizTimer.textContent = `Time left: ${timeLeft}`;
  
      if (timeLeft === 0) {
        clearInterval(timerInterval);
        showScore();
      }
    }, 1000);
    quizBody.style.display = "block";
  };
  
// This function is the end page screen that displays your score after either completeing the quiz or upon timer run out
function showScore() {
    quizBody.style.display = "none";
    gameoverDiv.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = `You got ${score} out of ${quizQuestions.length} correct!`;
  };
  

// On click of the submit button, we run the function highscore that saves and stringifies the array of high scores already saved in local stoage
// as well as pushing the new user name and score into the array we are saving in local storage. Then it runs the function to show high scores.
submitScoreBtn.addEventListener("click", () => {
    if (highscoreInputName.value === "") {
      alert("Initials cannot be blank");
      return false;
    } else {
      const savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
      const currentUser = highscoreInputName.value.trim();
      const currentHighscore = {
        name: currentUser,
        score: score,
      };
  
      gameoverDiv.style.display = "none";
      highscoreContainer.style.display = "flex";
      highscoreDiv.style.display = "block";
      endGameBtns.style.display = "flex";
  
      savedHighscores.push(currentHighscore);
      localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
      generateHighscores();
    }
  });
  
// This function clears the list for the high scores and generates a new high score list from local storage
function generateHighscores() {
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    const highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    highscores.forEach((highscore) => {
      const newNameSpan = document.createElement("li");
      const newScoreSpan = document.createElement("li");
      newNameSpan.textContent = highscore.name;
      newScoreSpan.textContent = highscore.score;
      highscoreDisplayName.appendChild(newNameSpan);
      highscoreDisplayScore.appendChild(newScoreSpan);
    });
  }
  

// This function displays the high scores page while hiding all of the other pages from 
function showHighscore(){
    startQuizDiv.style.display = "none"
    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    generateHighscores();
}

// This function clears the local storage of the high scores as well as clearing the text from the high score board
function clearScore(){
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";
}

// This function sets all the variables back to their original values and shows the home page to enable replay of the quiz
function replayQuiz(){
    highscoreContainer.style.display = "none";
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 76;
    score = 0;
    currentQuestionIndex = 0;
}

// This function checks the response to each answer 
function checkAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        alert("That Is Correct!");
        currentQuestionIndex++;
        generateQuizQuestion();
        //display in the results div that the answer is correct.
    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
        alert("That Is Incorrect.")
        currentQuestionIndex++;
        generateQuizQuestion();
        //display in the results div that the answer is wrong.
    }else{
        showScore();
    }
}

// This button starts the quiz!
startQuizButton.addEventListener("click",startQuiz);