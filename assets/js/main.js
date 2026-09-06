document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Header
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');

    if (mobileBtn && navMenu) {
        mobileBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            // Toggle icon between bars and times
            const icon = mobileBtn.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // 3. Removed Swiper Initialization (Hero is now static)

    // 3.5 Initialize Swiper for Testimonials
    if (document.querySelector('.testimonials-slider')) {
        const testimonialsSwiper = new Swiper('.testimonials-slider', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.testimonial-pagination',
                clickable: true,
            },
            breakpoints: {
                // when window width is >= 768px
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30
                },
                // when window width is >= 1024px
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 40
                }
            }
        });
    }

    // 4. Scroll Animation Observer
    const animateElements = document.querySelectorAll('.animate-up');
    
    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                // Trigger reflow to restart animation if needed
                void entry.target.offsetWidth;
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animateElements.forEach(el => {
        // Set initial opacity to 0
        el.style.opacity = '0';
        animationObserver.observe(el);
    });

    // 5. Initialize Vanilla Tilt manually to ensure it hooks 3D
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".feature-card"), {
            max: 20,
            speed: 400,
            glare: true,
            "max-glare": 0.3,
            scale: 1.05
        });
        VanillaTilt.init(document.querySelectorAll(".weltec-feature-card"), {
            max: 15,
            speed: 400,
            glare: true,
            "max-glare": 0.2,
            scale: 1.03
        });
    }
});
