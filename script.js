/* ============================================
   HAVARD UNIVERSITY - INTERACTIVE EXCELLENCE
   Est. 2014 - JavaScript for the Discerning Scholar
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

    // ============================================
    // SMOOTH SCROLL WITH OFFSET
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.main-nav').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all content boxes and cards
    document.querySelectorAll('.content-box, .legend-card, .team-card, .stat').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add visible styles
    const style = document.createElement('style');
    style.textContent = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // ============================================
    // SCORING TABLE HOVER EFFECTS
    // ============================================
    document.querySelectorAll('.scoring-table tbody tr').forEach(row => {
        row.addEventListener('mouseenter', function() {
            const points = this.querySelector('.points');
            if (points) {
                points.style.transform = 'scale(1.1)';
                points.style.transition = 'transform 0.2s ease';
            }
        });
        row.addEventListener('mouseleave', function() {
            const points = this.querySelector('.points');
            if (points) {
                points.style.transform = 'scale(1)';
            }
        });
    });

    // ============================================
    // RANDOM MOTIVATIONAL FOOTER MESSAGE
    // ============================================
    const quotes = [
        "Where touchdowns go to die.",
        "In Hester we trust.",
        "Interceptions are just unexpected gifts.",
        "Every missed PAT costs a friendship.",
        "Return yards are the currency of kings.",
        "Blake Bortles understood the assignment.",
        "Havard: Because Harvard was too mainstream.",
        "Six seasons of pure, distilled chaos.",
        "The only league where being bad is good."
    ];

    const footerNote = document.querySelector('.footer-note');
    if (footerNote) {
        // Change quote on click
        footerNote.style.cursor = 'pointer';
        footerNote.title = 'Click for more wisdom';
        footerNote.addEventListener('click', function() {
            const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
            this.textContent = randomQuote;
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'fadeIn 0.3s ease';
            }, 10);
        });
    }

    // ============================================
    // DYNASTY COUNTER ANIMATION
    // ============================================
    function animateCounter(element, target, duration = 1000) {
        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    }

    // Observe dynasty stats for counter animation
    const dynastyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(num => {
                    const target = parseInt(num.textContent);
                    if (!isNaN(target) && !num.dataset.animated) {
                        num.dataset.animated = 'true';
                        animateCounter(num, target, 800);
                    }
                });
                dynastyObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const dynastySection = document.querySelector('.dynasty-stats');
    if (dynastySection) {
        dynastyObserver.observe(dynastySection);
    }

    // ============================================
    // EASTER EGG: KONAMI CODE
    // ============================================
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', function(e) {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateHavardMode();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    // Pre-define Konami code animations once (no per-activation style leaks)
    const konamiStyle = document.createElement('style');
    konamiStyle.textContent = `
        @keyframes fadeOut {
            to { opacity: 0; }
        }
        @keyframes confetti-fall {
            to {
                transform: translateY(100vh) rotate(var(--confetti-rotation));
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(konamiStyle);

    function activateHavardMode() {
        document.body.style.transition = 'all 0.5s ease';

        // Create celebration overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(139, 0, 0, 0.9);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            animation: fadeIn 0.5s ease;
        `;
        overlay.innerHTML = `
            <div style="text-align: center; color: #C9A227; font-family: 'Cinzel', serif;">
                <div style="font-size: 5rem; margin-bottom: 1rem;">🏈🏆🏈</div>
                <h1 style="font-size: 3rem; margin-bottom: 1rem; letter-spacing: 5px;">HAVARD EXCELLENCE</h1>
                <p style="font-size: 1.5rem; font-style: italic;">You have proven yourself worthy.</p>
                <p style="font-size: 1rem; margin-top: 2rem; color: #999;">Click anywhere to return to your studies.</p>
            </div>
        `;

        overlay.addEventListener('click', function() {
            this.style.animation = 'fadeOut 0.3s ease forwards';
            setTimeout(() => this.remove(), 300);
        });

        document.body.appendChild(overlay);

        // Confetti effect
        for (let i = 0; i < 50; i++) {
            createConfetti(overlay);
        }
    }

    function createConfetti(container) {
        const confetti = document.createElement('div');
        const emojis = ['🏈', '⭐', '🏆', '👑', '🎉'];
        confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        const rotation = Math.floor(Math.random() * 720) + 'deg';
        const duration = (Math.random() * 3 + 2).toFixed(2);
        confetti.style.cssText = `
            position: absolute;
            top: -20px;
            left: ${Math.random() * 100}%;
            font-size: ${Math.random() * 20 + 10}px;
            --confetti-rotation: ${rotation};
            animation: confetti-fall ${duration}s linear forwards;
            opacity: ${Math.random() * 0.5 + 0.5};
        `;

        container.appendChild(confetti);
    }

    // ============================================
    // CONSOLE EASTER EGG
    // ============================================
    console.log('%c🏈 HAVARD UNIVERSITY 🏈', 'font-size: 24px; font-weight: bold; color: #8B0000; text-shadow: 2px 2px #C9A227;');
    console.log('%cVeritas Per Kickers Et Return Yards', 'font-size: 14px; font-style: italic; color: #1E3A5F;');
    console.log('%c2014 - 2019 | Forever in our hearts', 'font-size: 12px; color: #666;');
    console.log('%cTip: Try the Konami Code for a surprise...', 'font-size: 10px; color: #999;');

});
