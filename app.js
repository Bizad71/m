/* =====================================================
   ELEMENTS
===================================================== */

const hero =
    document.getElementById("hero");

const story =
    document.getElementById("story");

const letter =
    document.getElementById("letter");

const puzzle =
    document.getElementById("puzzle");

const surprise =
    document.getElementById("surprise");

const final =
    document.getElementById("final");


const startBtn =
    document.getElementById("startBtn");

const storyNext =
    document.getElementById("storyNext");


const envelope =
    document.getElementById("envelope");

const letterText =
    document.getElementById("letterText");

const letterNextArea =
    document.getElementById(
        "letterNextArea"
    );


const puzzleStart =
    document.getElementById(
        "puzzleStart"
    );

const puzzleBoard =
    document.getElementById(
        "puzzleBoard"
    );

const puzzleStatus =
    document.getElementById(
        "puzzleStatus"
    );

const puzzleNext =
    document.getElementById(
        "puzzleNext"
    );


const openGift =
    document.getElementById(
        "openGift"
    );


/* =====================================================
   SECTION SYSTEM
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

    sections.forEach(
        item => {
            item.classList.add("hidden");
        }
    );


    section.classList.remove(
        "hidden"
    );


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =====================================================
   START
===================================================== */

startBtn.addEventListener(
    "click",
    () => {

        showSection(story);

    }
);


/* =====================================================
   STORY
===================================================== */

storyNext.addEventListener(
    "click",
    () => {

        showSection(letter);

    }
);


/* =====================================================
   LETTER
===================================================== */

const letterMessage = `محدثه...

بعضی حرف‌ها را نمی‌شود
در چند جمله گفت...

اما اگر بخواهم
فقط یک چیز بگویم،

می‌گویم:

از بین تمام اتفاق‌هایی
که می‌توانست در زندگی من بیفتد،

آشنایی با تو
یکی از قشنگ‌ترین‌هایشان بود.

و اگر دوباره به عقب برگردم،

باز هم
تو را انتخاب می‌کنم.

❤️`;


let letterStarted = false;

let letterIndex = 0;


envelope.addEventListener(
    "click",
    openLetter
);


function openLetter() {

    if (letterStarted) {
        return;
    }


    letterStarted = true;


    envelope.classList.add(
        "open"
    );


    setTimeout(
        typeLetter,
        800
    );
}


function typeLetter() {

    if (
        letterIndex >=
        letterMessage.length
    ) {

        setTimeout(
            () => {

                letterNextArea
                    .classList
                    .remove("hidden");

            },
            700
        );

        return;
    }


    const character =
        letterMessage[
            letterIndex
        ];


    if (
        character === "\n"
    ) {

        letterText.innerHTML +=
            "<br>";

    } else {

        letterText.innerHTML +=
            character;

    }


    letterIndex++;


    setTimeout(
        typeLetter,
        35
    );
}


/* =====================================================
   LETTER → PUZZLE
===================================================== */

puzzleStart.addEventListener(
    "click",
    () => {

        showSection(puzzle);

        createPuzzle();

    }
);


/* =====================================================
   PUZZLE
===================================================== */

let selectedPiece = null;

let puzzleSolved = false;


const correctOrder = [
    0, 1, 2,
    3, 4, 5,
    6, 7, 8
];


function createPuzzle() {

    puzzleBoard.innerHTML = "";

    selectedPiece = null;

    puzzleSolved = false;

    puzzleNext.classList.add(
        "hidden"
    );

    puzzleStatus.textContent =
        "قطعات را جابه‌جا کن ❤️";


    let pieces = [
        0, 1, 2,
        3, 4, 5,
        6, 7, 8
    ];


    do {

        shuffle(pieces);

    } while (
        pieces.every(
            (value, index) =>
                value ===
                correctOrder[index]
        )
    );


    pieces.forEach(
        (number, position) => {

            createPuzzlePiece(
                number,
                position
            );

        }
    );
}


/* =====================================================
   CREATE PIECE
===================================================== */

