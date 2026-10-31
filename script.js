
// ================================
// MECHANICAL WORLD ♡
// ================================

// فتح وإغلاق القائمة
function toggleMenu() {
    const menu = document.getElementById("menu");

    if (menu) {
        menu.classList.toggle("active");
    }
}

// إغلاق القائمة عند اختيار قسم
document.querySelectorAll("#menu a").forEach(link => {
    link.addEventListener("click", function () {
        document.getElementById("menu")?.classList.remove("active");
    });
});


// التنقل السلس بين الأقسام
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (event) {
        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});


// ظهور البطاقات عند التمرير
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: 0.15
});

document.querySelectorAll(
    ".info-card, .gallery-card, .team-card"
).forEach(card => {
    card.classList.add("hidden");
    observer.observe(card);
});


// رسالة ترحيب في وحدة التحكم
console.log("🌸 Welcome to Mechanical World ♡");
console.log("⚙️ Engineering • Innovation • Technology");


// العودة إلى أعلى الصفحة
const topButton = document.createElement("button");

topButton.innerHTML = "↑";
topButton.className = "top-button";
topButton.title = "العودة إلى الأعلى";

document.body.appendChild(topButton);

window.addEventListener("scroll", () => {
    topButton.style.display =
        window.scrollY > 300 ? "block" : "none";
});

topButton.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


