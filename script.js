
document.addEventListener("DOMContentLoaded", () => {
  // تفعيل أيقونات Lucide
  if (window.lucide) {
    lucide.createIcons();
  }

  // القائمة في الهاتف
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
      });
    });
  }

  // نافذة المعلومات
  const modal = document.querySelector(".modal");
  const modalTitle = document.querySelector("#modal-title");
  const modalText = document.querySelector("#modal-text");
  const closeModal = document.querySelector(".close-modal");

  document.querySelectorAll("[data-info]").forEach(button => {
    button.addEventListener("click", () => {
      if (!modal) return;

      if (modalTitle) {
        modalTitle.textContent =
          button.dataset.title || "معلومات عن المكوّن";
      }

      if (modalText) {
        modalText.textContent =
          button.dataset.info || "لا توجد معلومات إضافية.";
      }

      modal.classList.add("active");
    });
  });

  if (closeModal && modal) {
    closeModal.addEventListener("click", () => {
      modal.classList.remove("active");
    });
  }

  if (modal) {
    modal.addEventListener("click", event => {
      if (event.target === modal) {
        modal.classList.remove("active");
      }
    });
  }

  // محاكاة التروس
  const speedSlider = document.querySelector("#speed");
  const speedValue = document.querySelector("#speed-value");

  function updateSimulation() {
    if (!speedSlider) return;

    const speed = Number(speedSlider.value);

    // نبحث عن الأيقونات بعد تحميل الصفحة
    const gears = document.querySelectorAll(".lab-icon svg");

    if (gears.length >= 2) {
      gears[0].style.animation = `spin ${Math.max(0.2, 10 / speed)}s linear infinite`;
      gears[1].style.animation = `spin ${Math.max(0.2, 20 / speed)}s linear infinite reverse`;
    }

    if (speedValue) {
      speedValue.textContent = speed;
    }
  }

  if (speedSlider) {
    speedSlider.addEventListener("input", updateSimulation);
    updateSimulation();
  }

  // الاختبار التفاعلي
  const questions = [
    {
      question: "ما وظيفة التروس؟",
      options: [
        "نقل الحركة",
        "تخزين الكهرباء",
        "قياس الحرارة"
      ],
      answer: 0
    },
    {
      question: "ما وظيفة المحرك؟",
      options: [
        "إنتاج الصوت",
        "تحويل الطاقة إلى حركة",
        "قياس الضغط"
      ],
      answer: 1
    },
    {
      question: "ما فائدة البكرة؟",
      options: [
        "تغيير اتجاه القوة أو نقلها",
        "إنتاج الضوء",
        "تبريد المحرك"
      ],
      answer: 0
    },
    {
      question: "عند تعشيق ترس قائد صغير بترس تابع أكبر، ماذا يحدث لسرعة الترس التابع؟",
      options: [
        "تزداد",
        "تنخفض",
        "تبقى نفسها"
      ],
      answer: 1
    },
    {
      question: "ما وظيفة النابض؟",
      options: [
        "تخزين الطاقة المرونية",
        "إنتاج الوقود",
        "قياس السرعة"
      ],
      answer: 0
    }
  ];

  let currentQuestion = 0;
  let score = 0;

  const questionElement = document.querySelector("#question");
  const optionsContainer = document.querySelector("#options");
  const nextButton = document.querySelector("#next-question");
  const resultElement = document.querySelector("#quiz-result");

  function showQuestion() {
    if (!questionElement || !optionsContainer) return;

    const question = questions[currentQuestion];

    questionElement.textContent = question.question;
    optionsContainer.innerHTML = "";

    question.options.forEach((option, index) => {
      const button = document.createElement("button");

      button.className = "option";
      button.textContent = option;

      button.addEventListener("click", () => {
        if (optionsContainer.dataset.answered === "true") return;

        optionsContainer.dataset.answered = "true";

        const allOptions =
          optionsContainer.querySelectorAll(".option");

        allOptions.forEach((item, itemIndex) => {
          item.disabled = true;

          if (itemIndex === question.answer) {
            item.classList.add("correct");
          }

          if (itemIndex === index && index !== question.answer) {
            item.classList.add("wrong");
          }
        });

        if (index === question.answer) {
          score++;
        }

        if (nextButton) {
          nextButton.style.display = "inline-block";
        }
      });

      optionsContainer.appendChild(button);
    });

    optionsContainer.dataset.answered = "false";

    if (nextButton) {
      nextButton.textContent = "السؤال التالي";
      nextButton.style.display = "none";
    }

    if (resultElement) {
      resultElement.textContent = "";
    }
  }

  if (nextButton && questionElement && optionsContainer) {
    nextButton.addEventListener("click", () => {
      currentQuestion++;

      if (currentQuestion < questions.length) {
        showQuestion();
      } else {
        questionElement.textContent = "انتهى الاختبار!";
        optionsContainer.innerHTML = "";

        if (resultElement) {
          resultElement.textContent =
            `نتيجتك: ${score} من ${questions.length}`;
        }

        nextButton.textContent = "إعادة الاختبار";

        nextButton.onclick = () => {
          currentQuestion = 0;
          score = 0;
          nextButton.onclick = null;
          showQuestion();
        };
      }
    });

    showQuestion();
  }

  // ظهور الأقسام تدريجياً
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    });

    revealElements.forEach(element => {
      observer.observe(element);
    });
  } else {
    revealElements.forEach(element => {
      element.classList.add("visible");
    });
  }
});
