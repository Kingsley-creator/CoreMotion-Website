// ========================================
// COREMOTION GROUP - COMPLETE JAVASCRIPT
// ========================================

// ===== MOBILE NAVIGATION =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('open');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('open');
        });
    });
}

// ===== HEADER SCROLL EFFECT =====
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (header) {
        if (window.pageYOffset > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

// ===== COUNTER ANIMATION =====
const counters = document.querySelectorAll('.stat-number');

const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000;
    const startTime = performance.now();

    const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(progress * target);
        counter.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target;
        }
    };
    requestAnimationFrame(updateCounter);
};

// Intersection Observer for counters
if (counters.length > 0) {
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                animateCounter(counter);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== PARALLAX EFFECT ON HERO =====
const heroVisual = document.querySelector('.hero-visual');
if (heroVisual) {
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 10;
        const y = (e.clientY / window.innerHeight - 0.5) * 10;
        heroVisual.style.transform = `translate(${x}px, ${y}px)`;
    });
}

// ===== CONTACT FORM HANDLING =====
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        try {
            const formData = new FormData(this);
            const response = await fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                formStatus.className = 'form-status success';
                formStatus.textContent = '✅ Thank you! Your message has been sent. We\'ll get back to you soon.';
                this.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            formStatus.className = 'form-status error';
            formStatus.textContent = '❌ Oops! Something went wrong. Please try again or email us directly.';
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            formStatus.style.display = 'block';

            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 6000);
        }
    });
}

// ===== SERVICE CARD ANIMATIONS =====
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });
});

// ===== REVEAL ANIMATIONS ON SCROLL =====
const revealElements = document.querySelectorAll('.service-card, .why-feature, .testimonial-card, .blog-card, .mv-card, .leader-card');

if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        revealObserver.observe(el);
    });
}

// ===== CONSOLE BRANDING =====
console.log('%c🚀 CoreMotion Group', 'font-size: 24px; font-weight: bold; color: #0066CC;');
console.log('%cTechnology in Motion. Experiences that Connect.', 'font-size: 14px; color: #a0b4d0;');
console.log('%c🌍 Built with ❤️ in Kenya', 'font-size: 12px; color: #00D4FF;');
console.log('%c📧 coremotiongroup.limited@gmail.com', 'font-size: 12px; color: #a0b4d0;');
