// ====================================
// ДВИЖЕНИЕ ПЕРВЫХ — MAIN SCRIPT
// ====================================

document.addEventListener('DOMContentLoaded', () => {

    // --- NAVBAR SCROLL ---
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // --- MOBILE BURGER MENU ---
    const burger = document.getElementById('burger');
    const navLinks = document.getElementById('navLinks');
    if (burger && navLinks) {
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            const isOpen = navLinks.classList.contains('open');
            burger.setAttribute('aria-expanded', isOpen);
            // Animate burger
            const spans = burger.querySelectorAll('span');
            if (isOpen) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!burger.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('open');
                burger.querySelectorAll('span').forEach(s => {
                    s.style.transform = '';
                    s.style.opacity = '';
                });
            }
        });

        // Close on link click
        navLinks.querySelectorAll('.nav__link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                burger.querySelectorAll('span').forEach(s => {
                    s.style.transform = '';
                    s.style.opacity = '';
                });
            });
        });
    }

    // --- SCROLL REVEAL ---
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    // Apply reveal animation to key elements
    const revealSelectors = [
        '.about-card',
        '.direction-card',
        '.news-card--featured',
        '.news-card--compact',
        '.activity-card',
        '.news-article',
        '.team-card',
        '.doc-card',
        '.benefit-card',
        '.step',
        '.contact-item',
        '.about-main__text',
        '.about-main__image',
    ];

    revealSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach((el, i) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`;
            revealObserver.observe(el);
        });
    });

    // --- NEWS FILTER ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const newsArticles = document.querySelectorAll('.news-article');

    if (filterBtns.length && newsArticles.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('filter-btn--active'));
                btn.classList.add('filter-btn--active');

                const filter = btn.dataset.filter;
                newsArticles.forEach(article => {
                    if (filter === 'all' || article.dataset.category === filter) {
                        article.style.display = '';
                        setTimeout(() => { article.style.opacity = '1'; article.style.transform = 'translateY(0)'; }, 50);
                    } else {
                        article.style.opacity = '0';
                        article.style.transform = 'translateY(10px)';
                        setTimeout(() => { article.style.display = 'none'; }, 300);
                    }
                });
            });
        });
    }

    // --- SMOOTH SCROLL FOR ANCHOR LINKS ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h') || '72');
                window.scrollTo({
                    top: target.getBoundingClientRect().top + window.scrollY - offset - 20,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- DIRECTION CARDS HOVER EFFECT ---
    document.querySelectorAll('.direction-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.borderLeft = '2px solid var(--red)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.borderLeft = '';
        });
    });

});
