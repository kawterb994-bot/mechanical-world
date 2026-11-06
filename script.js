
/* =====================================
   MECHANICAL WORLD — MAIN SCRIPT
===================================== */

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initQuiz();
  initScrollEffects();
});

/* =====================================
   MOBILE NAVIGATION
===================================== */

function initNavigation() {
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector("nav");

  if (!menuButton || !nav) return;

  menuButton.addEventListener("click", () => {
    nav.classList.toggle("open");

    menuButton.setAttribute(
      "aria-expanded",
      nav.classList.contains("open")
    );
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

/* =====================================
   QUIZ DATA
===================================== */

const quizQuestions = [
  {
    question: "ما هو علم الميكانيك؟",
    options: [
      "علم دراسة الحركة والقوى",
      "علم دراسة النباتات",
      "علم دراسة الطقس",
      "علم دراسة اللغات"
    ],
    answer: 0,
    explanation: "الميكانيك يدرس الحركة والقوى وتأثيرها على الأجسام."
  },
  {
    question: "ما وظيفة المحرك في السيارة؟",
    options: [
      "تزيين السيارة",
      "تحويل الطاقة إلى حركة",
      "تبريد العجلات",
      "تخزين الوقود فقط"
    ],
    answer: 1,
    explanation: "المحرك يحول الطاقة إلى طاقة ميكانيكية تساعد السيارة على الحركة."
  },
  {
    question: "أي عنصر يساعد على إيقاف السيارة؟",
    options: [
      "المصابيح",
      "المقود",
      "نظام الفرامل",
      "خزان الوقود"
    ],
    answer: 2,
    explanation: "نظام الفرامل يبطئ السيارة ويوقفها."
  },
  {
    question: "ما نوع الآلة البسيطة التي نستخدمها لرفع الأجسام؟",
    options: [
      "الرافعة",
      "المصباح",
      "البطارية",
      "المحرك الكهربائي"
    ],
    answer: 0,
    explanation: "الرافعة آلة بسيطة تساعد على رفع وتحريك الأجسام."
  },
  {
    question: "ما وظيفة ناقل الحركة؟",
    options: [
      "تشغيل المصابيح",
      "تغيير السرعة والعزم",
      "تنظيف المحرك",
      "تبريد الوقود"
    ],
    answer: 1,
    explanation: "ناقل الحركة يغير نسب السرعة والعزم حسب حاجة السيارة."
  }
];

/* =====================================
   QUIZ VARIABLES
===================================== */

let currentQuestion = 0;
let score = 0;
let answered = false;

/* =====================================
   INITIALIZE QUIZ
===================================== */

function initQuiz() {
  const questionElement = document.getElementById("quizQuestion");
  const optionsElement = document.getElementById("quizOptions");
  const nextButton = document.getElementById("quizNext");

  if (!questionElement || !optionsElement || !nextButton) return;

  currentQuestion = 0;
  score = 0;
  answered = false;

  nextButton.onclick = nextQuestion;

  showQuestion();
}

/* =====================================
   SHOW QUESTION
===================================== */

function showQuestion() {
  const questionElement = document.getElementById("quizQuestion");
  const optionsElement = document.getElementById("quizOptions");
  const feedbackElement = document.getElementById("quizFeedback");
  const nextButton = document.getElementById("quizNext");
  const progress = document.getElementById("quizProgress");
  const progressBar = document.getElementById("quizProgressBar");
  const resultElement = document.getElementById("quizResult");

  if (!questionElement || !optionsElement) return;

  const question = quizQuestions[currentQuestion];

  answered = false;

  questionElement.textContent = question.question;
  optionsElement.innerHTML = "";

  if (feedbackElement) feedbackElement.textContent = "";
  if (resultElement) resultElement.innerHTML = "";

  if (progress) {
    progress.textContent =
      `السؤال ${currentQuestion + 1} من ${quizQuestions.length}`;
  }

  if (progressBar) {
    progressBar.style.width =
      `${(currentQuestion / quizQuestions.length) * 100}%`;
  }

  question.options.forEach((option, index) => {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "quiz-option";
    button.textContent = option;

    button.addEventListener("click", () => {
      checkAnswer(index);
    });

    optionsElement.appendChild(button);
  });

  if (nextButton) {
    nextButton.disabled = true;
    nextButton.textContent =
      currentQuestion === quizQuestions.length - 1
        ? "عرض النتيجة"
        : "السؤال التالي";
  }
}

/* =====================================
   CHECK ANSWER
===================================== */

function checkAnswer(selectedIndex) {
  if (answered) return;

  answered = true;

  const question = quizQuestions[currentQuestion];
  const options = document.querySelectorAll(".quiz-option");
  const feedback = document.getElementById("quizFeedback");
  const nextButton = document.getElementById("quizNext");

  const isCorrect = selectedIndex === question.answer;

  if (isCorrect) {
    score++;

    if (feedback) {
      feedback.textContent = "إجابة صحيحة! أحسنتِ ✓";
      feedback.style.color = "#348b50";
    }
  } else {
    if (feedback) {
      feedback.textContent =
        `إجابة خاطئة. الإجابة الصحيحة: ${question.options[question.answer]}`;
      feedback.style.color = "#b34c40";
    }
  }

  options.forEach((button, index) => {
    button.disabled = true;

    if (index === question.answer) {
      button.classList.add("correct");
    } else if (index === selectedIndex && !isCorrect) {
      button.classList.add("wrong");
    }
  });

  if (feedback) {
    const explanation = document.createElement("p");
    explanation.textContent = question.explanation;
    explanation.style.marginTop = "10px";
    explanation.style.fontWeight = "400";
    feedback.appendChild(explanation);
  }

  if (nextButton) {
    nextButton.disabled = false;
  }
}

/* =====================================
   NEXT QUESTION
===================================== */

function nextQuestion() {
  if (!answered) return;

  currentQuestion++;

  if (currentQuestion < quizQuestions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

/* =====================================
   FINAL RESULT
===================================== */

function showResult() {
  const questionElement = document.getElementById("quizQuestion");
  const optionsElement = document.getElementById("quizOptions");
  const feedbackElement = document.getElementById("quizFeedback");
  const nextButton = document.getElementById("quizNext");
  const progress = document.getElementById("quizProgress");
  const progressBar = document.getElementById("quizProgressBar");
  const resultElement = document.getElementById("quizResult");

  if (questionElement) {
    questionElement.textContent = "اكتمل الاختبار!";
  }

  if (optionsElement) optionsElement.innerHTML = "";
  if (feedbackElement) feedbackElement.textContent = "";
  if (nextButton) nextButton.style.display = "none";

  if (progress) progress.textContent = "النتيجة النهائية";

  if (progressBar) progressBar.style.width = "100%";

  let message = "";

  if (score === 5) {
    message = "ممتاز! لديك معرفة رائعة بالميكانيك 🏆";
  } else if (score >= 3) {
    message = "أحسنت! يمكنك تطوير معلوماتك أكثر ⭐";
  } else {
    message = "لا بأس! حاول مرة أخرى وستتحسن 💪";
  }

  if (resultElement) {
    resultElement.innerHTML = `
      <h2>نتيجتك: ${score} / 5</h2>
      <p>${message}</p>
      <button id="restartQuiz" class="btn btn-primary">
        إعادة الاختبار
      </button>
    `;

    document.getElementById("restartQuiz").addEventListener("click", () => {
      if (nextButton) nextButton.style.display = "";
      initQuiz();
    });
  }
}

/* =====================================
   SCROLL EFFECTS
===================================== */

function initScrollEffects() {
  const sections = document.querySelectorAll("section[id]");
  const links = document.querySelectorAll("nav a[href^='#']");

  if (!sections.length || !links.length) return;

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 130;

      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    links.forEach(link => {
      link.classList.remove("active");

      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}




