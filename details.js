
/* =========================================
   MECHANICAL WORLD — PREMIUM EDITION
   Professional Engineering Website
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  const pageKey = document.body.dataset.page;
  const page = window.PAGES?.[pageKey];

  if (!page) {
    document.body.innerHTML = `
      <div style="text-align:center;padding:100px 20px;font-family:Arial">
        <h1>404 — Page Not Found</h1>
        <p>عذراً، الصفحة المطلوبة غير موجودة.</p>
        <a href="index.html">العودة للرئيسية</a>
      </div>`;
    return;
  }

  document.title = `${page.title} | Mechanical World`;

  /* ---------- PREMIUM DESIGN ---------- */

  const style = document.createElement("style");

  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&display=swap');

    :root {
      --bg: #080d18;
      --surface: #111c2e;
      --surface2: #17253b;
      --text: #edf4ff;
      --muted: #9aacc4;
      --accent: #38bdf8;
      --gold: #d6b36a;
      --border: rgba(148,163,184,.16);
      --shadow: 0 20px 60px rgba(0,0,0,.25);
    }

    body.light-mode {
      --bg: #f1f5f9;
      --surface: #ffffff;
      --surface2: #e8eef6;
      --text: #142033;
      --muted: #607087;
      --border: rgba(15,23,42,.12);
      --shadow: 0 15px 45px rgba(15,23,42,.08);
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      background: var(--bg);
      color: var(--text);
      font-family: 'Cairo', Arial, sans-serif;
      line-height: 1.9;
      transition: background .3s, color .3s;
    }

    button, a {
      font-family: inherit;
    }

    a {
      text-decoration: none;
    }

    .top-progress {
      position: fixed;
      top: 0;
      left: 0;
      height: 3px;
      width: 0%;
      background: linear-gradient(90deg,var(--accent),var(--gold));
      z-index: 9999;
    }

    .navbar {
      position: sticky;
      top: 0;
      z-index: 1000;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 13px 7%;
      background: rgba(8,13,24,.88);
      backdrop-filter: blur(18px);
      border-bottom: 1px solid var(--border);
      gap: 15px;
    }

    body.light-mode .navbar {
      background: rgba(255,255,255,.9);
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 11px;
      color: var(--text);
      font-weight: 900;
      font-size: 18px;
    }

    .brand-icon {
      width: 42px;
      height: 42px;
      display: grid;
      place-items: center;
      border-radius: 13px;
      background: linear-gradient(135deg,#0284c7,#164e85);
      color: white;
      font-size: 23px;
    }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .nav-button {
      border: 1px solid var(--border);
      color: var(--text);
      background: var(--surface);
      padding: 9px 15px;
      border-radius: 10px;
      cursor: pointer;
      font-size: 13px;
      transition: .25s;
    }

    .nav-button:hover {
      border-color: var(--accent);
      transform: translateY(-2px);
    }

    .container {
      width: min(1120px,90%);
      margin: auto;
    }

    .hero {
      position: relative;
      overflow: hidden;
      margin: 45px auto;
      padding: 75px 45px;
      border-radius: 27px;
      background:
        radial-gradient(circle at 85% 20%,rgba(56,189,248,.22),transparent 35%),
        linear-gradient(125deg,#101d32,#122d49 55%,#0b1729);
      border: 1px solid rgba(56,189,248,.22);
      box-shadow: var(--shadow);
    }

    .hero::after {
      content: "⚙";
      position: absolute;
      right: -20px;
      bottom: -110px;
      font-size: 340px;
      color: rgba(255,255,255,.035);
      pointer-events: none;
    }

    .hero-content {
      position: relative;
      z-index: 2;
      max-width: 750px;
    }

    .eyebrow {
      display: inline-block;
      color: var(--gold);
      font-size: 12px;
      letter-spacing: 3px;
      font-weight: 800;
      margin-bottom: 15px;
    }

    .hero-icon {
      font-size: 60px;
      margin-bottom: 8px;
      display: block;
    }

    .hero h1 {
      font-size: clamp(30px,5vw,53px);
      line-height: 1.35;
      font-weight: 900;
      color: #fff;
      margin-bottom: 15px;
    }

    .hero p {
      color: #c1d3e8;
      font-size: 16px;
      max-width: 680px;
    }

    .hero-line {
      height: 3px;
      width: 85px;
      margin-top: 25px;
      border-radius: 20px;
      background: linear-gradient(90deg,var(--accent),var(--gold));
    }

    .section-heading {
      margin: 55px 0 22px;
    }

    .section-heading span {
      color: var(--gold);
      font-size: 11px;
      letter-spacing: 2px;
      font-weight: 800;
    }

    .section-heading h2 {
      font-size: 27px;
      font-weight: 900;
      margin-top: 5px;
    }

    .section-heading p {
      color: var(--muted);
      font-size: 14px;
    }

    .content-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit,minmax(260px,1fr));
      gap: 20px;
    }

    .info-card {
      position: relative;
      padding: 25px;
      border-radius: 18px;
      background: var(--surface);
      border: 1px solid var(--border);
      box-shadow: var(--shadow);
      transition: transform .3s,border-color .3s;
      overflow: hidden;
    }

    .info-card::before {
      content: "";
      position: absolute;
      width: 3px;
      height: 45px;
      right: 0;
      top: 25px;
      background: var(--accent);
      border-radius: 5px;
    }

    .info-card:hover {
      transform: translateY(-6px);
      border-color: rgba(56,189,248,.5);
    }

    .info-card h3 {
      font-size: 18px;
      margin-bottom: 10px;
      color: var(--text);
    }

    .info-card p {
      color: var(--muted);
      font-size: 14px;
    }

    .tile-card {
      padding: 23px;
      border-radius: 18px;
      background: linear-gradient(145deg,var(--surface),var(--surface2));
      border: 1px solid var(--border);
      transition: .3s;
    }

    .tile-card:hover {
      transform: translateY(-5px);
      border-color: var(--gold);
    }

    .tile-icon {
      font-size: 37px;
      margin-bottom: 12px;
    }

    .tile-card h3 {
      font-size: 17px;
      margin-bottom: 5px;
    }

    .tile-card p {
      color: var(--muted);
      font-size: 13px;
    }

    .interactive {
      margin: 50px 0;
      padding: 32px;
      background:
        radial-gradient(circle at top right,rgba(56,189,248,.10),transparent 40%),
        var(--surface);
      border: 1px solid rgba(56,189,248,.28);
      border-radius: 23px;
      box-shadow: var(--shadow);
      text-align: center;
    }

    .interactive h2 {
      margin-bottom: 15px;
      font-size: 24px;
    }

    .premium-button {
      background: linear-gradient(135deg,#0284c7,#075985);
      border: none;
      color: white;
      padding: 12px 23px;
      border-radius: 11px;
      cursor: pointer;
      font-weight: 800;
      margin: 7px;
      transition: .25s;
    }

    .premium-button:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba(14,165,233,.25);
    }

    .secondary-button {
      background: var(--surface2);
      color: var(--text);
      border: 1px solid var(--border);
    }

    .engine-display {
      font-size: 85px;
      margin: 20px;
      display: inline-block;
    }

    .engine-running {
      animation: engineSpin 1.4s linear infinite;
    }

    @keyframes engineSpin {
      to { transform: rotate(360deg); }
    }

    .dashboard-number {
      font-size: clamp(35px,7vw,65px);
      color: var(--accent);
      font-weight: 900;
      font-variant-numeric: tabular-nums;
    }

    .dashboard-label {
      color: var(--muted);
      font-size: 13px;
    }

    .range-control {
      width: min(500px,100%);
      accent-color: var(--accent);
      margin: 20px 0;
      cursor: pointer;
    }

    .quiz-answer {
      display: block;
      width: 100%;
      max-width: 500px;
      margin: 10px auto;
      padding: 13px;
      border-radius: 12px;
      background: var(--surface2);
      border: 1px solid var(--border);
      color: var(--text);
      cursor: pointer;
      transition: .2s;
    }

    .quiz-answer:hover:not(:disabled) {
      border-color: var(--accent);
      transform: translateY(-2px);
    }

    .quiz-answer:disabled {
      cursor: default;
      opacity: .9;
    }

    .quiz-answer.correct {
      background: #14532d;
      color: white;
      border-color: #22c55e;
    }

    .quiz-answer.wrong {
      background: #7f1d1d;
      color: white;
      border-color: #ef4444;
    }

    .quiz-progress {
      height: 7px;
      background: var(--surface2);
      border-radius: 20px;
      overflow: hidden;
      max-width: 500px;
      margin: 18px auto;
    }

    .quiz-progress div {
      height: 100%;
      width: 0;
      background: linear-gradient(90deg,var(--accent),var(--gold));
      transition: width .3s;
    }

    .result-number {
      font-size: 52px;
      font-weight: 900;
      color: var(--gold);
    }

    .back-link {
      display: inline-block;
      color: var(--accent);
      margin: 30px 0;
      font-weight: 700;
    }

    .footer {
      margin-top: 60px;
      padding: 35px 15px;
      text-align: center;
      border-top: 1px solid var(--border);
      background: var(--surface);
    }

    .footer strong {
      color: var(--accent);
      font-size: 18px;
    }

    .footer p {
      color: var(--muted);
      font-size: 13px;
      margin-top: 8px;
    }

    .fade-in {
      animation: fadeIn .65s ease both;
    }

    @keyframes fadeIn {
      from {opacity:0;transform:translateY(18px)}
      to {opacity:1;transform:translateY(0)}
    }

    @media(max-width:650px) {
      .navbar { padding: 11px 4%; }
      .brand { font-size: 14px; }
      .brand-icon { width: 36px;height:36px; }
      .nav-button { padding: 8px 10px;font-size: 12px; }
      .hero { padding: 45px 23px;margin: 25px auto; }
      .hero::after { font-size: 180px; }
      .interactive { padding: 23px 14px; }
      .section-heading h2 { font-size: 23px; }
    }

    @media print {
      .navbar,.top-progress,.interactive button,.back-link {
        display:none !important;
      }
      body { background:white;color:black; }
      .info-card,.tile-card {
        break-inside: avoid;
        background:white;
        color:black;
        box-shadow:none;
      }
      .hero { background:#eee;color:black; }
      .hero h1 { color:black; }
    }

    @media (prefers-reduced-motion: reduce) {
      *,*::before,*::after {
        animation-duration:.01ms !important;
        scroll-behavior:auto !important;
        transition-duration:.01ms !important;
      }
    }
  `;

  document.head.appendChild(style);

  /* ---------- PAGE STRUCTURE ---------- */

  document.body.innerHTML = `
    <div class="top-progress" id="topProgress"></div>

    <nav class="navbar">
      <a class="brand" href="index.html">
        <span class="brand-icon">⚙</span>
        <span>MECHANICAL WORLD</span>
      </a>

      <div class="nav-actions">
        <button class="nav-button" id="themeButton">☀️ / 🌙</button>
        <button class="nav-button" onclick="window.print()">طباعة الصفحة</button>
        <a class="nav-button" href="index.html">⌂ الرئيسية</a>
      </div>
    </nav>

    <main class="container">

      <section class="hero fade-in">
        <div class="hero-content">
          <span class="eyebrow">ENGINEERING • TECHNOLOGY • INNOVATION</span>
          <span class="hero-icon">${page.icon || "⚙️"}</span>
          <h1>${page.title}</h1>
          <p>${page.intro || ""}</p>
          <div class="hero-line"></div>
        </div>
      </section>

      <section id="sectionsArea"></section>
      <section id="tilesArea"></section>
      <section id="interactiveArea"></section>

      <a href="index.html" class="back-link">← العودة إلى الصفحة الرئيسية</a>

    </main>

    <footer class="footer">
      <strong>MECHANICAL WORLD</strong>
      <p>Explore the science. Understand the machine. Build the future.</p>
      <p>إعداد التلميذتين: بن صالح كوثر 🌞 | يالعربي هاجر 🌚</p>
      <p>© ${new Date().getFullYear()} Mechanical World. All rights reserved.</p>
    </footer>
  `;

  /* ---------- THEME ---------- */

  const themeButton = document.getElementById("themeButton");

  if (localStorage.getItem("mw-theme") === "light") {
    document.body.classList.add("light-mode");
  }

  themeButton.onclick = () => {
    document.body.classList.toggle("light-mode");
    localStorage.setItem(
      "mw-theme",
      document.body.classList.contains("light-mode") ? "light" : "dark"
    );
  };

  /* ---------- SCROLL PROGRESS ---------- */

  window.addEventListener("scroll", () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const progress = total > 0 ? (window.scrollY / total) * 100 : 0;

    document.getElementById("topProgress").style.width = progress + "%";
  });

  /* ---------- INFORMATION SECTIONS ---------- */

  const sectionsArea = document.getElementById("sectionsArea");

  if (page.sections?.length) {
    sectionsArea.innerHTML = `
      <div class="section-heading">
        <span>01 / KNOWLEDGE</span>
        <h2>المحتوى العلمي</h2>
        <p>اكتشفي المفاهيم والمعلومات الأساسية.</p>
      </div>

      <div class="content-grid">
        ${page.sections.map((item, index) => `
          <article class="info-card fade-in">
            <h3>${String(index + 1).padStart(2,"0")} — ${item[0]}</h3>
            <p>${item[1]}</p>
          </article>
        `).join("")}
      </div>
    `;
  }

  /* ---------- TILES ---------- */

  const tilesArea = document.getElementById("tilesArea");

  if (page.tiles?.length) {
    tilesArea.innerHTML = `
      <div class="section-heading">
        <span>02 / KEY ELEMENTS</span>
        <h2>العناصر الأساسية</h2>
        <p>أهم العناصر التي يجب معرفتها.</p>
      </div>

      <div class="content-grid">
        ${page.tiles.map(tile => `
          <article class="tile-card fade-in">
            <div class="tile-icon">${tile[0]}</div>
            <h3>${tile[1]}</h3>
            <p>${tile[2]}</p>
          </article>
        `).join("")}
      </div>
    `;
  }

  /* ---------- INTERACTIVE AREA ---------- */

  const interactive = document.getElementById("interactiveArea");

  function createInteractive(title, content) {
    interactive.innerHTML = `
      <div class="interactive fade-in">
        <span class="eyebrow">INTERACTIVE EXPERIENCE</span>
        <h2>${title}</h2>
        ${content}
      </div>
    `;
  }

  /* ---------- ENGINE SIMULATOR ---------- */

  if (page.interactive === "engine") {

    createInteractive("محاكاة المحرك", `
      <div class="engine-display" id="engineIcon">⚙️</div>
      <p id="engineStatus">المحرك متوقف.</p>
      <button class="premium-button" id="engineButton">تشغيل المحرك</button>
    `);

    let running = false;

    document.getElementById("engineButton").onclick = function() {
      running = !running;

      document.getElementById("engineIcon").classList.toggle(
        "engine-running", running
      );

      document.getElementById("engineStatus").textContent =
        running ? "المحرك يعمل الآن — Ready to drive!" : "المحرك متوقف.";

      this.textContent = running ? "إيقاف المحرك" : "تشغيل المحرك";
    };
  }

  /* ---------- DASHBOARD ---------- */

  if (page.interactive === "dashboard") {

    createInteractive("محاكي لوحة القيادة", `
      <div class="dashboard-number" id="speedValue">0</div>
      <div class="dashboard-label">KILOMETERS PER HOUR</div>

      <p style="margin-top:20px">دورات المحرك RPM</p>
      <div class="dashboard-number" id="rpmValue" style="font-size:35px">800</div>

      <input class="range-control" id="speedRange"
        type="range" min="0" max="220" value="0">

      <p id="dashboardStatus">السيارة متوقفة.</p>
      <button class="premium-button secondary-button" id="resetDashboard">
        إعادة ضبط
      </button>
    `);

    const range = document.getElementById("speedRange");

    function updateDashboard() {
      const speed = Number(range.value);

      document.getElementById("speedValue").textContent = speed;
      document.getElementById("rpmValue").textContent =
        Math.round(800 + speed * 35);

      document.getElementById("dashboardStatus").textContent =
        speed === 0 ? "السيارة متوقفة." :
        speed < 80 ? "قيادة هادئة 🚗" :
        speed < 150 ? "سرعة متوسطة ⚡" :
        "سرعة مرتفعة جداً — التزمي بالسرعة القانونية.";
    }

    range.addEventListener("input", updateDashboard);

    document.getElementById("resetDashboard").onclick = () => {
      range.value = 0;
      updateDashboard();
    };
  }

  /* ---------- QUIZ SYSTEM ---------- */

  if (page.interactive === "quiz") {

    const questions = [
      {
        q: "ما الوظيفة الأساسية للمحرك؟",
        a: ["إنتاج الحركة", "إضاءة الطريق", "تخزين الوقود"],
        c: 0
      },
      {
        q: "ما وظيفة الفرامل؟",
        a: ["زيادة السرعة", "إبطاء السيارة وإيقافها", "تبريد المحرك"],
        c: 1
      },
      {
        q: "ما معنى RPM؟",
        a: ["سرعة الطريق", "درجة الحرارة", "دورات المحرك في الدقيقة"],
        c: 2
      },
      {
        q: "ما مصدر الطاقة في السيارة الكهربائية؟",
        a: ["البطارية", "البنزين", "المبرد"],
        c: 0
      },
      {
        q: "ما وظيفة ناقل الحركة؟",
        a: ["تنظيف المحرك", "نقل القوة إلى العجلات", "إضاءة الطريق"],
        c: 1
      },
      {
        q: "ما الآلة البسيطة التي تغير اتجاه القوة؟",
        a: ["البكرة", "المصباح", "البطارية"],
        c: 0
      },
      {
        q: "ما وحدة قياس السرعة الشائعة للسيارات؟",
        a: ["كيلومتر في الساعة", "كيلوغرام", "درجة مئوية"],
        c: 0
      }
    ];

    let current = 0;
    let score = 0;
    let answered = false;

    createInteractive("اختبار المعرفة الهندسية", `
      <p id="quizCounter"></p>
      <div class="quiz-progress"><div id="quizProgress"></div></div>
      <h3 id="quizQuestion" style="margin:20px 0"></h3>
      <div id="quizAnswers"></div>
      <p id="quizFeedback" style="margin:15px"></p>
      <p>النتيجة: <strong id="quizScore">0</strong> / ${questions.length}</p>
      <button class="premium-button" id="nextQuestion" disabled>
        السؤال التالي ←
      </button>
      <button class="premium-button secondary-button" id="restartQuiz">
        إعادة الاختبار
      </button>
    `);

    function showQuestion() {
      answered = false;

      const question = questions[current];

      document.getElementById("quizCounter").textContent =
        `السؤال ${current + 1} من ${questions.length}`;

      document.getElementById("quizQuestion").textContent = question.q;
      document.getElementById("quizFeedback").textContent = "";
      document.getElementById("quizScore").textContent = score;

      document.getElementById("quizProgress").style.width =
        (current / questions.length * 100) + "%";

      document.getElementById("nextQuestion").disabled = true;

      document.getElementById("quizAnswers").innerHTML =
        question.a.map((answer,index) => `
          <button class="quiz-answer" data-index="${index}">
            ${answer}
          </button>
        `).join("");

      document.querySelectorAll(".quiz-answer").forEach(button => {
        button.onclick = () => {
          if (answered) return;

          answered = true;

          const selected = Number(button.dataset.index);
          const correct = selected === question.c;

          if (correct) score++;

          document.querySelectorAll(".quiz-answer").forEach((item,index) => {
            item.disabled = true;

            if (index === question.c) {
              item.classList.add("correct");
            } else if (index === selected) {
              item.classList.add("wrong");
            }
          });

          document.getElementById("quizScore").textContent = score;

          document.getElementById("quizFeedback").textContent =
            correct ? "إجابة صحيحة! أحسنتِ 🌟" :
            "ليست الإجابة الصحيحة، راجعي الحل الأخضر.";

          document.getElementById("nextQuestion").disabled = false;
        };
      });
    }

    document.getElementById("nextQuestion").onclick = () => {
      if (!answered) return;

      current++;

      if (current >= questions.length) {
        document.getElementById("quizCounter").textContent = "FINAL RESULT";
        document.getElementById("quizQuestion").textContent =
          "انتهى الاختبار! 🏆";

        document.getElementById("quizProgress").style.width = "100%";
        document.getElementById("quizAnswers").innerHTML = "";

        document.getElementById("quizFeedback").innerHTML = `
          <div class="result-number">${score}/${questions.length}</div>
          <p>${score === questions.length ? "ممتاز! أنتِ خبيرة ميكانيك! 🥇" :
          score >= 5 ? "أداء رائع! واصلي التعلم. ⭐" :
          "بداية جيدة! أعيدي المحاولة لتحسين نتيجتك. 💪"}</p>
        `;

        document.getElementById("nextQuestion").disabled = true;
        return;
      }

      showQuestion();
    };

    document.getElementById("restartQuiz").onclick = () => {
      current = 0;
      score = 0;
      showQuestion();
    };

    showQuestion();
  }

});
