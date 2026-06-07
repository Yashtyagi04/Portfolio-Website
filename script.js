document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       Mobile Navigation Menu Toggle
       ========================================================================== */
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            navToggle.classList.toggle('active');
            
            // Toggle hamburger icon animation
            const bars = navToggle.querySelectorAll('.bar');
            if (navToggle.classList.contains('active')) {
                bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    }

    // Close menu when a link is clicked (mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
                navToggle.classList.remove('active');
                
                const bars = navToggle.querySelectorAll('.bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    });

    /* ==========================================================================
       Sticky Header and Active Nav Link Highlighting
       ========================================================================== */
    const header = document.querySelector('.header');
    const sections = document.querySelectorAll('section');

    const handleScroll = () => {
        const scrollPos = window.scrollY;

        // Sticky Header Class
        if (scrollPos > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active Link Highlighting
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    /* ==========================================================================
       Typing Text Animation Effect (Hero Section)
       ========================================================================== */
    const typingSpan = document.getElementById('typing-text');
    const roles = ["Computer Science Student", "Full-Stack Web Developer", "Developer focused on AI/ML", "Creative Problem Solver"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    const typeEffect = () => {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            charIndex--;
            typingSpeed = 50; // Deleting speed is faster
        } else {
            charIndex++;
            typingSpeed = 100; // Standard typing speed
        }

        typingSpan.textContent = currentRole.substring(0, charIndex);

        // Word completed typing
        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingSpeed = 1500; // Pause at full word
        } 
        // Word completed deleting
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // Pause before typing next word
        }

        setTimeout(typeEffect, typingSpeed);
    };

    if (typingSpan) {
        setTimeout(typeEffect, 1000);
    }

    /* ==========================================================================
       Intersection Observer for Entry Scroll Animations
       ========================================================================== */
    const animateElements = document.querySelectorAll('.animate-on-scroll');

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target); // Stop tracking once animated
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters view
    });

    animateElements.forEach(el => scrollObserver.observe(el));

    /* ==========================================================================
       Projects Filter Dynamic System
       ========================================================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all filter buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                // Set scale out transition first, then hide/show
                card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                
                if (filterValue === 'all' || filterValue === category) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    /* ==========================================================================
       Contact Form Validation & Client Simulation
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('form-submit-btn');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Clear former status
            formStatus.textContent = '';
            formStatus.className = 'form-status';

            let isValid = true;

            const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
            
            inputs.forEach(input => {
                const parent = input.parentElement;
                
                // Clear existing error states
                parent.classList.remove('error');

                // Check text input empty states
                if (!input.value.trim()) {
                    parent.classList.add('error');
                    isValid = false;
                }
                
                // Check Email format explicitly
                if (input.type === 'email' && input.value.trim()) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(input.value.trim())) {
                        parent.classList.add('error');
                        isValid = false;
                    }
                }
            });

            if (isValid) {
                // Modify submit button UI to show "sending" state
                submitBtn.disabled = true;
                const originalBtnContent = submitBtn.innerHTML;
                submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-circle-notch fa-spin icon-right"></i>';

                // Simulate API call delay (1.5 seconds)
                setTimeout(() => {
                    formStatus.textContent = 'Message sent successfully! Thank you for reaching out.';
                    formStatus.classList.add('success');
                    
                    // Reset fields
                    contactForm.reset();

                    // Restore submit button
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnContent;
                }, 1500);
            } else {
                formStatus.textContent = 'Please correct the errors in the highlighted fields.';
                formStatus.classList.add('error');
            }
        });

        // Dynamic input listener to clear error formatting on keystroke
        contactForm.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', () => {
                const parent = input.parentElement;
                if (parent.classList.contains('error')) {
                    parent.classList.remove('error');
                }
            });
        });
    }

});
