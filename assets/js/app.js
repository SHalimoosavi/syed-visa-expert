/* ======================================================
   SYED ALI HASAN MOOSAVI
   EUROPEAN & ARABIAN VISA EXPERT
   MAIN APPLICATION SCRIPT
====================================================== */

/* ==========================================
   SMOOTH SCROLLING
========================================== */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function(e) {

        const target = document.querySelector(
            this.getAttribute("href")
        );

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});

/* ==========================================
   ACTIVE NAVIGATION
========================================== */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 120;

        const sectionHeight =
            section.clientHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY <
            sectionTop + sectionHeight
        ) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            "#" + current
        ) {

            link.classList.add("active");

        }

    });

});

/* ==========================================
   SCROLL REVEAL
========================================== */

function revealElements() {

    const reveals =
        document.querySelectorAll(
            ".card, .faq-item, .step, .about-card"
        );

    reveals.forEach(item => {

        const windowHeight =
            window.innerHeight;

        const elementTop =
            item.getBoundingClientRect().top;

        const revealPoint = 120;

        if (
            elementTop <
            windowHeight - revealPoint
        ) {

            item.classList.add("active");

        }

    });

}

window.addEventListener(
    "scroll",
    revealElements
);

revealElements();

/* ==========================================
   NAVBAR SHRINK EFFECT
========================================== */

const navbar =
    document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {

        navbar.style.padding =
            "0px";

        navbar.style.background =
            "rgba(5,8,22,.95)";

        navbar.style.boxShadow =
            "0 10px 30px rgba(0,0,0,.3)";

    }

    else {

        navbar.style.background =
            "rgba(5,8,22,.8)";

        navbar.style.boxShadow =
            "none";

    }

});

/* ==========================================
   SCROLL PROGRESS BAR
========================================== */

const progressBar =
document.createElement("div");

progressBar.id =
"scroll-progress";

document.body.appendChild(
    progressBar
);

window.addEventListener(
    "scroll",
    () => {

        const scrollTop =
            window.scrollY;

        const docHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const progress =
            (scrollTop / docHeight) * 100;

        progressBar.style.width =
            progress + "%";

    }
);

/* ==========================================
   WHATSAPP BUTTON TRACKING
========================================== */

document
.querySelectorAll(
'a[href*="wa.me"]'
)
.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            console.log(
                "WhatsApp CTA Clicked"
            );

        }
    );

});

/* ==========================================
   HERO TYPING EFFECT
========================================== */

const heroTitle =
document.querySelector(".hero h2");

if(heroTitle){

    const text =
    heroTitle.innerText;

    heroTitle.innerText = "";

    let i = 0;

    function typeEffect(){

        if(i < text.length){

            heroTitle.innerHTML +=
            text.charAt(i);

            i++;

            setTimeout(
                typeEffect,
                50
            );

        }

    }

    setTimeout(
        typeEffect,
        600
    );

}

/* ==========================================
   CONSOLE BRANDING
========================================== */

console.log(
"%cSyed Ali Hasan Moosavi",
"color:#06b6d4;font-size:20px;font-weight:bold;"
);

console.log(
"%cEuropean & Arabian Visa Expert",
"color:#ffffff;font-size:14px;"
);

console.log(
"%cSAYANJALI NEXUS PRIVATE LIMITED",
"color:#94a3b8;font-size:12px;"
);
