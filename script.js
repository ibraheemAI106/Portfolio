document.addEventListener('DOMContentLoaded', () => {

    /* ==============================================
       Mobile Navigation Toggle
    ============================================== */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li a');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    /* ==============================================
       Sticky Navbar with Scroll
    ============================================== */
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* ==============================================
       Active Nav Link Highlighting
    ============================================== */
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                document.querySelectorAll('.nav-links li a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { rootMargin: '-50% 0px -50% 0px', threshold: 0 });

    sections.forEach(section => sectionObserver.observe(section));

    /* ==============================================
       Premium Scroll Animations (Staggered)
    ============================================== */
    const animatedElements = document.querySelectorAll('.section-title, .about-text, .service-card, .portfolio-card, .skill-tag, .contact-info, .glass-form');
    
    // Add staggered delays for grid children
    const grids = document.querySelectorAll('.services-grid, .portfolio-grid, .skills-grid');
    grids.forEach(grid => {
        Array.from(grid.children).forEach((child, index) => {
            child.style.animationDelay = `${index * 0.15}s`;
        });
    });

    animatedElements.forEach(el => el.classList.add('animate'));

    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -50px 0px', threshold: 0.1 });

    animatedElements.forEach(el => animationObserver.observe(el));

    /* ==============================================
       Floating Elements Mouse Parallax
    ============================================== */
    document.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth - e.pageX * 2) / 90;
        const y = (window.innerHeight - e.pageY * 2) / 90;
        document.querySelectorAll('.circle').forEach(circle => {
            circle.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    /* ==============================================
       Contact Form Submission (Mock)
    ============================================== */
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            
            btn.textContent = 'Sending...';
            btn.style.opacity = '0.8';
            
            setTimeout(() => {
                btn.textContent = 'Message Sent!';
                btn.style.backgroundColor = '#25D366';
                btn.style.color = 'white';
                
                contactForm.reset();
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.backgroundColor = ''; 
                    btn.style.color = '';
                    btn.style.opacity = '1';
                }, 3000);
            }, 1500);
        });
    }
});
