
/* =========================================
   MECHANICAL WORLD — DETAILS ENGINE
   Dynamic pages, sections and interactive quiz
========================================= */

(() => {
  "use strict";

  const PAGES = window.PAGES || {};

  const escapeHTML = (value = "") =>
    String(value).replace(/[&<>"']/g, char => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    })[char]);

  let activePage = null;

  // إنشاء نافذة التفاصيل
  function createDetailsWindow() {
    if (document.getElementById("mechanical-details")) return;

    const style = document.createElement("style");

    style.textContent = `
      #mechanical-details {
        position:fixed;
        inset:0;
        z-index:99999;
        background:#090909;
        color:#eee;
        overflow-y:auto;
        display:none;
        font-family:inherit;
      }

      #mechanical-details.active { display:block; }

      .md-header {
        position:sticky;
        top:0;
        z-index:5;
        background:#101010;
        border-bottom:1px solid #8b713e;
        padding:15px 5%;
        display:flex;
        justify-content:space-between;
        align-items:center;
        gap:15px;
      }

      .md-logo {
        color:#c9a45c;
        font-weight:900;
        letter-spacing:1px;
      }

      .md-close {
        background:#c9a45c;
        color:#090909;
        border:0;
        padding:9px 17px;
        border-radius:7px;
        cursor:pointer;
        font-weight:900;
      }

      .md-hero {
        padding:65px 7%;
        text-align:center;
        background:linear-gradient(130deg,#211a0d,#090909);
        border-bottom:1px solid #49391f;
      }

      .md-icon { font-size:55px; }
      .md-hero h1 { color:#c9a45c;font-size:clamp(28px,5vw,48px);margin:12px 0; }
      .md-hero p { max-width:850px;margin:auto;color:#bbb;line-height:2; }

      .md-content {
        max-width:1150px;
        margin:auto;
        padding:35px 20px 65px;
      }

      .md-section { margin:35px 0; }

      .md-section h2 {
        color:#c9a45c;
        border-right:4px solid #c9a45c;
        padding-right:13px;
        margin-bottom:18px;
      }

      .md-card {
        background:#151515;
        border:1px solid #302719;
        border-radius:13px;
        padding:22px;
        margin:14px 0;
        line-height:2;
      }

      .md-card h3 { color:#c9a45c;margin-bottom:8px; }
      .md-card p { color:#ccc; }

      .md-list { padding-right:23px;color:#ccc; }
      .md-list li { margin:8px 0; }

      .md-grid {
        display:grid;
        grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
        gap:16px;
      }

      .md-quiz {
        background:#121212;
        border:1px solid #49391f;
        border-radius:14px;
        padding:23px;
      }

      .md-question {
        padding:17px 0;
        border-bottom:1px solid #333;
      }

      .md-question strong { display:block;margin-bottom:10px; }

      .md-question label {
        display:block;
        padding:6px;
        color:#ccc;
        cursor:pointer;
      }

      .md-question input { accent-color:#c9a45c; }

      .md-btn {
        background:#c9a45c;
        color:#090909;
        border:0;
        border-radius:7px;
        padding:11px 20px;
        margin:15px 5px 0 0;
        cursor:pointer;
        font-weight:900;
      }

      .md-result {
        color:#c9a45c;
        font-size:19px;
        margin-top:15px;
        font-weight:bold;
      }

      .md-footer {
        text-align:center;
        padding:25px;
        background:#101010;
        border-top:1px solid #49391f;
        color:#aaa;
      }

      .md-footer strong { color:#c9a45c; }

      @media(max-width:600px) {
        .md-hero { padding:45px 18px; }
        .md-content { padding:25px 14px; }
        .md-header { padding:12px 15px; }
      }
    `;

    document.head.appendChild(style);

    const wrapper = document.createElement("div");
    wrapper.id = "mechanical-details";

    wrapper.innerHTML = `
      <header class="md-header">
        <div class="md-logo">MECHANICAL WORLD</div>
        <button class="md-close" onclick="closeMechanicalPage()">
          ✕ إغلاق
        </button>
      </header>
      <div id="md-page-content"></div>
    `;

    document.body.appendChild(wrapper);
  }

  // تجهيز النصوص والقوائم
  function renderContent(data) {
    if (typeof data === "string") {
      return `<p>${escapeHTML(data)}</p>`;
    }

    if (Array.isArray(data)) {
      return `<ul class="md-list">${
        data.map(item => `<li>${escapeHTML(item)}</li>`).join("")
      }</ul>`;
    }

    return "";
  }

  // عرض أقسام الصفحة
  function renderSections(sections = []) {
    if (!Array.isArray(sections)) return "";

    return sections.map((section, index) => {
      if (typeof section === "string") {
        return `
          <section class="md-section">
            <div class="md-card">${escapeHTML(section)}</div>
          </section>
        `;
      }

      const title = section.title || section.heading || `القسم ${index + 1}`;
      const content = section.content || section.text || section.description || "";
      const list = section.list || section.items || section.points || [];

      return `
        <section class="md-section">
          <h2>${escapeHTML(title)}</h2>
          <div class="md-card">
            ${renderContent(content)}
            ${renderContent(list)}
          </div>
        </section>
      `;
    }).join("");
  }

  // إنشاء الاختبار
  function renderQuiz(questions = []) {
    if (!Array.isArray(questions) || !questions.length) return "";

    return `
      <section class="md-section">
        <h2>اختبر معلوماتك</h2>
        <div class="md-quiz" id="md-quiz">
          <p>أجب عن الأسئلة التالية واكتشف مستواك العلمي.</p>

          ${questions.map((q, i) => `
            <div class="md-question">
              <strong>${i + 1}. ${escapeHTML(q.question || q.q || "")}</strong>
              ${(q.options || []).map((option, j) => `
                <label>
                  <input type="radio" name="md-q-${i}" value="${j}">
                  ${escapeHTML(option)}
                </label>
              `).join("")}
            </div>
          `).join("")}

          <button class="md-btn" onclick="checkMechanicalQuiz()">
            تصحيح الاختبار
          </button>

          <button class="md-btn" onclick="resetMechanicalQuiz()">
            إعادة المحاولة
          </button>

          <div class="md-result" id="md-result"></div>
        </div>
      </section>
    `;
  }

  // فتح صفحة التفاصيل
  function openMechanicalPage(pageKey) {
    const page = PAGES[pageKey];

    if (!page) {
      console.error("Mechanical World: Page not found:", pageKey);
      return;
    }

    activePage = page;

    createDetailsWindow();

    const wrapper = document.getElementById("mechanical-details");
    const content = document.getElementById("md-page-content");

    const title = page.title || page.name || "Mechanical World";
    const icon = page.icon || "⚙️";
    const intro = page.intro || page.description || "اكتشف المزيد من المعلومات في عالم الميكانيك.";

    content.innerHTML = `
      <section class="md-hero">
        <div class="md-icon">${escapeHTML(icon)}</div>
        <h1>${escapeHTML(title)}</h1>
        <p>${escapeHTML(intro)}</p>
      </section>

      <main class="md-content">
        ${renderSections(page.sections || page.content || [])}

        ${renderQuiz(page.quiz || page.questions || [])}

        <section class="md-section">
          <div class="md-card">
            <h3>معلومة هندسية</h3>
            <p>
              فهم الأنظمة الميكانيكية يساعد على تشخيص الأعطال
              وتحسين أداء المركبات وزيادة كفاءة التشغيل.
            </p>
          </div>
        </section>
      </main>

      <footer class="md-footer">
        <p>إعداد التلميذتين</p>
        <strong>بن صالح كوثر 🌞</strong>
        <br>
        <strong>بالعربي هاجر 🌚</strong>
        <p>إشراف: أستاذ مادة الميكانيك</p>
        <p>© MECHANICAL WORLD</p>
      </footer>
    `;

    wrapper.classList.add("active");
    document.body.style.overflow = "hidden";
    wrapper.scrollTop = 0;
  }

  // إغلاق صفحة التفاصيل
  function closeMechanicalPage() {
    const wrapper = document.getElementById("mechanical-details");

    if (wrapper) wrapper.classList.remove("active");

    document.body.style.overflow = "";
    activePage = null;
  }

  // تصحيح الاختبار
  function checkMechanicalQuiz() {
    if (!activePage) return;

    const questions = activePage.quiz || activePage.questions || [];
    let score = 0;

    questions.forEach((q, i) => {
      const selected = document.querySelector(
        `input[name="md-q-${i}"]:checked`
      );

      if (selected && Number(selected.value) === Number(q.answer)) {
        score++;
      }
    });

    const result = document.getElementById("md-result");

    if (result) {
      result.textContent =
        `نتيجتك: ${score} / ${questions.length} — ${
          score === questions.length
            ? "ممتاز! إجابات صحيحة كلها 🏆"
            : "واصل التعلم وحاول مرة أخرى 💪"
        }`;
    }
  }

  // إعادة الاختبار
  function resetMechanicalQuiz() {
    document.querySelectorAll(
      '#md-quiz input[type="radio"]'
    ).forEach(input => input.checked = false);

    const result = document.getElementById("md-result");
    if (result) result.textContent = "";
  }

  // ربط الوظائف بالصفحات
  window.openMechanicalPage = openMechanicalPage;
  window.closeMechanicalPage = closeMechanicalPage;
  window.checkMechanicalQuiz = checkMechanicalQuiz;
  window.resetMechanicalQuiz = resetMechanicalQuiz;

  // فتح التفاصيل عند الضغط على بطاقة القسم
  document.addEventListener("click", event => {
    const card = event.target.closest("[data-page]");

    if (!card) return;

    const pageKey = card.dataset.page;

    if (PAGES[pageKey]) {
      event.preventDefault();
      openMechanicalPage(pageKey);
    }
  });

  // زر Escape للإغلاق
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeMechanicalPage();
  });

})();

