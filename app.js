/* =====================================================
   ELEMENTS
===================================================== */

const hero = document.getElementById("hero");
const story = document.getElementById("story");
const letter = document.getElementById("letter");
const puzzle = document.getElementById("puzzle");
const surprise = document.getElementById("surprise");
const final = document.getElementById("final");

const startBtn = document.getElementById("startBtn");
const storyNext = document.getElementById("storyNext");

const envelope = document.getElementById("envelope");
const letterText = document.getElementById("letterText");
const letterNextArea =
    document.getElementById("letterNextArea");

const puzzleStart =
    document.getElementById("puzzleStart");

const puzzleBoard =
    document.getElementById("puzzleBoard");

const puzzleStatus =
    document.getElementById("puzzleStatus");

const puzzleNext =
    document.getElementById("puzzleNext");

const openGift =
    document.getElementById("openGift");


/* =====================================================
   SHOW SECTION
===================================================== */

function showSection(section) {

    const sections = [
        hero,
        story,
        letter,
        puzzle,
        surprise,
        final
    ];

    sections.forEach(item => {

        item.classList.add("hidden");

    });

    section.classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =====================================================
   START
===================================================== */

startBtn.addEventListener("click", () => {

    showSection(story);

});


/* =====================================================
   STORY → LETTER
===================================================== */

storyNext.addEventListener("click", () => {

    showSection(letter);

});


/* =====================================================
   LETTER
===================================================== */

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

❤️
`;

let letterStarted = false;

let index = 0;


envelope.addEventListener("click", () => {

    if (letterStarted) {
        return;
    }

    letterStarted = true;

    envelope.classList.add("open");

    setTimeout(() => {

        typeLetter();

    }, 700);

});


function typeLetter() {

    if (index < text.length) {

        const char = text[index];

        if (char === "\n") {

            letterText.innerHTML += "<br>";

        } else {

            letterText.innerHTML += char;

        }

        index++;

        setTimeout(
            typeLetter,
            35
        );

    } else {

        setTimeout(() => {

            letterNextArea.classList.remove("hidden");

        }, 500);

    }
}


/* =====================================================
   LETTER → PUZZLE
===================================================== */

puzzleStart.addEventListener("click", () => {

    showSection(puzzle);

    createPuzzle();

});


/* =====================================================
   PUZZLE
===================================================== */

let puzzlePieces = [];

let selectedPiece = null;

let puzzleSolved = false;


/*
    شماره صحیح قطعات:

    0 1 2
    3 4 5
    6 7 8
*/

const correctOrder = [
    0, 1, 2,
    3, 4, 5,
    6, 7, 8
];


function createPuzzle() {

    puzzleBoard.innerHTML = "";

    puzzleSolved = false;

    selectedPiece = null;

    puzzleNext.classList.add("hidden");

    puzzleStatus.textContent =
        "قطعات را جابه‌جا کن...";

    /*
        قطعات را به شکل تصادفی می‌چینیم
    */

    puzzlePieces = [
        0, 1, 2,
        3, 4, 5,
        6, 7, 8
    ];


    shufflePuzzle();


    puzzlePieces.forEach(
        (pieceNumber, position) => {

            createPiece(
                pieceNumber,
                position
            );

        }
    );

}


function createPiece(
    pieceNumber,
    position
) {

    const piece =
        document.createElement("div");

    piece.className =
        "puzzle-piece";

    piece.dataset.position =
        position;

    piece.dataset.number =
        pieceNumber;

    /*
        موقعیت قطعه روی تصویر
    */

    const row =
        Math.floor(pieceNumber / 3);

    const column =
        pieceNumber % 3;

    piece.style.backgroundPosition =
        `${column * 50}% ${row * 50}%`;


    piece.addEventListener(
        "click",
        () => {

            selectPiece(piece);

        }
    );


    puzzleBoard.appendChild(piece);

}


function selectPiece(piece) {

    if (puzzleSolved) {
        return;
    }


    /*
        انتخاب قطعه اول
    */

    if (!selectedPiece) {

        selectedPiece = piece;

        piece.classList.add("selected");

        puzzleStatus.textContent =
            "حالا قطعه دوم را انتخاب کن.";

        return;
    }


    /*
        اگر همان قطعه دوباره انتخاب شد
    */

    if (selectedPiece === piece) {

        piece.classList.remove("selected");

        selectedPiece = null;

        puzzleStatus.textContent =
            "یک قطعه را انتخاب کن.";

        return;
    }


    /*
        جابه‌جایی دو قطعه
    */

    swapPieces(
        selectedPiece,
        piece
    );


    selectedPiece.classList.remove(
        "selected"
    );

    selectedPiece = null;


    /*
        بررسی حل شدن
    */

    checkPuzzle();

}


function swapPieces(
    first,
    second
) {

    const firstNumber =
        first.dataset.number;

    const secondNumber =
        second.dataset.number;


    first.dataset.number =
        secondNumber;

    second.dataset.number =
        firstNumber;


    /*
        ظاهر قطعات را عوض می‌کنیم
    */

    const firstPosition =
        getBackgroundPosition(
            Number(secondNumber)
        );

    const secondPosition =
        getBackgroundPosition(
            Number(firstNumber)
        );


    first.style.backgroundPosition =
        firstPosition;

    second.style.backgroundPosition =
        secondPosition;

}


function getBackgroundPosition(
    pieceNumber
) {

    const row =
        Math.floor(pieceNumber / 3);

    const column =
        pieceNumber % 3;


    /*
        برای CSS background-position
    */

    const x =
        column * 50;

    const y =
        row * 50;


    return `${x}% ${y}%`;
}


/* =====================================================
   SHUFFLE
===================================================== */

function shufflePuzzle() {

    /*
        مطمئن می‌شویم پازل
        از اول حل نباشد.
    */

    do {

        for (
            let i = puzzlePieces.length - 1;
            i > 0;
            i--
        ) {

            const j =
                Math.floor(
                    Math.random() * (i + 1)
                );

            [
                puzzlePieces[i],
                puzzlePieces[j]
            ] = [
                puzzlePieces[j],
                puzzlePieces[i]
            ];

        }

    } while (
        isPuzzleAlreadySolved()
    );

}


function isPuzzleAlreadySolved() {

    return puzzlePieces.every(
        (value, index) =>
            value === correctOrder[index]
    );

}


/* =====================================================
   CHECK PUZZLE
===================================================== */

function checkPuzzle() {

    const pieces =
        document.querySelectorAll(
            ".puzzle-piece"
        );


    const current =
        Array.from(pieces).map(
            piece =>
                Number(
                    piece.dataset.number
                )
        );


    const solved =
        current.every(
            (value, index) =>
                value === correctOrder[index]
        );


    if (solved) {

        puzzleSolved = true;

        puzzleStatus.innerHTML =
            "🎉 درستش کردی! راز بعدی منتظرته.";

        pieces.forEach(piece => {

            piece.style.cursor =
                "default";

        });


        puzzleNext.classList.remove(
            "hidden"
        );


        createSmallHearts();

    } else {

        puzzleStatus.textContent =
            "هنوز درست نشده... ادامه بده ❤️";

    }

}


/* =====================================================
   PUZZLE → GIFT
===================================================== */

puzzleNext.addEventListener(
    "click",
    () => {

        showSection(surprise);

    }
);


/* =====================================================
   GIFT → FINAL
===================================================== */

openGift.addEventListener(
    "click",
    () => {

        showSection(final);

        createHearts();

    }
);


/* =====================================================
   HEARTS
===================================================== */

function createHearts() {

    for (
        let i = 0;
        i < 50;
        i++
    ) {

        const heart =
            document.createElement("div");

        heart.innerHTML = "♥";

        heart.style.position =
            "fixed";

        heart.style.left =
            Math.random() * 100 + "vw";

        heart.style.bottom =
            "-40px";

        heart.style.fontSize =
            (10 +
                Math.random() * 25) +
            "px";

        heart.style.color =
            "#ff4da6";

        heart.style.pointerEvents =
            "none";

        heart.style.zIndex =
            "9999";


        document.body.appendChild(
            heart
        );


        const duration =
            2500 +
            Math.random() * 3500;


        heart.animate(

            [
                {
                    transform:
                        "translateY(0) rotate(0deg)",

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


        setTimeout(
            () => heart.remove(),
            duration
        );

    }

}


/* =====================================================
   SMALL HEARTS
===================================================== */

function createSmallHearts() {

    for (
        let i = 0;
        i < 15;
        i++
    ) {

        const heart =
            document.createElement("div");

        heart.textContent = "♥";

        heart.style.position =
            "fixed";

        heart.style.left =
            Math.random() * 100 + "vw";

        heart.style.top =
            Math.random() * 100 + "vh";

        heart.style.color =
            "#ff4da6";

        heart.style.fontSize =
            "20px";

        heart.style.pointerEvents =
            "none";

        heart.style.zIndex =
            "999";


        document.body.appendChild(
            heart
        );


        heart.animate(

            [
                {
                    transform:
                        "scale(.3)",

                    opacity: 0
                },

                {
                    transform:
                        "scale(1.5)",

                    opacity: 1
                },

                {
                    transform:
                        "scale(.5)",

                    opacity: 0
                }
            ],

            {
                duration: 1200
            }

        );


        setTimeout(
            () => heart.remove(),
            1200
        );

    }

}