
/* ==========================================
   MECHANICAL WORLD — DETAILS ENGINE
   نظام الصفحات التفصيلية
========================================== */

(() => {
  "use strict";

  const PAGES = window.PAGES || {};
  const pageIds = Object.keys(PAGES);

  if (!pageIds.length) {
    console.warn("MECHANICAL WORLD: pages-data.js is not loaded.");
    return;
  }

  let currentPageId = null;
  let mainContent = null;
  let detailView = null;

  const escapeHTML = (value = "") =>
    String(value).replace(/[&<>"']/g, char => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    })[char]);

  function createDetailView() {
    if (detailView) return detailView;

    detailView = document.createElement("main");
    detailView.id = "mechanical-detail-view";
    detailView.hidden = true;

    detailView.innerHTML = `
      <div class="detail-shell">
        <div class="detail-toolbar">
          <button type="button" class="detail-back">
            ← العودة إلى الرئيسية
          </button>
          <span class="detail-brand">MECHANICAL WORLD</span>
        </div>

        <article class="detail-article">
          <div class="detail-cover">
            <img class="detail-image" alt="صورة توضيحية">
            <div class="detail-cover-overlay"></div>
            <div class="detail-cover-content">
              <span class="detail-category"></span>
              <h1 class="detail-title"></h1>
              <p class="detail-intro"></p>
            </div>
          </div>

          <div class="detail-sections"></div>

          <div class="detail-navigation">
            <button type="button" class="detail-prev">← السابق</button>
            <button type="button" class="detail-next">التالي →</button>
          </div>
        </article>
      </div>
    `;

    document.body.appendChild(detailView);

    detailView.querySelector(".detail-back")
      .addEventListener("click", closePage);

    detailView.querySelector(".detail-prev")
      .addEventListener("click", () => movePage(-1));

    detailView.querySelector(".detail-next")
      .addEventListener("click", () => movePage(1));

    return detailView;
  }

  function renderSections(sections = []) {
    return sections.map((section, index) => {
      const paragraphs = (section.paragraphs || [])
        .map(p => `<p>${escapeHTML(p)}</p>`)
        .join("");

      const bullets = (section.bullets || []).length
        ? `<ul>${section.bullets.map(item =>
            `<li>${escapeHTML(item)}</li>`
          ).join("")}</ul>`
        : "";

      return `
        <section class="detail-section">
          <span class="detail-section-number">
            ${(index + 1).toString().padStart(2, "0")}
          </span>
          <h2>${escapeHTML(section.heading || "معلومات إضافية")}</h2>
          ${paragraphs}
          ${bullets}
        </section>
      `;
    }).join("");
  }

  function openPage(id) {
    const page = PAGES[id];

    if (!page) {
      console.warn("الصفحة غير موجودة:", id);
      return;
    }

    createDetailView();

    if (!mainContent) {
      mainContent = document.querySelector(
        "#app, #main-content, main, .main-content"
      );
    }

    if (mainContent && mainContent !== detailView) {
      mainContent.hidden = true;
    }

    currentPageId = id;

    const image = detailView.querySelector(".detail-image");
    const category = detailView.querySelector(".detail-category");
    const title = detailView.querySelector(".detail-title");
    const intro = detailView.querySelector(".detail-intro");
    const sections = detailView.querySelector(".detail-sections");

    image.src = page.image || "";
    image.alt = page.title || "Mechanical World";

    image.onerror = () => {
      image.style.display = "none";
    };

    image.style.display = page.image ? "block" : "none";

    category.textContent = page.category || "MECHANICAL KNOWLEDGE";
    title.textContent = page.title || "";
    intro.textContent = page.intro || "";

    sections.innerHTML = renderSections(page.sections);

    detailView.hidden = false;
    window.scrollTo({ top: 0, behavior: "smooth" });

    updateNavigation();
  }

  function closePage() {
    if (!detailView) return;

    detailView.hidden = true;

    if (mainContent) {
      mainContent.hidden = false;
    }

    currentPageId = null;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function movePage(direction) {
    const index = pageIds.indexOf(currentPageId);
    if (index === -1) return;

    const nextIndex = index + direction;

    if (nextIndex < 0 || nextIndex >= pageIds.length) return;

    openPage(pageIds[nextIndex]);
  }

  function updateNavigation() {
    const index = pageIds.indexOf(currentPageId);

    const previous = detailView.querySelector(".detail-prev");
    const next = detailView.querySelector(".detail-next");

    previous.disabled = index <= 0;
    next.disabled = index >= pageIds.length - 1;
  }

  // فتح الصفحات من أي عنصر يحمل data-page
  document.addEventListener("click", event => {
    const trigger = event.target.closest("[data-page], [data-page-id]");

    if (!trigger) return;

    const id = trigger.dataset.page || trigger.dataset.pageId;

    if (PAGES[id]) {
      event.preventDefault();
      openPage(id);
    }
  });

  // استقبال طلب فتح صفحة من ملفات أخرى
  document.addEventListener("mechanical:open-page", event => {
    if (event.detail && event.detail.id) {
      openPage(event.detail.id);
    }
  });

  // اختصار Escape للعودة
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && currentPageId) {
      closePage();
    }
  });

  // إتاحة فتح الصفحات من script.js
  window.openMechanicalPage = openPage;
  window.closeMechanicalPage = closePage;

  // تنسيق صفحة التفاصيل
  const style = document.createElement("style");

  style.textContent = `
    #mechanical-detail-view {
      min-height: 100vh;
      background: #0b0b0b;
      color: #f5f5f5;
      direction: rtl;
      font-family: inherit;
    }

    #mechanical-detail-view[hidden] {
      display: none !important;
    }

    .detail-shell {
      width: min(1150px, 92%);
      margin: auto;
      padding-bottom: 70px;
    }

    .detail-toolbar {
      min-height: 75px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 15px;
      border-bottom: 1px solid #292929;
    }

    .detail-toolbar button,
    .detail-navigation button {
      background: transparent;
      color: #d5b36a;
      border: 1px solid #b8954d;
      border-radius: 6px;
      padding: 11px 18px;
      cursor: pointer;
      transition: .25s;
    }

    .detail-toolbar button:hover,
    .detail-navigation button:hover:not(:disabled) {
      background: #b8954d;
      color: #111;
    }

    .detail-brand {
      color: #d5b36a;
      font-weight: 800;
      letter-spacing: 2px;
      direction: ltr;
    }

    .detail-cover {
      position: relative;
      min-height: 390px;
      margin: 30px 0 45px;
      overflow: hidden;
      border-radius: 15px;
      background: #171717;
      display: flex;
      align-items: end;
    }

    .detail-image {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: .48;
    }

    .detail-cover-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        0deg,
        #080808 0%,
        rgba(8,8,8,.72) 45%,
        rgba(8,8,8,.08) 100%
      );
    }

    .detail-cover-content {
      position: relative;
      z-index: 1;
      padding: 35px;
      max-width: 850px;
    }

    .detail-category {
      color: #d5b36a;
      font-size: 13px;
      letter-spacing: 2px;
    }

    .detail-title {
      font-size: clamp(30px, 5vw, 55px);
      margin: 15px 0;
      color: #fff;
    }

    .detail-intro {
      color: #c7c7c7;
      line-height: 2;
      font-size: 16px;
    }

    .detail-section {
      padding: 28px;
      margin: 22px 0;
      background: #141414;
      border: 1px solid #282828;
      border-right: 3px solid #b8954d;
      border-radius: 10px;
      line-height: 2;
    }

    .detail-section-number {
      color: #d5b36a;
      font-size: 13px;
      font-weight: bold;
    }

    .detail-section h2 {
      color: #e0c27e;
      margin: 8px 0 18px;
      font-size: 23px;
    }

    .detail-section p {
      color: #ccc;
      margin: 12px 0;
    }

    .detail-section li {
      color: #d5d5d5;
      margin: 8px 0;
    }

    .detail-navigation {
      display: flex;
      justify-content: space-between;
      gap: 15px;
      margin-top: 35px;
    }

    .detail-navigation button:disabled {
      opacity: .3;
      cursor: not-allowed;
    }

    @media(max-width:600px) {
      .detail-cover {
        min-height: 340px;
      }

      .detail-cover-content {
        padding: 22px;
      }

      .detail-section {
        padding: 19px;
      }

      .detail-brand {
        font-size: 11px;
      }

      .detail-toolbar button {
        padding: 9px 11px;
        font-size: 12px;
      }
    }
  `;

  document.head.appendChild(style);

  console.log("MECHANICAL WORLD: Details Engine loaded.");
})();
