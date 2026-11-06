
/* =================================================
   MECHANICAL WORLD
   MULTI-PAGE NAVIGATION SYSTEM
   Version 3.0
================================================= */

(() => {
  "use strict";

  const DATA = window.MW_DATA;

  if (!DATA || !DATA.categories || !DATA.topics) {
    console.error("MW: تأكدي من تحميل pages-data.js أولاً");
    return;
  }

  const app = document.getElementById("app");
  const home = document.getElementById("home");

  let historyStack = [];
  let currentRoute = null;

  /* ================================================
     CREATE APP CONTAINER
  ================================================ */

  function createApp() {
    if (document.getElementById("mwPages")) return;

    const page = document.createElement("main");
    page.id = "mwPages";
    page.style.display = "none";

    const reference = home || app;

    if (reference) {
      reference.insertAdjacentElement("afterend", page);
    } else {
      document.body.appendChild(page);
    }
  }

  /* ================================================
     HELPERS
  ================================================ */

  function escapeHTML(value = "") {
    return String(value).replace(/[&<>"']/g, char => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    })[char]);
  }

  function getPageContainer() {
    return document.getElementById("mwPages");
  }

  function getCategory(id) {
    return DATA.categories.find(category => category.id === id);
  }

  function getTopic(id) {
    return DATA.topics[id];
  }

  function getTopicIds(category) {
    return Array.isArray(category.topics) ? category.topics : [];
  }

  /* ================================================
     ROUTING
  ================================================ */

  function navigate(path, saveHistory = true) {
    if (saveHistory && currentRoute) {
      historyStack.push(currentRoute);
    }

    currentRoute = path;
    location.hash = path;
  }

  function goHome() {
    currentRoute = null;
    historyStack = [];

    const page = getPageContainer();

    if (page) {
      page.style.display = "none";
      page.innerHTML = "";
    }

    if (home) home.style.display = "";

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goBack() {
    if (historyStack.length) {
      const previous = historyStack.pop();
      currentRoute = previous;

      location.hash = previous;
    } else {
      goHome();
    }
  }

  function openCategory(id) {
    const category = getCategory(id);

    if (!category) return;

    navigate(`#/category/${encodeURIComponent(id)}`);
  }

  function openTopic(id) {
    const topic = getTopic(id);

    if (!topic) return;

    navigate(`#/topic/${encodeURIComponent(id)}`);
  }

  /* ================================================
     PAGE HEADER
  ================================================ */

  function pageHeader() {
    return `
      <div class="mw-topbar">
        <a href="#home" class="mw-brand" data-home>
          <span>MW</span>
          MECHANICAL WORLD
        </a>

        <button class="mw-back" data-back>
          ← رجوع
        </button>
      </div>
    `;
  }

  /* ================================================
     BREADCRUMB
  ================================================ */

  function breadcrumb(items = []) {
    return `
      <div class="mw-breadcrumb">
        <a href="#home" data-home>الرئيسية</a>

        ${items.map((item, index) => `
          <span> / </span>
          ${
            item.action
              ? `<a href="${escapeHTML(item.action)}">${escapeHTML(item.name)}</a>`
              : `<span>${escapeHTML(item.name)}</span>`
          }
        `).join("")}
      </div>
    `;
  }

  /* ================================================
     CATEGORY PAGE
  ================================================ */

  function renderCategory(id) {
    const category = getCategory(id);

    if (!category) {
      renderNotFound();
      return;
    }

    const topicIds = getTopicIds(category);

    const cards = topicIds.map((topicId, index) => {
      const topic = getTopic(topicId);

      if (!topic) return "";

      return `
        <article class="mw-topic-card">
          <div class="mw-topic-number">
            ${String(index + 1).padStart(2, "0")}
          </div>

          <div class="mw-topic-icon">
            ${escapeHTML(topic.icon || "⚙️")}
          </div>

          <h3>${escapeHTML(topic.title)}</h3>

          <p>${escapeHTML(topic.intro || "اكتشف المزيد حول هذا الموضوع.")}</p>

          <button
            class="mw-open-topic"
            data-topic="${escapeHTML(topicId)}"
          >
            استكشف الموضوع
            <span>←</span>
          </button>
        </article>
      `;
    }).join("");

    renderPage(`
      ${pageHeader()}

      <section class="mw-hero">
        ${breadcrumb([
          { name: category.title }
        ])}

        <div class="mw-category-icon">
          ${escapeHTML(category.icon || "⚙️")}
        </div>

        <span class="mw-eyebrow">MECHANICAL WORLD / CATEGORY</span>

        <h1>${escapeHTML(category.title)}</h1>

        <p>${escapeHTML(category.intro || category.description || "")}</p>

        <div class="mw-meta">
          <span>📚 ${topicIds.length} مواضيع تعليمية</span>
          <span>⚙️ محتوى ميكانيكي</span>
        </div>
      </section>

      <section class="mw-content">
        <div class="mw-section-title">
          <span>اكتشف وتعلم</span>
          <h2>مواضيع هذا القسم</h2>
          <p>اختر موضوعًا لعرض الشرح والمعلومات بالتفصيل.</p>
        </div>

        <div class="mw-topics-grid">
          ${cards || `<p>لا توجد مواضيع في هذا القسم حاليًا.</p>`}
        </div>
      </section>

      <section class="mw-bottom">
        <h2>المعرفة تبدأ بخطوة</h2>
        <p>واصل اكتشاف عالم الميكانيك وتعلم المزيد.</p>
        <button data-home class="mw-primary-button">
          العودة للرئيسية
        </button>
      </section>

      ${pageFooter()}
    `);
  }

  /* ================================================
     TOPIC PAGE
  ================================================ */

  function renderTopic(id) {
    const topic = getTopic(id);

    if (!topic) {
      renderNotFound();
      return;
    }

    const category = getCategory(topic.category);

    const sections = Array.isArray(topic.sections)
      ? topic.sections
      : [];

    const sectionHTML = sections.map((section, index) => `
      <article class="mw-info-card">
        <div class="mw-info-number">
          ${String(index + 1).padStart(2, "0")}
        </div>

        <div>
          <h3>${escapeHTML(section.heading || "معلومات")}</h3>
          <p>${escapeHTML(section.text || "")}</p>
        </div>
      </article>
    `).join("");

    const formula = topic.formula
      ? `
        <div class="mw-formula">
          <span>القانون أو العلاقة</span>
          <h3>${escapeHTML(topic.formula)}</h3>
        </div>
      `
      : "";

    const fact = topic.fact
      ? `
        <div class="mw-fact">
          <span>💡 معلومة مهمة</span>
          <p>${escapeHTML(topic.fact)}</p>
        </div>
      `
      : "";

    const ids = category ? getTopicIds(category) : [];
    const index = ids.indexOf(id);

    const previousId = index > 0 ? ids[index - 1] : null;
    const nextId = index >= 0 && index < ids.length - 1
      ? ids[index + 1]
      : null;

    renderPage(`
      ${pageHeader()}

      <section class="mw-hero mw-topic-hero">
        ${breadcrumb([
          ...(category
            ? [{
                name: category.title,
                action: `#/category/${category.id}`
              }]
            : []),
          { name: topic.title }
        ])}

        <div class="mw-category-icon">
          ${escapeHTML(topic.icon || "⚙️")}
        </div>

        <span class="mw-eyebrow">MECHANICAL WORLD / TOPIC</span>

        <h1>${escapeHTML(topic.title)}</h1>

        <p>${escapeHTML(topic.intro || "")}</p>

        ${category ? `
          <button class="mw-category-link"
            data-category="${escapeHTML(category.id)}">
            ${escapeHTML(category.title)} ←
          </button>
        ` : ""}
      </section>

      <section class="mw-content">
        <div class="mw-section-title">
          <span>DEEP KNOWLEDGE</span>
          <h2>شرح الموضوع</h2>
          <p>تعرف على أهم المعلومات والمفاهيم المتعلقة بهذا الموضوع.</p>
        </div>

        <div class="mw-info-list">
          ${sectionHTML}
        </div>

        ${formula}
        ${fact}

        <div class="mw-navigation">
          ${
            previousId
              ? `<button data-topic="${escapeHTML(previousId)}">
                   ← الموضوع السابق
                 </button>`
              : `<span></span>`
          }

          ${
            nextId
              ? `<button data-topic="${escapeHTML(nextId)}">
                   الموضوع التالي →
                 </button>`
              : `<button data-category="${escapeHTML(topic.category)}">
                   العودة إلى القسم
                 </button>`
          }
        </div>
      </section>

      ${pageFooter()}
    `);
  }

  /* ================================================
     NOT FOUND
  ================================================ */

  function renderNotFound() {
    renderPage(`
      ${pageHeader()}

      <section class="mw-not-found">
        <div>404</div>
        <h1>الصفحة غير موجودة</h1>
        <p>عذرًا، لم نتمكن من العثور على المحتوى المطلوب.</p>
        <button data-home class="mw-primary-button">
          العودة إلى الرئيسية
        </button>
      </section>

      ${pageFooter()}
    `);
  }

  /* ================================================
     FOOTER
  ================================================ */

  function pageFooter() {
    return `
      <footer class="mw-footer">
        <div class="mw-footer-logo">MW</div>
        <h3>MECHANICAL WORLD</h3>
        <p>رحلتك نحو فهم عالم الميكانيك تبدأ من هنا.</p>
        <small>© ${new Date().getFullYear()} Mechanical World — جميع الحقوق محفوظة</small>
      </footer>
    `;
  }

  /* ================================================
     RENDER PAGE
  ================================================ */

  function renderPage(html) {
    const page = getPageContainer();

    if (!page) return;

    if (home) home.style.display = "none";

    page.style.display = "block";
    page.innerHTML = html;

    window.scrollTo({ top: 0, behavior: "instant" });
  }

  /* ================================================
     HASH ROUTER
  ================================================ */

  function handleRoute() {
    const hash = location.hash;

    if (!hash || hash === "#home" || hash === "#") {
      currentRoute = null;

      const page = getPageContainer();

      if (page) {
        page.style.display = "none";
        page.innerHTML = "";
      }

      if (home) home.style.display = "";

      return;
    }

    const categoryMatch = hash.match(/^#\/category\/([^/]+)$/);
    const topicMatch = hash.match(/^#\/topic\/([^/]+)$/);

    if (categoryMatch) {
      const id = decodeURIComponent(categoryMatch[1]);
      currentRoute = hash;
      renderCategory(id);
      return;
    }

    if (topicMatch) {
      const id = decodeURIComponent(topicMatch[1]);
      currentRoute = hash;
      renderTopic(id);
      return;
    }

    renderNotFound();
  }

  /* ================================================
     CLICK EVENTS
  ================================================ */

  document.addEventListener("click", event => {
    const categoryButton = event.target.closest("[data-category]");
    const topicButton = event.target.closest("[data-topic]");
    const backButton = event.target.closest("[data-back]");
    const homeButton = event.target.closest("[data-home]");

    if (categoryButton) {
      event.preventDefault();
      openCategory(categoryButton.dataset.category);
      return;
    }

    if (topicButton) {
      event.preventDefault();
      openTopic(topicButton.dataset.topic);
      return;
    }

    if (backButton) {
      event.preventDefault();
      goBack();
      return;
    }

    if (homeButton) {
      event.preventDefault();
      historyStack = [];
      location.hash = "#home";
    }
  });

  /* ================================================
     CATEGORY CARDS
  ================================================ */

  function connectCategoryCards() {
    document.querySelectorAll(
      "#categoryGrid .category-card, #categoryGrid [data-category]"
    ).forEach((card, index) => {

      if (card.dataset.mwConnected) return;

      const categoryId =
        card.dataset.category ||
        card.dataset.id ||
        (DATA.categories[index] && DATA.categories[index].id);

      if (!categoryId || !getCategory(categoryId)) return;

      card.dataset.mwConnected = "true";
      card.dataset.category = categoryId;

      card.addEventListener("click", event => {
        if (event.target.closest("a, button")) return;
        openCategory(categoryId);
      });
    });
  }

  /* ================================================
     INITIALIZE
  ================================================ */

  function init() {
    createApp();
    connectCategoryCards();
    handleRoute();

    const observer = new MutationObserver(() => {
      connectCategoryCards();
    });

    const grid = document.getElementById("categoryGrid");

    if (grid) {
      observer.observe(grid, {
        childList: true,
        subtree: true
      });
    }
  }

  window.addEventListener("hashchange", handleRoute);

  window.MW_NAV = {
    home: goHome,
    back: goBack,
    category: openCategory,
    topic: openTopic
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();

