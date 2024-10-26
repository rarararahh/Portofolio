// Function to handle page transitions
const showPage = (pageId) => {
  // Hide all pages
  document.querySelectorAll('.page').forEach(page => {
      page.classList.remove('active');
  });

  // Show selected page
  const selectedPage = document.getElementById(pageId);
  if (selectedPage) {
      selectedPage.classList.add('active');
  }

  // Close mobile menu if open
  navLinks.classList.remove('active');
  menuToggle.classList.remove('active');

  // Smooth scroll to top
  window.scrollTo({
      top: 0,
      behavior: 'smooth'
  });
};

// Handle header visibility on scroll
let lastScroll = 0;
const header = document.querySelector('.header');

const handleScroll = () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > lastScroll && currentScroll > 100) {
      header.style.transform = 'translateY(-100%)';
      header.classList.add('nav-up');
  } else {
      header.style.transform = 'translateY(0)';
      header.classList.remove('nav-up');
  }
  lastScroll = currentScroll;
};

// Initialize header scroll behavior
window.addEventListener('scroll', handleScroll);

// Mobile menu functionality
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  menuToggle.classList.toggle('active');
});

// Close menu when clicking a link or outside
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuToggle.classList.remove('active');
  });
});

document.addEventListener('click', (e) => {
  if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('active');
      menuToggle.classList.remove('active');
  }
});

// Handle navigation links
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', (e) => {
      e.preventDefault();
      const pageId = link.getAttribute('href').substring(1);
      showPage(pageId);
      history.pushState(null, '', `#${pageId}`);
  });
});

// Handle browser back/forward buttons
window.addEventListener('popstate', () => {
  const pageId = window.location.hash.substring(1) || 'Home';
  showPage(pageId);
});

// Show correct page on initial load
document.addEventListener('DOMContentLoaded', () => {
  const pageId = window.location.hash.substring(1) || 'Home';
  showPage(pageId);
});

// Add smooth scrolling to all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
          targetElement.scrollIntoView({
              behavior: 'smooth'
          });
      }
  });
});

// Add intersection observer for animation
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
      }
  });
}, observerOptions);

// Observe all content cards
document.querySelectorAll('.content-card').forEach(card => {
  observer.observe(card);
});

// Initialize active nav link highlighting
const updateActiveNavLink = () => {
  const currentHash = window.location.hash || '#Home';
  document.querySelectorAll('.nav-links a').forEach(link => {
      if (link.getAttribute('href') === currentHash) {
          link.classList.add('active');
      } else {
          link.classList.remove('active');
      }
  });
};

// Update active nav link on page load and hash change
window.addEventListener('load', updateActiveNavLink);
window.addEventListener('hashchange', updateActiveNavLink);

// React component rendering setup
import React from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root')); // Ensure there's an element with id "root" in HTML
root.render(<div>Your content here</div>);
 
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactForm');
  
  form.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      // Mengambil nilai dari form
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      // Membuat format pesan
      const currentDate = new Date().toLocaleString();
      const formattedMessage = `
Date: ${currentDate}
Name: ${name}
Email: ${email}
Message: ${message}
----------------------------------------
`;
      
      try {
          // Membuat objek FormData untuk mengirim data
          const formData = new FormData();
          formData.append('message', formattedMessage);
          
          // Mengirim data ke PHP handler
          const response = await fetch('save_message.php', {
              method: 'POST',
              body: formData
          });
          
          if (response.ok) {
              showNotification('Message sent successfully!', 'success');
              form.reset();
          } else {
              showNotification('Failed to send message. Please try again.', 'error');
          }
      } catch (error) {
          showNotification('An error occurred. Please try again later.', 'error');
          console.error('Error:', error);
      }
  });
  
  // Fungsi untuk menampilkan notifikasi
  function showNotification(message, type) {
      // Membuat elemen notifikasi jika belum ada
      let notification = document.querySelector('.notification');
      if (!notification) {
          notification = document.createElement('div');
          notification.className = 'notification';
          document.body.appendChild(notification);
      }
      
      // Mengatur pesan dan tipe notifikasi
      notification.textContent = message;
      notification.className = `notification ${type}`;
      notification.style.display = 'block';
      
      // Menghilangkan notifikasi setelah 3 detik
      setTimeout(() => {
          notification.style.display = 'none';
      }, 3000);
  }
});