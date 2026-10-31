
"use strict";

/**
 * =========================================================
 * MECHANICAL WORLD
 * Interactive Educational Website
 * Developed by: Kawter Ben Saleh
 * =========================================================
 */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. GLOBAL CONFIGURATION
    ===================================================== */

    const CONFIG = {
        animationDuration: 60000,
        quizQuestions: 5,
        reducedMotion: window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    };

    const $ = (selector, parent = document) =>
        parent.querySelector(selector);

    const $$ = (selector, parent = document) =>
        [...parent.querySelectorAll(selector)];

    /* =====================================================
       2. ICON INITIALIZATION
    ===================================================== */

    function initializeIcons() {
        if (
            window.lucide &&
            typeof window.lucide.createIcons === "function"
        ) {
            window.lucide.createIcons();
        }
    }

    initializeIcons();

    /* =====================================================
       3. MOBILE NAVIGATION
    ===================================================== */

    const menuButton = $(".menu-toggle");
    const navigation = $(".nav-links");

    function closeMenu() {
        if (!menuButton || !navigation) return;

        navigation.classList.remove("active");
        menuButton.setAttribute("aria-expanded", "false");
    }

    function initializeNavigation() {
        if (!menuButton || !navigation) return;

        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-controls", "main-navigation");

        navigation.id = "main-navigation";

        menuButton.addEventListener("click", () => {

            const isOpen =
                navigation.classList.toggle("active");

            menuButton.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        });

        $$("a", navigation).forEach(link => {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("click", event => {

            if (
                !navigation.contains(event.target) &&
                !menuButton.contains(event.target)
            ) {
                closeMenu();
            }

        });

        document.addEventListener("keydown", event => {

            if (event.key === "Escape") {
                closeMenu();
            }

        });

        window.addEventListener("resize", () => {

            if (window.innerWidth > 768) {
                closeMenu();
            }

        });
    }

    initializeNavigation();

    /* =====================================================
       4. PROFESSIONAL GEAR SIMULATION
    ===================================================== */

    const speedSlider = $("#speed");
    const speedValue = $("#speed-value");

    const gearOne = $(".gear-one");
    const gearTwo = $(".gear-two");

    let firstGearAnimation = null;
    let secondGearAnimation = null;

    let currentSpeed = 0;

    /**
     * Creates a continuous rotation animation.
     * Animation is created only once to improve performance.
     */

    function createGearAnimation(element, direction) {

        if (!element || typeof element.animate !== "function") {
            return null;
        }

        const animation = element.animate(
            [
                {
                    transform: "rotate(0deg)"
                },
                {
                    transform: `rotate(${direction * 360}deg)`
                }
            ],
            {
                duration: CONFIG.animationDuration,
                iterations: Infinity,
                easing: "linear"
            }
        );

        animation.pause();

        return animation;
    }

    /**
     * Updates the gear speed without restarting animations.
     */

    function updateGearSpeed() {

        if (!speedSlider) return;

        const speed = Number(speedSlider.value);

        if (!Number.isFinite(speed)) return;

        currentSpeed = Math.max(0, speed);

        // Update visible speed
        if (speedValue) {
            speedValue.textContent = String(currentSpeed);
        }

        // Respect accessibility preferences
        if (CONFIG.reducedMotion) {
            if (firstGearAnimation) {
                firstGearAnimation.pause();
            }

            if (secondGearAnimation) {
                secondGearAnimation.pause();
            }

            return;
        }

        // Stop at zero
        if (currentSpeed === 0) {

            firstGearAnimation?.pause();
            secondGearAnimation?.pause();

            return;
        }

        // Apply speed to both gears
        if (firstGearAnimation) {

            firstGearAnimation.playbackRate = currentSpeed;

            firstGearAnimation.play();
        }

        if (secondGearAnimation) {

            secondGearAnimation.playbackRate = currentSpeed;

            secondGearAnimation.play();
        }
    }

    function initializeGearSimulation() {

        if (!speedSlider || !gearOne || !gearTwo) {

            console.warn(
                "Mechanical World: Gear simulation elements are missing."
            );

            return;
        }

        // Create animations once
        firstGearAnimation = createGearAnimation(
            gearOne,
            1
        );

        secondGearAnimation = createGearAnimation(
            gearTwo,
            -1
        );

        // Connect slider to simulation
        speedSlider.addEventListener(
            "input",
            updateGearSpeed
        );

        // Initial state
        updateGearSpeed();

        console.info(
            "Mechanical World: Gear simulation initialized."
        );
    }

    initializeGearSimulation();

    /* =====================================================
       5. INFORMATION MODAL
    ===================================================== */

    const modal = $(".modal");
    const modalTitle = $("#modal-title");
    const modalText = $("#modal-text");
    const closeModalButton = $(".close-modal");

    let previousFocus = null;

    function openModal(title, description) {

        if (!modal || !modalTitle || !modalText) {
            return;
        }

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

        if (
            previousFocus &&
            typeof previousFocus.focus === "function"
        ) {
            previousFocus.focus();
        }
    }

    $$("[data-info]").forEach(button => {

        button.addEventListener("click", () => {

            const title =
                button.dataset.title ||
                "معلومات إضافية ♡";

            const description =
                button.dataset.info ||
                "لا توجد معلومات متاحة حالياً.";

            openModal(title, description);

        });

    });

    closeModalButton?.addEventListener(
        "click",
        closeModal
    );

    modal?.addEventListener("click", event => {

        if (event.target === modal) {
            closeModal();
        }

    });

    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            modal?.classList.contains("active")
        ) {
            closeModal();
        }

    });

    if (modal) {
        modal.setAttribute("aria-hidden", "true");
    }

    /* =====================================================
       6. INTERACTIVE QUIZ
    ===================================================== */

    const questions = [

        {
            question: "ما وظيفة التروس في الأنظمة الميكانيكية؟",

            options: [
                "تخزين الوقود",
                "نقل الحركة الدورانية",
                "إنتاج الضوء"
            ],

            answer: 1,

            explanation:
                "تستعمل التروس لنقل الحركة الدورانية وتغيير السرعة وعزم الدوران."
        },

        {
            question: "ما وظيفة المحرك الكهربائي؟",

            options: [
                "تحويل الطاقة الكهربائية إلى حركة",
                "تخزين الماء",
                "قياس الحرارة"
            ],

            answer: 0,

            explanation:
                "المحرك الكهربائي يحول الطاقة الكهربائية إلى طاقة ميكانيكية."
        },

        {
            question: "ما وظيفة النابض؟",

            options: [
                "إنتاج الوقود",
                "تخزين الطاقة المرونية",
                "قياس السرعة"
            ],

            answer: 1,

            explanation:
                "النابض يخزن الطاقة المرونية عند تشوهه ويطلقها عند عودته."
        },

        {
            question: "عند تعشيق ترس صغير مع ترس تابع أكبر، ماذا يحدث لسرعة التابع؟",

            options: [
                "تزداد",
                "تنخفض",
                "لا تتغير"
            ],

            answer: 1,

            explanation:
                "الترس الأكبر يدور بسرعة زاوية أقل من الترس الصغير القائد."
        },

        {
            question: "ما وظيفة البكرة في النظام الميكانيكي؟",

            options: [
                "نقل الحركة بواسطة الحزام",
                "إنتاج الكهرباء دائماً",
                "تخزين الحرارة"
            ],

            answer: 0,

            explanation:
                "تستعمل البكرات مع الأحزمة لنقل الحركة بين المحاور."
        }

    ];

    const questionElement = $("#question");
    const optionsContainer = $("#options");
    const nextButton = $("#next-question");
    const resultElement = $("#quiz-result");

    let currentQuestion = 0;
    let score = 0;
    let hasAnswered = false;
    let quizFinished = false;

    function showQuestion() {

        if (
            !questionElement ||
            !optionsContainer ||
            !nextButton
        ) {
            return;
        }

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

        nextButton.textContent = "السؤال التالي ♡";
        nextButton.style.display = "none";
        nextButton.disabled = true;
    }

    function selectAnswer(selectedIndex) {

        if (hasAnswered || quizFinished) return;

        const question = questions[currentQuestion];

        if (!question) return;

        hasAnswered = true;

        const buttons =
            $$(".option", optionsContainer);

        buttons.forEach((button, index) => {

            button.disabled = true;

            if (index === question.answer) {
                button.classList.add("correct");
            }

            if (
                index === selectedIndex &&
                selectedIndex !== question.answer
            ) {
                button.classList.add("wrong");
            }

        });

        const isCorrect =
            selectedIndex === question.answer;

        if (isCorrect) {
            score++;
        }

        if (resultElement) {

            resultElement.textContent = isCorrect
                ? "إجابة صحيحة! أحسنتِ 💗"
                : `إجابة غير صحيحة. ${question.explanation}`;

        }

        nextButton.disabled = false;
        nextButton.style.display = "inline-flex";
    }

    function finishQuiz() {

        quizFinished = true;

        questionElement.textContent =
            "انتهى الاختبار! 🌸";

        optionsContainer.replaceChildren();

        const percentage = Math.round(
            (score / questions.length) * 100
        );

        resultElement.textContent =
            `نتيجتك: ${score} من ${questions.length} — ${percentage}% 💗`;

        nextButton.textContent =
            "إعادة الاختبار ♡";

        nextButton.style.display = "inline-flex";
        nextButton.disabled = false;
    }

    function restartQuiz() {

        currentQuestion = 0;
        score = 0;
        hasAnswered = false;
        quizFinished = false;

        showQuestion();
    }

    function initializeQuiz() {

        if (
            !questionElement ||
            !optionsContainer ||
            !nextButton
        ) {
            console.warn(
                "Mechanical World: Quiz elements are missing."
            );

            return;
        }

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

    initializeQuiz();

    /* =====================================================
       7. SCROLL REVEAL
    ===================================================== */

    function initializeScrollReveal() {

        const elements = $$(".reveal");

        if (!elements.length) return;

        if (
            CONFIG.reducedMotion ||
            !("IntersectionObserver" in window)
        ) {

            elements.forEach(element => {
                element.classList.add("visible");
            });

            return;
        }

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

        elements.forEach(element => {
            observer.observe(element);
        });
    }

    initializeScrollReveal();

    /* =====================================================
       8. SMOOTH NAVIGATION
    ===================================================== */

    function initializeSmoothNavigation() {

        $$('a[href^="#"]').forEach(link => {

            link.addEventListener("click", event => {

                const targetId =
                    link.getAttribute("href");

                if (!targetId || targetId === "#") {
                    return;
                }

                let target;

                try {
                    target = document.querySelector(targetId);
                } catch (error) {
                    return;
                }

                if (!target) return;

                event.preventDefault();

                target.scrollIntoView({
                    behavior: CONFIG.reducedMotion
                        ? "auto"
                        : "smooth",

                    block: "start"
                });

            });

        });
    }

    initializeSmoothNavigation();

    /* =====================================================
       9. IMAGE ERROR HANDLING
    ===================================================== */

    function initializeImageHandling() {

        $$("img").forEach(image => {

            image.addEventListener("error", () => {

                console.warn(
                    "Mechanical World: Image could not be loaded:",
                    image.src
                );

                image.alt = "تعذر تحميل الصورة";

                image.style.background = "#35202f";
            });

        });

    }

    initializeImageHandling();

    /* =====================================================
       10. APPLICATION STATUS
    ===================================================== */

    console.info(
        "========================================"
    );

    console.info(
        "Mechanical World ♡"
    );

    console.info(
        "Application initialized successfully."
    );

    console.info(
        "Gear simulation:",
        firstGearAnimation && secondGearAnimation
            ? "Ready"
            : "Unavailable"
    );

    console.info(
        "Quiz:",
        questions.length,
        "questions loaded."
    );

    console.info(
        "========================================"
    );

});

