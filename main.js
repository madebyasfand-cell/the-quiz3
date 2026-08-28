alert("JavaScript is working!");
/* ------------------------------------------------
PERSONALITY QUIZ
------------------------------------------------ */

/* ------------------------------------------------
QUESTIONS
------------------------------------------------ */

const questions = [

{
    question: "u have just woken up. what is the first thing u do?", 
    answers: [ 
         { text: " exercise", type: 0 },
         { text: " have a good breakfast", type: 1 }, 
         { text: " chat with friends/doomscroll", type: 2 }, 
         { text: " shower and pick your outfit for the day", type: 3 },
         { text: " read your favourite novel/book", type: 4 }, 
         { text: " stare at the wall", type: 5 } 
     ],
     
},
    {
          
          question: "time to eat! pick your option", 
          answers: [
            { text: " something healthy and energising", type: 0 }, 
            { text: " a big, comforting meal", type: 1 },
            { text: " something you can share with everyone", type: 2 }, 
            { text: " something that looks almost too pretty to eat", type: 3 },
            { text: " cook my breakfast for myself(nvm how it turns out)", type: 4 }, 
            { text: "breakfast? whats that?", type: 5 } 
          ] 
      },

  { 
    
    question: "u suddenly have the entire afternoon free. what are u doing?", 
    answers: [
      { text: " doing something productive or active", type: 0 },
      { text: " relaxing with snacks and a comfort show", type: 1 }, 
      { text: " calling everyone and making spontaneous plans", type: 2 }, 
      { text: " taking pictures and enjoying the atmosphere", type: 3 },
      { text: " learn new things or just around and craft", type: 4 },
      { text: " NOTHING.", type: 5 } 
    ] 
 
  },

 
    { 
    
      question: "crap. your plans suddenly get cancelled. how do u react?", 
      answers: [ 
              { text: " make new plans immediately", type: 0 },
              { text: " oh thankGod", type: 1 }, 
              { text: " message everyone until somebody is free", type: 2 },
              { text: " use the unexpected free time to do something fun for myself", type: 3 },
              { text: " hang out by myself", type: 4 }, 
              { text: " accept it. the universe has spoken.", type: 5 } 
             ] 

    },

  
    {
      question: "the sun is starting to set. what is your ideal evening?",
      answers: [ 
              { text: " one last adventure before the day ends", type: 0 },
              { text: " blankets, snacks, and a good movie", type: 1 },
              { text: " going out with friends", type: 2 },
              { text: "watching the sunset somewhere beautiful", type: 3 }, 
              { text: "wind down and think about life/how i spent the day", type: 4 }, 
              { text: " can u please stop asking me questions?", type: 5 } 
       ] 
 
    },

 
    {
      question: "time to sleep. How do u get ready for bed?",
      answers: [
            { text: " think about all the things im gonna do tommorrow!", type: 0 },
            { text: " snuggling down in as many balnkets and pillows as possible.", type: 1 },
            { text: " texting everyone goodnight.", type: 2 },
            { text: "doing skincare.", type: 3 },
            { text: "making up fake scenraios in my head.", type: 4 },
            { text: "staring into the void until i pass out.", type: 5 }
    ]
}

];

/* ------------------------------------------------
PERSONALITY RESULTS
------------------------------------------------ */

