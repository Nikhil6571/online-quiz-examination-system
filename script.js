document.addEventListener("DOMContentLoaded", () => {

// 🔀 Shuffle function (Fisher–Yates)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Question Bank (Multiple Topics)
const questions = [
    { question: "What does HTML stand for?",
      options: ["Hyper Text Markup Language","High Text Machine Language","Hyperlinks Text Mark Language","Home Tool Markup Language"],
      correctAnswer: 0 },

    { question: "Which CSS property controls text size?",
      options: ["font-style","text-size","font-size","text-style"],
      correctAnswer: 2 },

    { question: "Which keyword is used to declare a constant in JavaScript?",
      options: ["var","let","const","static"],
      correctAnswer: 2 },

    { question: "Which normal form removes transitive dependency?",
      options: ["1NF","2NF","3NF","BCNF"],
      correctAnswer: 2 },

    { question: "Which OOPS concept allows same function name?",
      options: ["Encapsulation","Inheritance","Polymorphism","Abstraction"],
      correctAnswer: 2 },

    { question: "Which OS component handles CPU scheduling?",
      options: ["Shell","Kernel","Compiler","File System"],
      correctAnswer: 1 },

    { question: "Which protocol is used for secure web communication?",
      options: ["HTTP","FTP","HTTPS","SMTP"],
      correctAnswer: 2 },

    { question: "Binary number system is based on?",
      options: ["2","8","10","16"],
      correctAnswer: 0 }
];

// 🔀 Randomize questions at start
shuffleArray(questions);

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 30;
let timer;

// Elements
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const timerElement = document.getElementById("timer");
const resultDiv = document.getElementById("result");
const scoreElement = document.getElementById("score");
const restartBtn = document.getElementById("restartBtn");
const historyList = document.getElementById("history");

// Load Question
function loadQuestion() {
    clearInterval(timer);
    timeLeft = 30;
    startTimer();

    optionsElement.innerHTML = "";
    const q = questions[currentQuestionIndex];
    questionElement.textContent = q.question;

    q.options.forEach((option, index) => {
        optionsElement.innerHTML += `
            <div>
                <input type="radio" name="option" value="${index}">
                <label>${option}</label>
            </div>`;
    });
}

// Timer
function startTimer() {
    timerElement.textContent = `⏳ Time Left: ${timeLeft} seconds`;
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `⏳ Time Left: ${timeLeft} seconds`;
        if (timeLeft === 0) {
            checkAnswer();
            nextQuestion();
        }
    }, 1000);
}

// Check Answer
function checkAnswer() {
    const selected = document.querySelector('input[name="option"]:checked');
    if (selected && parseInt(selected.value) === questions[currentQuestionIndex].correctAnswer) {
        score++;
    }
}

// Next Question
function nextQuestion() {
    clearInterval(timer);
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        endQuiz();
    }
}

nextBtn.onclick = () => {
    checkAnswer();
    nextQuestion();
};

// End Quiz
function endQuiz() {
    document.getElementById("quiz-container").style.display = "none";
    timerElement.style.display = "none";
    resultDiv.style.display = "block";
    scoreElement.textContent = `You scored ${score} out of ${questions.length}`;

    const history = JSON.parse(localStorage.getItem("quizHistory")) || [];
    history.push(`Score: ${score}/${questions.length}`);
    localStorage.setItem("quizHistory", JSON.stringify(history));
    loadHistory();
}

// Restart Quiz (Random again)
restartBtn.onclick = () => {
    currentQuestionIndex = 0;
    score = 0;
    shuffleArray(questions);

    document.getElementById("quiz-container").style.display = "block";
    timerElement.style.display = "block";
    resultDiv.style.display = "none";

    loadQuestion();
};

// Load History
function loadHistory() {
    historyList.innerHTML = "";
    const history = JSON.parse(localStorage.getItem("quizHistory")) || [];
    history.forEach(h => {
        const li = document.createElement("li");
        li.textContent = h;
        historyList.appendChild(li);
    });
}

loadHistory();
loadQuestion();
});

