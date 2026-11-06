// ==============================
// 1. MENU
// ==============================

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
        nav.classList.toggle("active");
        menuBtn.textContent =
            nav.classList.contains("active") ? "✕" : "☰";
    });

    nav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("active");
            menuBtn.textContent = "☰";
        });
    });
}


// ==============================
// 2. DARK / LIGHT MODE
// ==============================

const themeBtn = document.getElementById("themeBtn");

if (themeBtn) {
    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("light");

        const isLight =
            document.body.classList.contains("light");

        themeBtn.textContent = isLight ? "🌙" : "☀️";

        localStorage.setItem(
            "mechanicalTheme",
            isLight ? "light" : "dark"
        );
    });

    const savedTheme =
        localStorage.getItem("mechanicalTheme");

    if (savedTheme === "light") {
        document.body.classList.add("light");
        themeBtn.textContent = "🌙";
    }
}


// ==============================
// 3. ENGINE ANIMATION
// ==============================

const engineBtn = document.getElementById("engineBtn");
const engineVisual = document.getElementById("engineVisual");
const engineStatus = document.getElementById("engineStatus");

let engineRunning = false;

if (engineBtn) {
    engineBtn.addEventListener("click", () => {

        engineRunning = !engineRunning;

        if (engineRunning) {

            engineVisual.classList.add("running");

            engineBtn.textContent = "إيقاف المحرك ⏹️";

            engineStatus.textContent =
                "المحرك يعمل الآن! تتحول طاقة الوقود إلى حركة ميكانيكية ⚙️";

        } else {

            engineVisual.classList.remove("running");

            engineBtn.textContent = "تشغيل النموذج ⚡";

            engineStatus.textContent =
                "توقف المحرك. اضغطي تشغيل لمشاهدة الحركة من جديد.";

        }
    });
}


// ==============================
// 4. CAR DASHBOARD
// ==============================

const speedSlider = document.getElementById("speedSlider");
const speedValue = document.getElementById("speedValue");
const rpmValue = document.getElementById("rpmValue");

const speedNeedle = document.getElementById("speedNeedle");
const rpmNeedle = document.getElementById("rpmNeedle");

const sliderLabel = document.getElementById("sliderLabel");
const driveMessage = document.getElementById("driveMessage");
const resetSpeed = document.getElementById("resetSpeed");

function updateDashboard() {

    if (!speedSlider) return;

    const speed = Number(speedSlider.value);

    const rpm = Math.round(800 + speed * 24);

    speedValue.textContent = speed;

    rpmValue.textContent = rpm.toLocaleString("en-US");

    sliderLabel.textContent = speed + " كم/س";

    // تحريك عداد السرعة
    const speedAngle = -130 + (speed / 220) * 260;

    speedNeedle.style.transform =
        `rotate(${speedAngle}deg)`;

    // تحريك عداد المحرك
    const rpmAngle = -130 + ((rpm - 800) / 5280) * 260;

    rpmNeedle.style.transform =
        `rotate(${rpmAngle}deg)`;

    // رسالة حسب السرعة
    if (speed === 0) {

        driveMessage.textContent = "السيارة متوقفة 🅿️";

    } else if (speed < 80) {

        driveMessage.textContent = "سرعة منخفضة 🚗";

    } else if (speed < 150) {

        driveMessage.textContent = "سرعة متوسطة 🏎️";

    } else {

        driveMessage.textContent = "سرعة مرتفعة! ⚡";

    }
}

if (speedSlider) {
    speedSlider.addEventListener("input", updateDashboard);
    updateDashboard();
}

if (resetSpeed) {
    resetSpeed.addEventListener("click", () => {
        speedSlider.value = 0;
        updateDashboard();
    });
}


// ==============================
// 5. MECHANICAL QUIZ
// ==============================

