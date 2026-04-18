document.addEventListener('DOMContentLoaded', function() {
    function getParticleColor() {
        return getComputedStyle(document.body).getPropertyValue('--particle-color').trim();
    }

    // ── Particles ──────────────────────────────────────────────────────────────
    particlesJS('particles-js', {
        "particles": {
            "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": getParticleColor() },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.5, "random": false },
            "size": { "value": 3, "random": true },
            "line_linked": { "enable": true, "distance": 150, "color": getParticleColor(), "opacity": 0.4, "width": 1 },
            "move": { "enable": true, "speed": 6, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
        },
        "interactivity": {
            "detect_on": "window",
            "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
            "modes": { "repulse": { "distance": 100, "duration": 0.4 }, "push": { "particles_nb": 4 } }
        },
        "retina_detect": true
    });

    // ── Image / Video hover ────────────────────────────────────────────────────
    const container = document.querySelector('.image-container');
    const video = document.querySelector('.header-video');

    container.addEventListener('mouseenter', () => {
        video.currentTime = 0;
        video.play();
    });
    container.addEventListener('mouseleave', () => {
        video.pause();
    });

    // ── Theme toggle ───────────────────────────────────────────────────────────
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        localStorage.setItem('theme', body.classList.contains('light-mode') ? 'light' : 'dark');
    });

    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light-mode');
    }

    // ── Typewriter effect ──────────────────────────────────────────────────────
    const titles = ["Data Analytics Student", "AWS Certified", "Python Developer", "BI Developer"];
    let titleIndex = 0, charIndex = 0, isDeleting = false;

    function typeWriter() {
        const el = document.querySelector('header h4');
        const current = titles[titleIndex];
        el.textContent = isDeleting
            ? current.substring(0, charIndex--)
            : current.substring(0, charIndex++);

        if (!isDeleting && charIndex === current.length + 1) {
            setTimeout(() => isDeleting = true, 1500);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
        }
        setTimeout(typeWriter, isDeleting ? 50 : 100);
    }
    typeWriter();

    // ── Scroll-triggered fade/slide-in ─────────────────────────────────────────
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('animate-visible'), i * 100);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('article').forEach(el => {
        el.classList.add('animate-hidden');
        fadeObserver.observe(el);
    });

    // ── Animated counters ──────────────────────────────────────────────────────
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseFloat(el.dataset.target);
                const duration = 1500;
                const steps = 60;
                const stepTime = duration / steps;
                const increment = target / steps;
                let current = 0;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        el.textContent = target.toFixed(1);
                        clearInterval(timer);
                    } else {
                        el.textContent = current.toFixed(1);
                    }
                }, stepTime);
                counterObserver.unobserve(el);
            }
        });
    });
    document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

    // ── Cert card tilt ─────────────────────────────────────────────────────────
    document.querySelectorAll('.swiper-slide').forEach(slide => {
        slide.style.transformStyle = 'preserve-3d';
        slide.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = slide.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;
            slide.style.transition = 'transform 0.1s ease';
            slide.style.transform = `perspective(600px) rotateY(${x * 15}deg) rotateX(${y * -15}deg) scale(1.03)`;
        });
        slide.addEventListener('mouseleave', () => {
            slide.style.transition = 'transform 0.4s ease';
            slide.style.transform = '';
        });
    });

    const icons = document.querySelectorAll('.header-container i');

    icons.forEach(icon => {
        icon.addEventListener('mousemove', (e) => {
            const rect = icon.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            icon.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'translate(0, 0)';
        });
    });

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        const bar = document.getElementById('scroll-progress');
        if (bar) bar.style.width = scrolled + '%';
    });
});

let certSwiper;

function handleCertLayout() {
    const isDesktop = window.innerWidth >= 1024;

    if (isDesktop) {
        if (certSwiper) {
            certSwiper.destroy(true, true);
            certSwiper = undefined;
        }
        // Allow tilt to overflow on desktop
        document.querySelector('.swiper').style.overflow = 'visible';
        document.querySelector('.swiper-wrapper').style.overflow = 'visible';
    } else {
        // Restore hidden for Swiper to work on mobile
        document.querySelector('.swiper').style.overflow = '';
        document.querySelector('.swiper-wrapper').style.overflow = '';

        if (!certSwiper) {
            certSwiper = new Swiper('.swiper', {
                loop: true,
                slidesPerView: 1,
                spaceBetween: 40,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                keyboard: { enabled: true },
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', handleCertLayout);

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(handleCertLayout, 150);
});