const personalities = [

{
    title: "The Go-Getter ",
    description:
        "you are energetic, determined, and always ready to do something! you probably hate feeling like you're wasting your time, and you're happiest when you're working towards something exciting. you bring energy wherever you go — sometimes you just need to remember that resting is also an achievement!"
},


{ 
  title: "The Comfort Lover ", 
  description: "you know how to enjoy the simple things in life. good food, cosy spaces, and feeling safe and comfortable are basically your love language. you're probably the person everyone wants to hang out with when they need a calm, wholesome day."
}, 

  {
    title: "The Aesthetic Dreamer ", 
    description: "you notice beauty everywhere. sunsets, music, outfits, pretty cafés — all of it matters to you! you like making ordinary moments feel special and you probably have a strong imagination. your life may not always be a movie, but you definitely know how to make it feel like one." 
  },

  { 
    title: "The Curious Thinker ",
    description: "your brain is always asking questions. you enjoy learning, discovering new things, and thinking about ideas that other people might not even notice. you're curious about the world and probably have at least one extremely random fact ready to share." 
  },

  {
    title: "The Peaceful Observer ",
    description: "you don't always need constant excitement to have a good time. you appreciate quiet moments, your own thoughts, and simply existing without having to be doing something every second. you're calm, thoughtful, and probably understand the beauty of doing absolutely nothing." 
  }

];

/* ------------------------------------------------
QUIZ VARIABLES
------------------------------------------------ */

let currentQuestion = 0;

let scores = [0, 0, 0, 0, 0, 0];

/* ------------------------------------------------
START THE QUIZ
------------------------------------------------ */

function startQuiz() {

document.getElementById("start-screen").classList.add("hidden");
document.getElementById("quiz-screen").classList.remove("hidden");

showQuestion();

}

/* ------------------------------------------------
DISPLAY A QUESTION
------------------------------------------------ */
function showQuestion() {

const question = questions[currentQuestion];

// Show question number
document.getElementById("question-number").textContent =
    "Question " + (currentQuestion + 1) + " of " + questions.length;

// Show question text
document.getElementById("question-text").textContent =
    question.question;

// Clear previous answers
const answersContainer = 
  document.getElementById("answers"); 
 
    
answersContainer.innerHTML = "";
  
  // Create answer buttons 
  question.answers.forEach(answer => {
    
      const button = document.createElement("button");
   
      button.textContent = answer.text;
   
      button.classList.add("answer-btn");
   
      button.addEventListener("click", function () { 
     
          selectAnswer(answer.type); 
          
    });
    
      answersContainer.appendChild(button); 
      
  });

  // Update progress bar
const progress =
    (currentQuestion / questions.length) * 100;

document.getElementById("progress-bar").style.width =
    progress + "%";

}

/* ------------------------------------------------
SELECT AN ANSWER
------------------------------------------------ */

function selectAnswer(type) {

// Add a point to the chosen personality type
scores[type]++;

// Move to next question
currentQuestion++;

  // Check whether the quiz has finished 
  if (currentQuestion < questions.length) {
    
      showQuestion();

} else {

    showResult();

}

}

/* ------------------------------------------------
SHOW THE RESULT
------------------------------------------------ */

function showResult() {

// Complete progress bar
document.getElementById("progress-bar").style.width = "100%";

  // Find the highest
  score const highestScore = Math.max(...scores);

// Find every personality that has the highest score
  const winners = []; 
    
    for (let i = 0; i < scores.length; i++) { 
    
        if (scores[i] === highestScore) {
            
            winners.push(i);  
            
      } 
        
  }

  // Randomly choose if there is a tie 
  const winner = 
    winners[Math.floor(Math.random() * winners.length)];
    
  const personality = personalities[winner];

  // Hide quiz and show results 
  document.getElementById("quiz-screen").classList.add("hidden");
    
  document.getElementById("result-screen").classList.remove("hidden");

  // Display the personality
document.getElementById("result-emoji").textContent =
    personality.emoji;

document.getElementById("result-title").textContent =
    personality.title;

document.getElementById("result-description").textContent =
    personality.description;

}

/* ------------------------------------------------
RESTART THE QUIZ
------------------------------------------------ */

function restartQuiz() {

// Reset variables
currentQuestion = 0;

scores = [0, 0, 0, 0, 0, 0];


// Show the start screen again
document.getElementById("result-screen").classList.add("hidden");

document.getElementById("start-screen").classList.remove("hidden");


// Reset progress bar
document.getElementById("progress-bar").style.width = "0%";

}

