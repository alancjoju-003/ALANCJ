// State management - in-memory (no localStorage due to sandbox)
let currentTheme = 'light';

// Typing Effect
const typingText = document.getElementById('typingText');
const text = ["Full Stack Developer", "Web Designer", "Creative Problem Solver"];
let i = 0, j = 0, currentText = "", isDeleting = false;

function typeEffect() {
  currentText = text[i];
  const display = document.getElementById("typingText");
  
  if (!isDeleting && j < currentText.length) {
    display.textContent = currentText.substring(0, j + 1);
    j++;
    setTimeout(typeEffect, 100);
  } else if (isDeleting && j > 0) {
    display.textContent = currentText.substring(0, j - 1);
    j--;
    setTimeout(typeEffect, 60);
  } else {
    if (!isDeleting) {
      isDeleting = true;
      setTimeout(typeEffect, 1000);
    } else {
      isDeleting = false;
      i = (i + 1) % text.length;
      setTimeout(typeEffect, 200);
    }
  }
}

// Start typing effect when page loads
window.addEventListener('load', () => {
  setTimeout(typeEffect, 500);
});

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.querySelector('.theme-icon');

themeToggle.addEventListener('click', () => {
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
  themeIcon.textContent = currentTheme === 'light' ? '🌙' : '☀️';
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// Smooth Scroll for Navigation Links
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    
    // Close mobile menu if open
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
  });
});

// Active Navigation Highlighting
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Intersection Observer for Scroll Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
      
      // Animate progress bars when skills section is visible
      if (entry.target.classList.contains('skill-card')) {
        const progressFill = entry.target.querySelector('.progress-fill');
        if (progressFill) {
          setTimeout(() => {
            progressFill.style.width = progressFill.style.getPropertyValue('--width');
          }, 300);
        }
      }
    }
  });
}, observerOptions);

// Observe all elements with animate-on-scroll class
const animatedElements = document.querySelectorAll('.animate-on-scroll');
animatedElements.forEach(el => observer.observe(el));

// Contact Form Validation and Submission
const contactForm = document.getElementById('contactForm');
const submitBtn = contactForm.querySelector('.submit-btn');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Get form values
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  
  // Reset errors
  document.querySelectorAll('.form-error').forEach(error => error.textContent = '');
  
  let isValid = true;
  
  // Validate name
  if (name === '') {
    showError('name', 'Please enter your name');
    isValid = false;
  }
  
  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === '') {
    showError('email', 'Please enter your email');
    isValid = false;
  } else if (!emailRegex.test(email)) {
    showError('email', 'Please enter a valid email');
    isValid = false;
  }
  
  // Validate message
  if (message === '') {
    showError('message', 'Please enter a message');
    isValid = false;
  } else if (message.length < 10) {
    showError('message', 'Message should be at least 10 characters');
    isValid = false;
  }
  
  if (isValid) {
    // Show loading state
    submitBtn.classList.add('loading');
    
    // Simulate form submission
    setTimeout(() => {
      submitBtn.classList.remove('loading');
      alert('Thank you! Your message has been sent successfully.');
      contactForm.reset();
    }, 2000);
  }
});

function showError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const errorElement = field.parentElement.querySelector('.form-error');
  if (errorElement) {
    errorElement.textContent = message;
  }
  field.style.borderColor = '#ff6b6b';
  
  // Reset border color on input
  field.addEventListener('input', () => {
    field.style.borderColor = 'rgba(108, 99, 255, 0.2)';
    errorElement.textContent = '';
  }, { once: true });
}

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 500) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Initialize progress bars to 0
const progressBars = document.querySelectorAll('.progress-fill');
progressBars.forEach(bar => {
  bar.style.width = '0%';
});

// Add stagger delay to project cards and skill cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
  card.style.setProperty('--delay', `${index * 0.1}s`);
});

const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach((card, index) => {
  card.style.setProperty('--delay', `${index * 0.15}s`);
});

// Prevent default behavior on dummy links
const dummyLinks = document.querySelectorAll('a[href="#"]');
dummyLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    if (link.getAttribute('href') === '#') {
      e.preventDefault();
    }
  });
});

console.log('Portfolio website loaded successfully! 🚀');