// القائمة
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("active");
  menuBtn.textContent = nav.classList.contains("active") ? "✕" : "☰";
});

// إغلاق القائمة بعد الضغط على رابط
document.querySelectorAll("#nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("active");
    menuBtn.textContent = "☰";
  });
});

// محاكاة المحرك
const startBtn = document.getElementById("startBtn");
const gear = document.getElementById("gear");
const simText = document.getElementById("simText");

let isRunning = false;

startBtn.addEventListener("click", () => {
  isRunning = !isRunning;

  if (isRunning) {
    gear.classList.add("running");
    simText.textContent = "🚀 المحرك يعمل الآن! الحركة تبدأ من هنا.";
    startBtn.textContent = "إيقاف المحرك ⏹️";
  } else {
    gear.classList.remove("running");
    simText.textContent = "تم إيقاف المحرك. يمكنك تشغيله مجدداً!";
    startBtn.textContent = "تشغيل المحرك ⚡";
  }
});

// ظهور الأقسام عند التمرير
const revealElements = document.querySelectorAll(
  ".section, .card, .about-card, .car-box, .team-card, .fact-card"
);

revealElements.forEach(element => {
  element.classList.add("reveal");
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12
});

revealElements.forEach(element => observer.observe(element));

// زر العودة للأعلى
const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {
  topBtn.style.display = window.scrollY > 400 ? "block" : "none";
});

topBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// السنة تلقائياً
document.getElementById("year").textContent =
  new Date().getFullYear();



