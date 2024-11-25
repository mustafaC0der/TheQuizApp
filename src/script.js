import questions from './questions.json' assert { type: 'json' };

let currentQuestionIndex = 0;
let score = 0;
const totalQuestions = questions.length;

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextButton = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');
const scoreElement = document.getElementById('score');
const feedbackElement = document.getElementById('feedback');

function loadQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;
  currentQuestion.options.forEach(option => {
    const li = document.createElement('li');
    li.textContent = option.text;
    li.addEventListener('click', () => selectAnswer(option));
    optionsElement.appendChild(li);
  });
  updateProgressBar();
}

function resetState() {
  nextButton.style.display = 'none';
  feedbackElement.textContent = '';
  while (optionsElement.firstChild) {
    optionsElement.removeChild(optionsElement.firstChild);
  }
}

function selectAnswer(selectedOption) {
  const currentQuestion = questions[currentQuestionIndex];
  if (selectedOption.correct) {
    feedbackElement.textContent = 'Correct!';
    feedbackElement.style.color = 'green';
    score++;
  } else {
    feedbackElement.textContent = `Wrong! Correct answer: ${currentQuestion.options.find(o => o.correct).text}`;
    feedbackElement.style.color = 'red';
  }
  Array.from(optionsElement.children).forEach(li => li.classList.add('disabled'));
  nextButton.style.display = 'block';
}

function updateProgressBar() {
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  progressBar.style.width = `${progress}%`;
}

function showScore() {
  scoreElement.textContent = `Final Score: ${score} / ${totalQuestions}`;
  nextButton.textContent = 'Restart';
  nextButton.style.display = 'block';
  nextButton.onclick = restartQuiz;
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.textContent = 'Next Question';
  loadQuestion();
}

nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < totalQuestions) {
    loadQuestion();
  } else {
    showScore();
  }
});

loadQuestion();
