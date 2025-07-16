// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('active');
    } else {
        backToTopBtn.classList.remove('active');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Form Submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const formValues = Object.fromEntries(formData.entries());
    
    // Here you would typically send the data to a server
    console.log('Form submitted:', formValues);
    
    // Show success message
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Message Sent!';
    submitBtn.style.backgroundColor = '#4BB543'; // Green color for success
    
    // Reset form after 3 seconds
    setTimeout(() => {
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.style.backgroundColor = '';
    }, 3000);
});

// Skill Animation on Scroll
const skillItems = document.querySelectorAll('.skill-item');

function animateSkills() {
    skillItems.forEach(item => {
        const progressBar = item.querySelector('.skill-progress');
        const percentage = progressBar.parentElement.querySelector('span:last-child').textContent;
        
        if (isElementInViewport(item)) {
            progressBar.style.width = percentage;
            progressBar.style.opacity = '1';
        }
    });
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

// Initialize skill animations
window.addEventListener('load', animateSkills);
window.addEventListener('scroll', animateSkills);

// Dark/Light Mode Toggle (Bonus Feature)
const modeToggle = document.createElement('div');
modeToggle.id = 'modeToggle';
modeToggle.innerHTML = '<i class="fas fa-moon"></i>';
document.body.appendChild(modeToggle);

modeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    
    if (document.body.classList.contains('light-mode')) {
        modeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        // Add light mode styles
        document.documentElement.style.setProperty('--dark-color', '#f0f4f8');
        document.documentElement.style.setProperty('--white-color', '#1a1e26');
        document.documentElement.style.setProperty('--text-color', '#333a4d');
        document.documentElement.style.setProperty('--card-bg', '#ffffff');
    } else {
        modeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        // Revert to dark mode
        document.documentElement.style.setProperty('--dark-color', '#1a1e26');
        document.documentElement.style.setProperty('--white-color', '#e6e9ed');
        document.documentElement.style.setProperty('--text-color', '#d1d6e0');
        document.documentElement.style.setProperty('--card-bg', '#242a36');
    }
});

// Project Filtering (Bonus Feature)
const projectCards = document.querySelectorAll('.project-card');

function filterProjects(category) {
    projectCards.forEach(card => {
        if (category === 'all' || card.querySelector('.project-tech').textContent.toLowerCase().includes(category)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Add this to your HTML if you want filtering:
// <div class="project-filters">
//     <button onclick="filterProjects('all')">All</button>
//     <button onclick="filterProjects('java')">Java</button>
//     <button onclick="filterProjects('python')">Python</button>
//     <button onclick="filterProjects('web')">Web</button>
// </div>

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('section, .project-card, .education-item').forEach(section => {
    observer.observe(section);
});

// Typewriter Effect for Hero Section (Optional)
const heroTitle = document.querySelector('.hero-text h1');
if (heroTitle) {
    const originalText = heroTitle.textContent;
    const words = originalText.split(' ');
    heroTitle.textContent = '';
    
    let i = 0;
    const typeWriter = setInterval(() => {
        if (i < words.length) {
            heroTitle.textContent += words[i] + ' ';
            i++;
        } else {
            clearInterval(typeWriter);
        }
    }, 200);
}
