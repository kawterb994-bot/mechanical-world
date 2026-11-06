
/* =====================================
   MECHANICAL WORLD — MAIN SCRIPT
===================================== */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // 1. MOBILE MENU
  const menuBtn = document.getElementById("menuToggle");
  const nav = document.getElementById("mainNav");

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      const opened = nav.classList.toggle("active");
      menuBtn.setAttribute("aria-expanded", String(opened));
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("active");
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  // 2. HOME AND SCROLL NAVIGATION
  document.querySelectorAll("[data-home]").forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      window.closeMechanicalPage?.();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  document.querySelectorAll("[data-scroll]").forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();

      const target = document.getElementById(link.dataset.scroll);

      if (target) {
        window.closeMechanicalPage?.();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // 3. EXPLORE CATEGORIES
  const categoryGrid = document.getElementById("categoryGrid");
  const pages = window.PAGES || {};

  if (categoryGrid) {
    const entries = Object.entries(pages);

    categoryGrid.innerHTML = entries.map(([id, page]) => `
      <article class="category-card">
        <div class="category-icon">${page.icon || "⚙️"}</div>
        <small>${page.category || "MECHANICAL ENGINEERING"}</small>
        <h3>${page.title || "قسم ميكانيكي"}</h3>
        <p>${page.intro || ""}</p>
        <button type="button" data-page="${id}">
          اكتشف التفاصيل ←
        </button>
      </article>
    `).join("");
  }

  // 4. QUIZ SYSTEM
  const questions = window.QUIZ_DATA || [];
  const questionTitle = document.getElementById("quizQuestion");
  const optionsBox = document.getElementById("quizOptions");
  const feedback = document.getElementById("quizFeedback");
  const nextBtn = document.getElementById("quizNext");
  const progress = document.getElementById("quizProgress");
  const progressBar = document.getElementById("quizProgressBar");
  const resultBox = document.getElementById("quizResult");
  const questionArea = document.getElementById("quizQuestionArea");

  let questionIndex = 0;
  let score = 0;
  let answered = false;

  function showQuestion() {
    if (!questions.length || !questionTitle || !optionsBox) return;

    const q = questions[questionIndex];
    answered = false;

    questionTitle.textContent = q.question;
    optionsBox.innerHTML = "";

    q.options.forEach((option, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "quiz-option";
      button.textContent = option;

      button.addEventListener("click", () => {
        if (answered) return;
        answered = true;

        const correct = index === q.answer;

        if (correct) {
          score++;
          button.classList.add("correct");
          feedback.textContent = "✓ إجابة صحيحة! أحسنتِ.";
        } else {
          button.classList.add("wrong");
          optionsBox.children[q.answer]?.classList.add("correct");
          feedback.textContent =
            "✗ إجابة غير صحيحة. " + (q.explanation || "");
        }

        [...optionsBox.children].forEach(item => {
          item.disabled = true;
        });

        nextBtn.disabled = false;
      });

      optionsBox.appendChild(button);
    });

    progress.textContent =
      `السؤال ${questionIndex + 1} من ${questions.length}`;

    progressBar.style.width =
      `${((questionIndex + 1) / questions.length) * 100}%`;

    feedback.textContent = "اختاري إجابة واحدة.";
    nextBtn.disabled = true;
    nextBtn.innerHTML = questionIndex === questions.length - 1
      ? "عرض النتيجة ←"
      : "السؤال التالي ←";
  }

  function showResult() {
    questionArea.hidden = true;
    resultBox.hidden = false;

    const percentage = Math.round(
      (score / questions.length) * 100
    );

    let message = "يمكنكِ تحسين معلوماتك بالمراجعة والمحاولة مجدداً.";

    if (percentage >= 90) {
      message = "ممتاز! لديكِ معرفة رائعة بعالم الميكانيك.";
    } else if (percentage >= 70) {
      message = "أداء رائع! واصلي التعلم.";
    } else if (percentage >= 50) {
      message = "جيد! تحتاجين فقط إلى المزيد من التدريب.";
    }

    resultBox.innerHTML = `
      <h3>نتيجتك النهائية</h3>
      <div class="quiz-score">${score} / ${questions.length}</div>
      <p>${percentage}% من الإجابات الصحيحة</p>
      <p>${message}</p>
      <button type="button" class="button button-primary" id="restartQuiz">
        إعادة الاختبار ↻
      </button>
    `;

    document.getElementById("restartQuiz").addEventListener("click", () => {
      questionIndex = 0;
      score = 0;
      resultBox.hidden = true;
      questionArea.hidden = false;
      showQuestion();
    });
  }

  if (nextBtn && questions.length) {
    showQuestion();

    nextBtn.addEventListener("click", () => {
      if (!answered) return;

      if (questionIndex < questions.length - 1) {
        questionIndex++;
        showQuestion();
      } else {
        showResult();
      }
    });
  }

  // 5. BACK TO TOP
  const backTop = document.querySelector(".back-top");

  if (backTop) {
    window.addEventListener("scroll", () => {
      backTop.classList.toggle("visible", window.scrollY > 400);
    });
  }

  // 6. REVEAL ANIMATIONS
  const revealElements = document.querySelectorAll(
    ".section, .category-card, .feature-band, .about-cards article"
  );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    revealElements.forEach(element => {
      element.classList.add("reveal");
      observer.observe(element);
    });
  } else {
    revealElements.forEach(element => element.classList.add("show"));
  }

  console.log("MECHANICAL WORLD: Website initialized successfully.");
});





