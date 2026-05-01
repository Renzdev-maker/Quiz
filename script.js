let normalQuestions = [
  { q: "Capital of Philippines?", a: ["Manila","Cebu","Davao","Baguio"], c: 0 },
  { q: "5 + 3 = ?", a: ["6","7","8","9"], c: 2 },
  { q: "Red planet?", a: ["Earth","Mars","Venus","Jupiter"], c: 1 },
  { q: "Color of sky?", a: ["Blue","Green","Red","Yellow"], c: 0 }
];

// ❤️ FINAL QUESTION (NOT shuffled)
let finalQuestion = {
  q: "Mahal mo ba ako?",
  a: ["Yes", "No"],
  c: 0
};

// combine
let questions = [...normalQuestions.sort(() => Math.random() - 0.5), finalQuestion];

let index = 0;
let score = 0;
let timer;
let timeLeft = 10;
let username = "";

/* 🔊 Sounds */
let correctSound = new Audio("https://www.soundjay.com/button/sounds/button-4.mp3");
let wrongSound = new Audio("https://www.soundjay.com/button/sounds/button-10.mp3");

/* 👤 LOGIN */
function startQuiz() {
  username = document.getElementById("username").value;

  if (username === "") return alert("Enter your name");

  document.querySelector(".login").classList.add("hidden");
  document.querySelector(".quiz").classList.remove("hidden");

  loadQuestion();
}

/* ❓ LOAD */
function loadQuestion() {
  clearInterval(timer);
  timeLeft = 10;

  document.getElementById("timer").innerText = "Time: " + timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = "Time: " + timeLeft;
    if (timeLeft === 0) nextQuestion();
  }, 1000);

  let q = questions[index];

  let card = document.querySelector(".card");
  card.classList.remove("slide");
  void card.offsetWidth;
  card.classList.add("slide");

  document.getElementById("question").innerText = q.q;

  let buttons = document.querySelectorAll(".btn");

  buttons.forEach((btn, i) => {
    btn.classList.remove("correct", "wrong");

    if (q.a[i] !== undefined) {
      btn.style.display = "block";
      btn.innerText = q.a[i];
      btn.onclick = () => checkAnswer(i, btn);
    } else {
      btn.style.display = "none";
    }
  });
}

/* 🎯 ANSWER */
function checkAnswer(i, btn) {
  let q = questions[index];
  let correct = q.c;

  // ❤️ LOVE QUESTION
  if (q.q === "Mahal mo ba ako?") {

    if (i === 0) {
      score++;
      showHearts();
      showLoveScreen("Aww 🥰");
    } else {
      document.body.classList.add("shake");
      setTimeout(() => document.body.classList.remove("shake"), 400);
      showLoveScreen("Ay 😢 bakit NO?");
    }

    return;
  }

  // NORMAL
  if (i === correct) {
    score++;
    btn.classList.add("correct");
    correctSound.play();
  } else {
    btn.classList.add("wrong");
    document.querySelectorAll(".btn")[correct].classList.add("correct");
    wrongSound.play();
  }

  document.getElementById("score").innerText = "Score: " + score;

  document.querySelectorAll(".btn").forEach(b => b.onclick = null);

  setTimeout(() => nextQuestion(), 1000);
}

/* ⏭ NEXT */
function nextQuestion() {
  index++;

  if (index < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

/* 🏁 RESULT */
function showResult() {
  clearInterval(timer);

  document.querySelector(".quiz").classList.add("hidden");

  let result = document.querySelector(".result");
  result.classList.remove("hidden");
  result.classList.add("pop");

  document.getElementById("finalScore").innerText =
    username + ", Score: " + score + "/" + questions.length;
}

/* 💖 HEARTS */
function showHearts() {
  for (let i = 0; i < 15; i++) {
    let heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = "❤️";

    heart.style.left = Math.random() * window.innerWidth + "px";
    heart.style.top = window.innerHeight + "px";

    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 2000);
  }
}

/* 🎬 LOVE SCREEN */
function showLoveScreen(message) {
  document.querySelector(".quiz").classList.add("hidden");

  let result = document.querySelector(".result");
  result.classList.remove("hidden");

  result.innerHTML = `
    <div class="love-screen pop">
      <h1>${message}</h1>
      <p>Final Score: ${score}/${questions.length}</p>
      <button onclick="restart()">Play Again</button>
    </div>
  `;
}

/* 🔁 RESTART */
function restart() {
  index = 0;
  score = 0;
  timeLeft = 10;

  questions = [...normalQuestions.sort(() => Math.random() - 0.5), finalQuestion];

  document.querySelector(".result").classList.add("hidden");
  document.querySelector(".login").classList.remove("hidden");

  document.getElementById("score").innerText = "Score: 0";
}