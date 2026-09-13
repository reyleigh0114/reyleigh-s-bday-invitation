// ================================
// OPENING ANIMATION
// ================================
window.addEventListener("load", () => {
    const fill = document.getElementById("loadingFill");
    const text = document.getElementById("loadingText");
    const opening = document.getElementById("opening");

    let progress = 0;

    const loader = setInterval(() => {
        progress += Math.floor(Math.random() * 5) + 2;

        if (progress >= 100) {
            progress = 100;
            clearInterval(loader);
        }

        fill.style.width = progress + "%";
        text.textContent = `Preparing the voyage... ${progress}%`;

        if (progress === 100) {
            text.textContent = "WELCOME, PIRATE! ⚓";

            setTimeout(() => {
                opening.classList.add("done");
            }, 900);
        }
    }, 80);
});

// ================================
// COUNTDOWN
// ================================
function startCountdown() {
    const birthdayDate = new Date("January 14, 2027 15:00:00").getTime();

    const countdown = setInterval(() => {
        const now = new Date().getTime();
        const difference = birthdayDate - now;

        if (difference <= 0) {
            clearInterval(countdown);

            setTime("00", "00", "00", "00");
            document.querySelector(".countdown").innerHTML =
                "<h3>🎉 IT'S PARTY TIME! 🎉</h3>";

            launchConfetti(180);
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
            (difference % (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        );
        const minutes = Math.floor(
            (difference % (1000 * 60 * 60)) /
            (1000 * 60)
        );
        const seconds = Math.floor(
            (difference % (1000 * 60)) / 1000
        );

        setTime(
            String(days).padStart(2, "0"),
            String(hours).padStart(2, "0"),
            String(minutes).padStart(2, "0"),
            String(seconds).padStart(2, "0")
        );
    }, 1000);
}

function setTime(days, hours, minutes, seconds) {
    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
}

startCountdown();

// ================================
// SMOOTH SCROLL
// ================================
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({
        behavior: "smooth"
    });
}

// ================================
// JOURNEY MAP
// ================================
const journeyData = [
    {
        number: "01",
        title: "THE JOURNEY BEGINS",
        text: "Every great adventure starts with a single step. Today we celebrate the beginning of an incredible journey."
    },
    {
        number: "02",
        title: "SAILING THE SEAS",
        text: "Growing up means discovering new places, learning new things, making friends, and creating memories along the way."
    },
    {
        number: "03",
        title: "TODAY IS THE DAY",
        text: "The crew gathers together to celebrate another amazing year. This island is filled with laughter, love, food and fun!"
    },
    {
        number: "04",
        title: "THE NEXT ADVENTURE",
        text: "A new chapter is waiting. Keep dreaming big, stay brave, and chase every adventure that makes your heart happy."
    }
];

function showJourney(index) {
    const story = document.getElementById("journeyStory");
    const stops = document.querySelectorAll(".map-stop");
    const item = journeyData[index];

    stops.forEach((stop, i) => {
        stop.classList.toggle("active", i === index);
    });

    story.innerHTML = `
        <p class="story-number">${item.number}</p>
        <h3>${item.title}</h3>
        <p>${item.text}</p>
    `;

    story.animate(
        [
            { opacity: 0, transform: "translateY(12px)" },
            { opacity: 1, transform: "translateY(0)" }
        ],
        { duration: 450, easing: "ease-out" }
    );
}

// ================================
// SECRET LETTER
// ================================
function openLetter() {
    const letter = document.getElementById("letter");
    const content = document.getElementById("letterContent");

    letter.classList.add("opened");

    setTimeout(() => {
        content.classList.add("show");
        launchConfetti(35);
    }, 450);
}

// ================================
// TREASURE CHEST
// ================================
function openTreasure() {
    const chest = document.getElementById("chest");
    const result = document.getElementById("treasureResult");
    const hint = document.getElementById("chestHint");

    if (chest.classList.contains("open")) return;

    chest.classList.add("open");
    hint.textContent = "THE TREASURE HAS BEEN FOUND! 🏴‍☠️";

    setTimeout(() => {
        result.classList.add("show");
        launchConfetti(100);
    }, 500);
}

// ================================
// MUSIC
// ================================
function toggleMusic() {
    const audio = document.getElementById("birthdayMusic");
    const button = document.getElementById("musicBtn");

    if (!audio) return;

    if (audio.paused) {
        audio.play()
            .then(() => {
                button.textContent = "🔊";
                button.title = "Pause birthday music";
            })
            .catch((error) => {
                console.warn("Birthday music could not start:", error);
                button.textContent = "🎵";
            });
    } else {
        audio.pause();
        button.textContent = "🔇";
        button.title = "Play birthday music";
    }
}

window.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById("birthdayMusic");
    const button = document.getElementById("musicBtn");

    if (!audio || !button) return;

    button.textContent = "🔇";
    button.title = "Play birthday music";

    audio.addEventListener("play", () => {
        button.textContent = "🔊";
    });

    audio.addEventListener("pause", () => {
        button.textContent = "🔇";
    });

    audio.addEventListener("error", () => {
        button.textContent = "⚠️";
        button.title = "Music file could not be loaded";
    });
});

// ================================
// CELEBRATION
// ================================
function celebrate() {
    launchConfetti(220);

    const button = document.querySelector(".final-content .main-btn");
    button.textContent = "🎉 PARTY TIME! 🎉";

    setTimeout(() => {
        button.textContent = "LET'S CELEBRATE! 🎉";
    }, 3000);
}

// ================================
// CONFETTI
// ================================
function launchConfetti(amount = 80) {
    const container = document.getElementById("confetti-container");

    const colors = [
        "#38bdf8",
        "#60a5fa",
        "#2563eb",
        "#a78bfa",
        "#facc15",
        "#ffffff"
    ];

    for (let i = 0; i < amount; i++) {
        const piece = document.createElement("div");
        piece.className = "confetti";

        piece.style.left = Math.random() * 100 + "vw";
        piece.style.background =
            colors[Math.floor(Math.random() * colors.length)];

        piece.style.setProperty(
            "--x",
            (Math.random() * 280 - 140) + "px"
        );

        piece.style.animationDuration =
            (2.2 + Math.random() * 3.5) + "s";

        piece.style.animationDelay =
            Math.random() * .5 + "s";

        container.appendChild(piece);

        setTimeout(() => piece.remove(), 6500);
    }
}
/* =========================================
   BIRTHDAY BOY SCROLL ANIMATION
========================================= */

window.addEventListener("DOMContentLoaded", () => {
    const birthdayCard = document.querySelector(".profile-card");

    if (!birthdayCard) return;

    const birthdayObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    birthdayCard.classList.add("birthday-visible");

                    // Small celebration when Birthday Boy appears
                    setTimeout(() => {
                        launchConfetti(25);
                    }, 700);

                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.25
        }
    );

    birthdayObserver.observe(birthdayCard);
});
