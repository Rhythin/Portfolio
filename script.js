document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 10px 30px -10px rgba(0,0,0,0.5)';
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.background = 'rgba(15, 23, 42, 0.9)';
        }
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing after it's visible to only animate once
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Add 'fade-in' class to elements we want to animate
    const animatedElements = document.querySelectorAll('.section-title, .about-text, .stat-card, .timeline-item, .skill-category, .project-card');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Custom logic to handle the class addition for the styles above
    // Since we set inline styles, we need to clear them when visible or handle via class
    // Let's refine the observer callback to just set opacity/transform
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, observerOptions);
    animatedElements.forEach(el => revealObserver.observe(el));

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Optional: Animate hamburger icon to X
        hamburger.classList.toggle('toggle');
    });
});
