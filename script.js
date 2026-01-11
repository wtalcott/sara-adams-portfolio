// Dark Mode Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to light
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
    body.setAttribute('data-theme', 'dark');
}

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Scroll Animations
const fadeElements = document.querySelectorAll('.fade-in');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

fadeElements.forEach(element => {
    fadeObserver.observe(element);
});

// Skill Bar Animation
const skillLevels = document.querySelectorAll('.skill-level');

const skillObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.style.width;
            entry.target.style.setProperty('--target-width', width);
            entry.target.style.width = '0';

            // Trigger reflow
            entry.target.offsetHeight;

            entry.target.classList.add('animate');
            entry.target.style.width = width;
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

skillLevels.forEach(skill => {
    skillObserver.observe(skill);
});

// Lightbox for Gallery
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const caption = item.getAttribute('data-caption');

        if (img) {
            lightboxImg.src = img.src;
            lightboxImg.alt = caption;
            lightboxCaption.textContent = caption;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
    }
});

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact form handling (basic - shows alert, would need backend for real submission)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');

        // Show success message (in production, you'd send this to a server)
        alert(`Thank you, ${name}! Your message has been received. Sara will get back to you soon.`);
        contactForm.reset();
    });
}

// GeoCities Easter Egg - Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.code === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateGeoCities();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

// Also activate by clicking the logo 5 times
let logoClicks = 0;
let logoClickTimer;
const logo = document.querySelector('.logo');

if (logo) {
    logo.addEventListener('click', (e) => {
        e.preventDefault();
        logoClicks++;

        clearTimeout(logoClickTimer);
        logoClickTimer = setTimeout(() => {
            logoClicks = 0;
        }, 2000);

        if (logoClicks >= 5) {
            activateGeoCities();
            logoClicks = 0;
        }
    });
}

function activateGeoCities() {
    const currentTheme = document.body.getAttribute('data-theme');

    if (currentTheme === 'geocities') {
        // Turn off GeoCities mode
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.body.setAttribute('data-theme', savedTheme);
        localStorage.removeItem('geocities');
    } else {
        // Activate GeoCities mode
        document.body.setAttribute('data-theme', 'geocities');
        localStorage.setItem('geocities', 'true');

        // Play a fun alert
        alert('🚧 WELCOME TO 1999! 🚧\n\nGeoCities mode activated!\n\n(Click logo 5 times or use Konami code again to exit)');
    }
}

// Check if GeoCities was previously activated
if (localStorage.getItem('geocities') === 'true') {
    document.body.setAttribute('data-theme', 'geocities');
}
