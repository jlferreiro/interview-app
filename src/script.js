// Arreglo para almacenar las preguntas
let questions = [];

// Función para obtener las preguntas del almacenamiento local
function getQuestions() {
  questions = JSON.parse(localStorage.getItem("questions")) || [];
  return questions;
}

// Función para guardar las preguntas en el almacenamiento local
function saveQuestions() {
  localStorage.setItem("questions", JSON.stringify(questions));
}

// Función para agregar una nueva pregunta
function addQuestion() {
  const questionText = document.getElementById("question-text").value;
  const questionLevel = document.getElementById("question-level").value;
  const questionScore = parseInt(document.getElementById("question-score").value);

  if (questionText && questionLevel && questionScore) {
    const newQuestion = {
      text: questionText,
      level: questionLevel,
      score: questionScore
    };

    questions.push(newQuestion);
    saveQuestions();
    renderQuestionsList();
    clearQuestionForm();
  } else {
    alert("Por favor, complete todos los campos.");
  }
}

// Función para eliminar una pregunta
function deleteQuestion(index) {
  questions.splice(index, 1);
  saveQuestions();
  renderQuestionsList();
}

// Función para mostrar la lista de preguntas
function renderQuestionsList() {
  const questionsList = document.getElementById("questions-list");
  questionsList.innerHTML = "";

  questions.forEach((question, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      ${question.text} (Nivel: ${question.level}, Puntuación: <span class="math-inline">\{question\.score\}\)
<button onclick\="deleteQuestion\(</span>{index})">Eliminar</button>
    `;
    questionsList.appendChild(listItem);
  });
}

// Función para limpiar el formulario de preguntas
function clearQuestionForm() {
  document.getElementById("question-text").value = "";
  document.getElementById("question-level").value = "jr";
  document.getElementById("question-score").value = "";
}

// Función para iniciar una entrevista
function startInterview() {
  const interviewLevel = document.getElementById("interview-level").value;
  const filteredQuestions = questions.filter(question => question.level === interviewLevel);

  if (filteredQuestions.length >= 5) {
    const selectedQuestions = [];
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
      selectedQuestions.push(filteredQuestions[randomIndex]);
    }

    showInterviewQuestions(selectedQuestions);
  } else {
    alert("No hay suficientes preguntas para el nivel seleccionado.");
  }
}

// Función para mostrar las preguntas de la entrevista
function showInterviewQuestions(questions) {
  const interviewQuestionsContainer = document.getElementById("interview-questions");
  interviewQuestionsContainer.innerHTML = "";

  let totalScore = 0;
  questions.forEach((question, index) => {
    const questionElement = document.createElement("div");
    questionElement.innerHTML = `
      <h3>Pregunta ${index + 1}: ${question.text}</h3>
      <p>Nivel: ${question.level}, Puntuación: <span class="math-inline">\{question\.score\}</p\>
<input type\="number" id\="answer\-</span>{index}" placeholder="Ingrese su respuesta">
    `;
    interviewQuestionsContainer.appendChild(questionElement);
  });

  document.getElementById("start-interview-btn").style.display = "none";
  document.getElementById("submit-interview-btn").style.display = "block";
}

// Función para enviar las respuestas de la entrevista
function submitInterview() {
  let totalScore = 0;
  questions.forEach((question, index) => {
    const answerInput = document.getElementById(`answer-${index}`);
    const givenAnswer = parseInt(answerInput.value);
    if (givenAnswer === question.score) {
      totalScore += question.score;
    }
  });

  showInterviewScore(totalScore);
}

  // Función para mostrar la puntuación de la entrevista
function showInterviewScore(score) {
    const interviewScoreContainer = document.getElementById("interview-score");
    interviewScoreContainer.innerHTML = `
      <h2>Su puntuación final es: ${score}</h2>
      <button id="restart-interview-btn">Rehacer Entrevista</button>
    `;
  
    document.getElementById("interview-questions").style.display = "none";
    document.getElementById("submit-interview-btn").style.display = "none";
    document.getElementById("restart-interview-btn").style.display = "block";
  }
  
  // Función para rehacer la entrevista
  function restartInterview() {
    document.getElementById("interview-questions").innerHTML = "";
    document.getElementById("interview-score").innerHTML = "";
    document.getElementById("start-interview-btn").style.display = "block";
    document.getElementById("submit-interview-btn").style.display = "none";
    document.getElementById("restart-interview-btn").style.display = "none";
  }
  
  // Asignar eventos a los botones
  document.getElementById("add-question-btn").addEventListener("click", addQuestion);
  document.getElementById("save-question-btn").addEventListener("click", addQuestion);
  document.getElementById("cancel-question-btn").addEventListener("click", clearQuestionForm);
  document.getElementById("start-interview-btn").addEventListener("click", startInterview);
  document.getElementById("submit-interview-btn").addEventListener("click", submitInterview);
  document.getElementById("restart-interview-btn").addEventListener("click", restartInterview);
  
  // Cargar las preguntas del almacenamiento local al iniciar la aplicación
  getQuestions();
  renderQuestionsList();
  