const questions = [

    {
        question: "ما وظيفة البطارية في السيارة؟",
        answers: [
            "تخزين الكهرباء",
            "تبريد المحرك",
            "إيقاف العجلات"
        ],
        correct: 0
    },

    {
        question: "ما الجزء المسؤول عن إنتاج الحركة؟",
        answers: [
            "المصابيح",
            "المحرك",
            "الإطارات"
        ],
        correct: 1
    },

    {
        question: "ما وظيفة الفرامل؟",
        answers: [
            "زيادة السرعة",
            "تشغيل المحرك",
            "إبطاء السيارة"
        ],
        correct: 2
    },

    {
        question: "ما وظيفة ناقل الحركة؟",
        answers: [
            "نقل القوة إلى العجلات",
            "تنظيف الهواء",
            "تشغيل المصابيح"
        ],
        correct: 0
    },

    {
        question: "ما وظيفة نظام التبريد؟",
        answers: [
            "زيادة الصوت",
            "تنظيم حرارة المحرك",
            "تغيير اتجاه السيارة"
        ],
        correct: 1
    }

];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionText = document.getElementById("questionText");
const answersBox = document.getElementById("answers");
const questionCount = document.getElementById("questionCount");
const scoreLabel = document.getElementById("scoreLabel");
const quizFeedback = document.getElementById("quizFeedback");
const nextQuestion = document.getElementById("nextQuestion");
const restartQuiz = document.getElementById("restartQuiz");
const progressBar = document.getElementById("progressBar");

function showQuestion() {

    if (!questionText) return;

    answered = false;

    const q = questions[currentQuestion];

    questionText.textContent = q.question;

    questionCount.textContent =
        `السؤال ${currentQuestion + 1} من ${questions.length}`;

    scoreLabel.textContent = `النقاط: ${score}`;

    quizFeedback.textContent = "";

    progressBar.style.width =
        ((currentQuestion + 1) / questions.length * 100) + "%";

    nextQuestion.disabled = true;

    nextQuestion.textContent =
        currentQuestion === questions.length - 1
            ? "عرض النتيجة 🏆"
            : "السؤال التالي ←";

    answersBox.innerHTML = "";

    q.answers.forEach((answer, index) => {

        const button = document.createElement("button");

        button.className = "answer-btn";

        button.textContent = answer;

        button.addEventListener("click", () => {

            if (answered) return;

            answered = true;

            const buttons =
                answersBox.querySelectorAll("button");

            buttons.forEach((btn, i) => {

                btn.disabled = true;

                if (i === q.correct) {
                    btn.classList.add("correct");
                }

                if (i === index && i !== q.correct) {
                    btn.classList.add("wrong");
                }

            });

            if (index === q.correct) {

                score++;

                quizFeedback.textContent =
                    "إجابة صحيحة! أحسنتِ 🌸";

            } else {

                quizFeedback.textContent =
                    "إجابة خاطئة، لا بأس! 💗";

            }

            scoreLabel.textContent = `النقاط: ${score}`;

            nextQuestion.disabled = false;

        });

        answersBox.appendChild(button);

    });
}

if (nextQuestion) {

    nextQuestion.addEventListener("click", () => {

        if (!answered) return;

        if (currentQuestion < questions.length - 1) {

            currentQuestion++;

            showQuestion();

        } else {

            questionText.textContent =
                `نتيجتك النهائية: ${score} / ${questions.length} 🏆`;

            questionCount.textContent = "انتهى الاختبار";

            answersBox.innerHTML = "";

            progressBar.style.width = "100%";

            quizFeedback.textContent =
                score >= 4
                    ? "رائع! أنتِ خبيرة الميكانيك 🌟"
                    : "أحسنتِ! واصلي التعلم 💗";

            nextQuestion.disabled = true;

            nextQuestion.textContent = "انتهى الاختبار";

        }

    });

}

if (restartQuiz) {

    restartQuiz.addEventListener("click", () => {

        currentQuestion = 0;
        score = 0;

        showQuestion();

    });

}

if (questionText) {
    showQuestion();
}


// ==============================
// 6. SCROLL TO TOP
// ==============================

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if (!topBtn) return;

    topBtn.style.display =
        window.scrollY > 350 ? "block" : "none";

});

if (topBtn) {

    topBtn.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


// ==============================
// 7. CURRENT YEAR
// ==============================

const year = document.getElementById("year");

if (year) {
    year.textContent = new Date().getFullYear();
}


// ==============================
// 8. WELCOME CONSOLE
// ==============================

console.log(
    "♡ Welcome to Mechanical World! ⚙️"
);



