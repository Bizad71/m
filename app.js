const startBtn = document.getElementById("startBtn");

const hero = document.getElementById("hero");
const story = document.getElementById("story");
const letter = document.getElementById("letter");
const surprise = document.getElementById("surprise");
const final = document.getElementById("final");

const envelope = document.getElementById("envelope");
const letterText = document.getElementById("letterText");

const surpriseBtn = document.getElementById("surpriseBtn");
const openGift = document.getElementById("openGift");


/* =========================
   START
========================= */

startBtn.addEventListener("click", () => {

    hero.classList.add("hidden");

    story.classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =========================
   LETTER
========================= */

function showLetter() {

    story.classList.add("hidden");

    letter.classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


const text = `
بعضی حرف‌ها را نمی‌شود
در چند جمله گفت...

اما اگر بخواهم
فقط یک چیز بگویم،

می‌گویم:

محدثه...

از بین تمام اتفاق‌هایی
که می‌توانست در زندگی من بیفتد،

آشنایی با تو
یکی از قشنگ‌ترین‌هایشان بود.

و اگر دوباره به عقب برگردم،

باز هم
تو را انتخاب می‌کنم.
`;


let index = 0;

function typeLetter() {

    if (index < text.length) {

        letterText.innerHTML +=
            text[index] === "\n"
                ? "<br>"
                : text[index];

        index++;

        setTimeout(typeLetter, 45);

    } else {

        surpriseBtn.classList.remove("hidden");

    }

}


/* باز شدن نامه */

envelope.addEventListener("click", () => {

    if (!envelope.classList.contains("open")) {

        envelope.classList.add("open");

        setTimeout(() => {

            typeLetter();

        }, 700);

    }

});


/* =========================
   SURPRISE
========================= */

surpriseBtn.addEventListener("click", () => {

    letter.classList.add("hidden");

    surprise.classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =========================
   OPEN GIFT
========================= */

openGift.addEventListener("click", () => {

    surprise.classList.add("hidden");

    final.classList.remove("hidden");

    createHearts();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =========================
   FLOATING HEARTS
========================= */

function createHearts() {

    for (let i = 0; i < 40; i++) {

        const heart = document.createElement("div");

        heart.innerHTML = "♥";

        heart.style.position = "fixed";

        heart.style.left =
            Math.random() * 100 + "vw";

        heart.style.bottom = "-30px";

        heart.style.fontSize =
            (10 + Math.random() * 25) + "px";

        heart.style.color =
            "#ff4da6";

        heart.style.pointerEvents =
            "none";

        heart.style.zIndex = "9999";

        document.body.appendChild(heart);

        const duration =
            2000 + Math.random() * 3000;

        heart.animate(
            [
                {
                    transform: "translateY(0) rotate(0deg)",
                    opacity: 1
                },

                {
                    transform:
                        `translateY(-${window.innerHeight + 100}px)
                         rotate(${Math.random() * 360}deg)`,

                    opacity: 0
                }
            ],
            {
                duration: duration,
                easing: "ease-out"
            }
        );

        setTimeout(() => {
            heart.remove();
        }, duration);

    }

}