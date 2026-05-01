let normalQuestions = [
  { q: "Capital of Philippines?", a: ["Manila","Cebu","Davao","Baguio"], c: 0 },
  { q: "5 + 3 = ?", a: ["6","7","8","9"], c: 2 },
  { q: "Red planet?", a: ["Earth","Mars","Venus","Jupiter"], c: 1 },
  { q: "Color of sky?", a: ["Blue","Green","Red","Yellow"], c: 0 }
];

// ❤️ FINAL QUESTION
let finalQuestion = {
  q: "Mahal mo ba ako?",
  a: ["Yes","No"],
  c: 0
};

let questions = [...normalQuestions.sort(() => Math.random() - 0.5), finalQuestion];

let index = 0;
let score = 0;
let timer;
let timeLeft = 10;
let username = "";

/* 👤 START */
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

  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = "Time: " + timeLeft;
    if (timeLeft === 0) next();
  }, 1000);

  let q = questions[index];

  document.getElementById("question").innerText = q.q;

  let buttons = document.querySelectorAll(".btn");

  buttons.forEach((btn, i) => {
    btn.classList.remove("correct","wrong");

    if (q.a[i]) {
      btn.style.display = "block";
      btn.innerText = q.a[i];
      btn.onclick = () => check(i, btn);
    } else {
      btn.style.display = "none";
    }
  });
}

/* 🎯 CHECK */
function check(i, btn) {
  let q = questions[index];

  // ❤️ FINAL QUESTION
  if (q.q === "Mahal mo ba ako?") {

    if (i === 0) {
      score++;
      showHearts();
      showResultSpecial("Aww 🥰💖");
    } else {
      document.body.classList.add("shake");
      setTimeout(() => document.body.classList.remove("shake"), 400);
      showResultSpecial("Ay 😢 bakit NO?");
    }

    return;
  }

  // NORMAL
  if (i === q.c) {
    score++;
    btn.classList.add("correct");
  } else {
    btn.classList.add("wrong");
  }

  document.getElementById("score").innerText = "Score: " + score;

  document.querySelectorAll(".btn").forEach(b => b.onclick = null);

  setTimeout(next, 1000);
}

/* ⏭ NEXT */
function next() {
  index++;

  if (index < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

/* 🏁 RESULT */
function showResult() {
  document.querySelector(".quiz").classList.add("hidden");

  document.querySelector(".result").classList.remove("hidden");

  document.querySelector(".result").innerHTML =
    `<div style="text-align:center;padding:60px">
      <h1>${username}</h1>
      <h2>Score: ${score}/${questions.length}</h2>
      <button onclick="location.reload()">Restart</button>
     </div>`;
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

/* 🎬 SPECIAL RESULT */
function showResultSpecial(msg) {
  document.querySelector(".quiz").classList.add("hidden");

  document.querySelector(".result").classList.remove("hidden");

  document.querySelector(".result").innerHTML =
    `<div style="text-align:center;padding:60px">
      <h1>${msg}</h1>
      <h2>Score: ${score}/${questions.length}</h2>
      <button onclick="location.reload()">Play Again</button>
     </div>`;
}