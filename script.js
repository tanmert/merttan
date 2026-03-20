/* =============================================
   DAKTİLO EFEKTİ
   ============================================= */
const words = [
    "Harita Mühendisi'yim.",
    "Basketbol Antrenörü'yüm.",
    "Geliştirici'yim."
];

// Her kelime için hangi renk kullanılacak
const wordColors = [
    "#C8A055",  // Harita — Altın
    "#E8622A",  // Basketbol — Turuncu
    "#4ECDC4"   // Yazılım — Teal
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typewriterEl = document.getElementById("typewriter");

function typeEffect() {
    if (!typewriterEl) return;

    const currentWord  = words[wordIndex];
    const currentColor = wordColors[wordIndex];

    if (isDeleting) {
        typewriterEl.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterEl.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    // Aktif rengi uygula
    typewriterEl.style.color = currentColor;

    let speed = isDeleting ? 45 : 90;

    if (!isDeleting && charIndex === currentWord.length) {
        speed = 2200;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 400;
    }

    setTimeout(typeEffect, speed);
}

/* =============================================
   SCROLL REVEAL
   ============================================= */
function initScrollReveal() {
    const targets = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    targets.forEach(el => observer.observe(el));
}

/* =============================================
   NAVBAR — Kaydırmaya göre gölge/boyut
   ============================================= */
function initNavbar() {
    const navbar = document.getElementById("navbar");
    if (!navbar) return;

    window.addEventListener("scroll", () => {
        if (window.scrollY > 60) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }, { passive: true });
}

/* =============================================
   FORM GÖNDER
   ============================================= */
function initForm() {
    const form = document.querySelector(".contact-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const btn = form.querySelector("button[type='submit']");
        const original = btn.textContent;
        btn.textContent = "Gönderildi ✓";
        btn.style.background = "#4ECDC4";
        btn.style.color = "#0C0C0C";
        setTimeout(() => {
            btn.textContent = original;
            btn.style.background = "";
            btn.style.color = "";
            form.reset();
        }, 3000);
    });
}

/* =============================================
   BAŞLAT
   ============================================= */
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(typeEffect, 600);
    initScrollReveal();
    initNavbar();
    initForm();

    // Hero içeriklerini de hemen görünür yap (viewportta başlıyorlar)
    document.querySelectorAll(".hero-section .reveal").forEach(el => {
        setTimeout(() => el.classList.add("visible"), 200);
    });
});
