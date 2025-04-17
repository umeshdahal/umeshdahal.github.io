document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Typing effect on hero title
    const heroTitleElement = document.querySelector('.hero-title');
    const heroTitleText = "Hi, I'm [Your Name]"; // Replace with your name
    let charIndex = 0;

    function type() {
        if (charIndex < heroTitleText.length) {
            heroTitleElement.textContent += heroTitleText.charAt(charIndex);
            charIndex++;
            setTimeout(type, 100); // Adjust typing speed here
        }
    }

    type();

    // Animated skill bars
    const skillListItems = document.querySelectorAll('.skill-list li');
    function animateSkills() {
        skillListItems.forEach(item => {
            const skillLevel = item.dataset.level;
            item.style.setProperty('--skill-level', `${skillLevel}%`);
            item.classList.add('animate-skill');
        });
    }

    // Scroll-based animations for sections
    const fadeinSections = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, {
        threshold: 0.2 // Adjust threshold as needed
    });

    fadeinSections.forEach(section => {
        observer.observe(section);
    });

    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme === 'dark') {
        body.classList.add('dark-theme');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        const newTheme = body.classList.contains('dark-theme') ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
    });

    // Animate skills on scroll (alternative to immediate animation)
    function checkSkillsVisibility() {
        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            const rect = skillsSection.getBoundingClientRect();
            if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                animateSkills();
                window.removeEventListener('scroll', checkSkillsVisibility); // Animate only once
            }
        }
    }

    window.addEventListener('scroll', checkSkillsVisibility);
    checkSkillsVisibility(); // Check on initial load
});