function createPuzzlePiece(
    number,
    position
) {

    const piece =
        document.createElement(
            "div"
        );


    piece.className =
        "puzzle-piece";


    piece.dataset.number =
        number;


    piece.dataset.position =
        position;


    /*
        جای تصویر هر قطعه
    */

    const row =
        Math.floor(number / 3);

    const column =
        number % 3;


    piece.style.backgroundPosition =
        `${column * 50}% ${row * 50}%`;


    piece.addEventListener(
        "click",
        () => {

            handlePieceClick(
                piece
            );

        }
    );


    puzzleBoard.appendChild(
        piece
    );
}


/* =====================================================
   CLICK PIECE
===================================================== */

function handlePieceClick(piece) {

    if (puzzleSolved) {
        return;
    }


    if (!selectedPiece) {

        selectedPiece = piece;

        piece.classList.add(
            "selected"
        );

        puzzleStatus.textContent =
            "حالا قطعه دوم را انتخاب کن.";

        return;
    }


    if (
        selectedPiece === piece
    ) {

        piece.classList.remove(
            "selected"
        );

        selectedPiece = null;

        puzzleStatus.textContent =
            "قطعات را انتخاب کن.";

        return;
    }


    swapPieces(
        selectedPiece,
        piece
    );


    selectedPiece.classList.remove(
        "selected"
    );


    selectedPiece = null;


    checkPuzzle();
}


/* =====================================================
   SWAP
===================================================== */

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


    updatePieceImage(
        first,
        Number(secondNumber)
    );


    updatePieceImage(
        second,
        Number(firstNumber)
    );
}


/* =====================================================
   UPDATE IMAGE
===================================================== */

function updatePieceImage(
    piece,
    number
) {

    const row =
        Math.floor(number / 3);

    const column =
        number % 3;


    piece.style.backgroundPosition =
        `${column * 50}% ${row * 50}%`;
}


/* =====================================================
   CHECK
===================================================== */

function checkPuzzle() {

    const pieces =
        Array.from(
            puzzleBoard.children
        );


    const current =
        pieces.map(
            piece =>
                Number(
                    piece.dataset.number
                )
        );


    const solved =
        current.every(
            (value, index) =>
                value ===
                correctOrder[index]
        );


    if (!solved) {

        puzzleStatus.textContent =
            "هنوز درست نشده... ادامه بده ❤️";

        return;
    }


    puzzleSolved = true;


    puzzleStatus.innerHTML =
        "🎉 پازل کامل شد!";


    puzzleNext.classList.remove(
        "hidden"
    );


    pieces.forEach(
        piece => {

            piece.style.cursor =
                "default";

        }
    );


    createSmallHearts();
}


/* =====================================================
   SHUFFLE
===================================================== */

function shuffle(array) {

    for (
        let i = array.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() *
                (i + 1)
            );


        [
            array[i],
            array[j]
        ] = [
            array[j],
            array[i]
        ];
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
   BIG HEARTS
===================================================== */

function createHearts() {

    for (
        let i = 0;
        i < 50;
        i++
    ) {

        const heart =
            document.createElement(
                "div"
            );


        heart.innerHTML =
            "♥";


        heart.style.position =
            "fixed";


        heart.style.left =
            Math.random() *
            100 +
            "vw";


        heart.style.bottom =
            "-40px";


        heart.style.fontSize =
            10 +
            Math.random() *
            25 +
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
            Math.random() *
            3500;


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
                duration,

                easing:
                    "ease-out"
            }
        );


        setTimeout(
            () => {
                heart.remove();
            },
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
        i < 20;
        i++
    ) {

        const heart =
            document.createElement(
                "div"
            );


        heart.innerHTML =
            "♥";


        heart.style.position =
            "fixed";


        heart.style.left =
            Math.random() *
            100 +
            "vw";


        heart.style.top =
            Math.random() *
            100 +
            "vh";


        heart.style.color =
            "#ff4da6";


        heart.style.fontSize =
            "20px";


        heart.style.pointerEvents =
            "none";


        heart.style.zIndex =
            "9999";


        document.body.appendChild(
            heart
        );


        heart.animate(

            [
                {
                    transform:
                        "scale(.2)",

                    opacity: 0
                },

                {
                    transform:
                        "scale(1.5)",

                    opacity: 1
                },

                {
                    transform:
                        "scale(.2)",

                    opacity: 0
                }
            ],

            {
                duration: 1200
            }
        );


        setTimeout(
            () => {
                heart.remove();
            },
            1200
        );

    }
}