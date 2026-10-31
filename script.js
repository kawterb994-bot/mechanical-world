
"use strict";

document.addEventListener("DOMContentLoaded", () => {

  /* ==================================
     1. INITIALIZATION
  ================================== */

  // تشغيل أيقونات Lucide
  function initializeIcons() {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  }

  initializeIcons();


  /* ==================================
     2. MOBILE NAVIGATION
  ================================== */

  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".nav-links");

  function closeMenu() {
    if (!menuButton || !navigation) return;

    navigation.classList.remove("active");
    menuButton.setAttribute("aria-expanded", "false");
  }

  if (menuButton && navigation) {

    menuButton.setAttribute("aria-expanded", "false");

    menuButton.addEventListener("click", () => {

      const isOpen = navigation.classList.toggle("active");

      menuButton.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

    });

    navigation.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", event => {

      const clickedInsideMenu =
        navigation.contains(event.target) ||
        menuButton.contains(event.target);

      if (!clickedInsideMenu) {
        closeMenu();
      }

    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

  }


  /* ==================================
     3. INFORMATION MODAL
  ================================== */

  const modal = document.querySelector(".modal");
  const modalContent = document.querySelector(".modal-content");
  const modalTitle = document.querySelector("#modal-title");
  const modalText = document.querySelector("#modal-text");
  const closeModalButton = document.querySelector(".close-modal");

  let previousFocus = null;

  function openModal(title, description) {

    if (!modal || !modalTitle || !modalText) return;

    previousFocus = document.activeElement;

    modalTitle.textContent = title;
    modalText.textContent = description;

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");

    if (closeModalButton) {
      closeModalButton.focus();
    }

  }

  function closeModal() {

    if (!modal) return;

    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");

    if (previousFocus && typeof previousFocus.focus === "function") {
      previousFocus.focus();
    }

  }

  document.querySelectorAll(".info-button[data-info]").forEach(button => {

    button.addEventListener("click", () => {

      const title =
        button.getAttribute("data-title") || "معلومات إضافية ♡";

      const description =
        button.getAttribute("data-info") || "لا توجد معلومات متاحة حالياً.";

      openModal(title, description);

    });

  });

  if (closeModalButton) {
    closeModalButton.addEventListener("click", closeModal);
  }

  if (modal) {

    modal.addEventListener("click", event => {

      if (event.target === modal) {
        closeModal();
      }

    });

    document.addEventListener("keydown", event => {

      if (event.key === "Escape" && modal.classList.contains("active")) {
        closeModal();
      }

    });

  }


  /* ==================================
     4. GEAR SIMULATION
  ================================== */

  const speedSlider = document.querySelector("#speed");
  const speedValue = document.querySelector("#speed-value");

  const gearOne = document.querySelector(".gear-one");
  const gearTwo = document.querySelector(".gear-two");

  let gearAnimationOne = null;
  let gearAnimationTwo = null;

  function getGearIcon(container) {

    if (!container) return null;

    return container.querySelector("svg") ||
           container.querySelector("i");

  }

  function updateGearSimulation() {

    if (!speedSlider) return;

    const speed = Number(speedSlider.value);

    if (!Number.isFinite(speed)) return;

    const safeSpeed = Math.max(1, speed);

    if (speedValue) {
      speedValue.textContent = String(safeSpeed);
    }

    const iconOne = getGearIcon(gearOne);
    const iconTwo = getGearIcon(gearTwo);

    // سرعة دوران الترس الأول
    const durationOne = 60000 / safeSpeed;

    // نفترض أن الترس الثاني أكبر بمرتين
    const durationTwo = durationOne * 2;

    if (iconOne && typeof iconOne.animate === "function") {

      if (gearAnimationOne) {
        gearAnimationOne.cancel();
      }

      gearAnimationOne = iconOne.animate(
        [
          { transform: "rotate(0deg)" },
          { transform: "rotate(360deg)" }
        ],
        {
          duration: durationOne,
          iterations: Infinity,
          easing: "linear"
        }
      );

    }

    if (iconTwo && typeof iconTwo.animate === "function") {

      if (gearAnimationTwo) {
        gearAnimationTwo.cancel();
      }

      gearAnimationTwo = iconTwo.animate(
        [
          { transform: "rotate(0deg)" },
          { transform: "rotate(-360deg)" }
        ],
        {
          duration: durationTwo,
          iterations: Infinity,
          easing: "linear"
        }
      );

    }

  }

  if (speedSlider) {

    speedSlider.addEventListener(
      "input",
      updateGearSimulation
    );

    updateGearSimulation();

  }


  /* ==================================
     5. INTERACTIVE QUIZ
  ================================== */

  const questions = [

    {
      question: "ما وظيفة التروس في الأنظمة الميكانيكية؟",
      options: [
        "تخزين الوقود",
        "نقل الحركة الدورانية",
        "إنتاج الضوء"
      ],
      answer: 1,
      explanation: "تستعمل التروس لنقل الحركة الدورانية وتغيير السرعة وعزم الدوران."
    },

    {
      question: "ما وظيفة المحرك الكهربائي؟",
      options: [
        "تحويل الطاقة الكهربائية إلى حركة",
        "تخزين الماء",
        "قياس الحرارة"
      ],
      answer: 0,
      explanation: "المحرك الكهربائي يحول الطاقة الكهربائية إلى طاقة ميكانيكية."
    },

    {
      question: "ما وظيفة النابض؟",
      options: [
        "إنتاج الوقود",
        "تخزين الطاقة المرونية",
        "قياس السرعة"
      ],
      answer: 1,
      explanation: "النابض يخزن الطاقة المرونية عند تشوهه ويطلقها عند عودته."
    },

    {
      question: "عند تعشيق ترس صغير قائد بترس تابع أكبر، ماذا يحدث لسرعة التابع؟",
      options: [
        "تزداد",
        "تنخفض",
        "لا تتغير"
      ],
      answer: 1,
      explanation: "في هذا المثال، الترس الأكبر يدور بسرعة أقل من الترس الصغير القائد."
    },

    {
      question: "ما وظيفة البكرة في النظام الميكانيكي؟",
      options: [
        "نقل الحركة بواسطة الحزام",
        "إنتاج الكهرباء دائماً",
        "تخزين الحرارة"
      ],
      answer: 0,
      explanation: "تستعمل البكرات مع الأحزمة لنقل الحركة بين المحاور."
    }

  ];

  const questionElement = document.querySelector("#question");
  const optionsContainer = document.querySelector("#options");
  const nextButton = document.querySelector("#next-question");
  const resultElement = document.querySelector("#quiz-result");

  let currentQuestion = 0;
  let score = 0;
  let hasAnswered = false;
  let quizFinished = false;

  function showQuestion() {

    if (!questionElement || !optionsContainer) return;

    const question = questions[currentQuestion];

    if (!question) return;

    hasAnswered = false;

    questionElement.textContent =
      `السؤال ${currentQuestion + 1} من ${questions.length}: ${question.question}`;

    optionsContainer.replaceChildren();

    question.options.forEach((option, index) => {

      const button = document.createElement("button");

      button.type = "button";
      button.className = "option";
      button.textContent = option;

      button.addEventListener("click", () => {
        selectAnswer(index);
      });

      optionsContainer.appendChild(button);

    });

    if (resultElement) {
      resultElement.textContent = "";
    }

    if (nextButton) {
      nextButton.hidden = true;
      nextButton.style.display = "none";
      nextButton.textContent = "السؤال التالي ♡";
    }

  }

  function selectAnswer(selectedIndex) {

    if (hasAnswered || quizFinished) return;

    const question = questions[currentQuestion];

    if (!question) return;

    hasAnswered = true;

    const optionButtons =
      optionsContainer.querySelectorAll(".option");

    optionButtons.forEach((button, index) => {

      button.disabled = true;

      if (index === question.answer) {
        button.classList.add("correct");
      }

      if (index === selectedIndex && selectedIndex !== question.answer) {
        button.classList.add("wrong");
      }

    });

    const isCorrect = selectedIndex === question.answer;

    if (isCorrect) {
      score++;
    }

    if (resultElement) {

      resultElement.textContent = isCorrect
        ? "إجابة صحيحة! أحسنتِ 💗"
        : `ليست الإجابة الصحيحة. ${question.explanation}`;

    }

    if (nextButton) {
      nextButton.hidden = false;
      nextButton.style.display = "inline-flex";
    }

  }

  function finishQuiz() {

    quizFinished = true;

    questionElement.textContent = "انتهى الاختبار! 🌸";

    optionsContainer.replaceChildren();

    const percentage = Math.round(
      (score / questions.length) * 100
    );

    if (resultElement) {

      resultElement.textContent =
        `نتيجتك: ${score} من ${questions.length} — ${percentage}% 💗`;

    }

    if (nextButton) {
      nextButton.hidden = false;
      nextButton.style.display = "inline-flex";
      nextButton.textContent = "إعادة الاختبار ♡";
    }

  }

  function restartQuiz() {

    currentQuestion = 0;
    score = 0;
    hasAnswered = false;
    quizFinished = false;

    showQuestion();

  }

  if (
    questionElement &&
    optionsContainer &&
    nextButton
  ) {

    nextButton.addEventListener("click", () => {

      if (quizFinished) {
        restartQuiz();
        return;
      }

      if (!hasAnswered) return;

      currentQuestion++;

      if (currentQuestion < questions.length) {
        showQuestion();
      } else {
        finishQuiz();
      }

    });

    showQuestion();

  }


  /* ==================================
     6. SCROLL REVEAL ANIMATION
  ================================== */

  const revealElements =
    document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.12
      }
    );

    revealElements.forEach(element => {
      observer.observe(element);
    });

  } else {

    revealElements.forEach(element => {
      element.classList.add("visible");
    });

  }


  /* ==================================
     7. SMOOTH NAVIGATION
  ================================== */

  document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches ? "auto" : "smooth",
        block: "start"
      });

    });

  });


  /* ==================================
     8. ACCESSIBILITY
  ================================== */

  if (modal) {
    modal.setAttribute("aria-hidden", "true");
  }

  console.log("Mechanical World ♡ is ready!");

});

