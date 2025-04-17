document.addEventListener('DOMContentLoaded', function() {

    const body = document.body;
    const themeToggleButton = document.getElementById('theme-toggle');
    const header = document.getElementById('main-header');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    // --- Theme Toggling ---
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    // Check local storage for saved theme
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    applyTheme(savedTheme);

    // Toggle theme on button click
    themeToggleButton.addEventListener('click', () => {
        const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // --- Header Scroll Effect ---
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > 50) {
            header.classList.add('scrolled'); // Add shadow or other styles
        } else {
            header.classList.remove('scrolled');
        }

        // Optional: Hide header on scroll down, show on scroll up
        // if (scrollTop > lastScrollTop && scrollTop > header.offsetHeight){
        //     // Scroll Down
        //     header.style.top = `-${header.offsetHeight}px`;
        // } else {
        //     // Scroll Up
        //     header.style.top = "0";
        // }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
    }, { passive: true });


    // --- Smooth Scrolling for Nav Links ---
    document.querySelectorAll('nav a[href^="#"], #mobile-menu a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Close mobile menu if open
                if (mobileMenu.classList.contains('open')) {
                    mobileMenu.classList.remove('open');
                    mobileMenu.classList.add('hidden'); // Use Tailwind hidden
                    // Update icon if needed (e.g., back to bars)
                    mobileMenuButton.innerHTML = '<i class="fa-solid fa-bars"></i>';
                }

                // Calculate offset dynamically if header height changes
                const headerOffset = header.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // --- Mobile Menu Toggle ---
    mobileMenuButton.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.toggle('open');
        mobileMenu.classList.toggle('hidden'); // Toggle Tailwind hidden

        // Optional: Change icon to X when open
        if (isOpen) {
            mobileMenuButton.innerHTML = '<i class="fa-solid fa-times"></i>';
        } else {
            mobileMenuButton.innerHTML = '<i class="fa-solid fa-bars"></i>';
        }
    });


    // --- Typing Effect ---
    const subtitleElement = document.querySelector('.hero-subtitle');
    // --- IMPORTANT: Update this text! ---
    const textToType = "A passionate [Your Profession] specializing in creating modern web experiences.";
    let charIndex = 0;
    let isDeleting = false;
    let typingTimeout;

    function typeEffect() {
        const currentText = textToType; // Using a single phrase for simplicity now
        subtitleElement.textContent = currentText.substring(0, charIndex);
        subtitleElement.style.borderColor = 'currentColor'; // Use text color for caret

        if (charIndex < currentText.length) {
            charIndex++;
            typingTimeout = setTimeout(typeEffect, 100); // Adjust typing speed
        } else {
            // Finished typing
            subtitleElement.style.borderRight = 'none'; // Remove caret after typing
            // Or make it blink indefinitely:
            // subtitleElement.classList.add('animate-typing'); // Add blinking caret animation class
        }
    }

    // Start typing effect after a short delay
    setTimeout(typeEffect, 500);


    // --- Intersection Observer for Animations ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const skillBars = document.querySelectorAll('.skill-bar');

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                // Apply general fade/slide animation (using Tailwind classes)
                if (element.classList.contains('experience-item')) {
                    element.classList.add('animate-slide-in-left'); // Example specific animation
                } else {
                    element.classList.add('animate-fade-in-up');
                }
                element.classList.add('is-visible'); // Can use this for CSS targeting if needed


                // Trigger skill bar animation if it's a skill item's container
                if (element.hasAttribute('data-skill')) {
                    const bar = element.querySelector('.skill-bar');
                    const level = element.dataset.level;
                    if (bar && level) {
                        bar.style.setProperty('--skill-level', `${level}%`);
                        bar.style.width = `var(--skill-level)`; // Start animation
                        // bar.classList.add('animate-progress-bar'); // Or trigger via class if keyframes are set up
                    }
                }

                observer.unobserve(element); // Animate only once
            }
        });
    };

    const observerOptions = {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    animatedElements.forEach(el => observer.observe(el));

    // --- Footer Current Year ----------
    //testing
    //testing
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

});
