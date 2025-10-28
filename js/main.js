// support and association help ignored Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {+
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Form submissions
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.mission-item, .committee-member, .activity-item, .card').forEach(el => {
        observer.observe(el);
    });
    
    // Counter animation for stats
    animateCounters();
    
    // Gallery lightbox
    initGalleryLightbox();
});

// Form submission handler
function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Show loading state
    if (submitButton) {
        const originalText = submitButton.textContent;
        submitButton.innerHTML = '<span class="loading"></span> Sending...';
        submitButton.disabled = true;
        
        // Simulate form submission (replace with actual backend integration)
        setTimeout(() => {
            showNotification('Thank you for your message! We will get back to you soon.', 'success');
            form.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    }
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()">&times;</button>
        </div>
    `;
    
    // Add notification styles if not already present
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: white;
                padding: 15px;
                border-radius: 8px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                z-index: 9999;
                max-width: 350px;
                animation: slideInRight 0.3s ease;
            }
            .notification.success { border-left: 4px solid #4CAF50; }
            .notification.error { border-left: 4px solid #f44336; }
            .notification.info { border-left: 4px solid #2196F3; }
            .notification-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .notification button {
                background: none;
                border: none;
                font-size: 18px;
                cursor: pointer;
                margin-left: 10px;
            }
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Animate counters
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    const counterObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

// Gallery lightbox functionality
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    
    galleryItems.forEach(img => {
        img.addEventListener('click', function() {
            openLightbox(this.src, this.alt);
        });
    });
}

function openLightbox(src, alt) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <img src="${src}" alt="${alt}">
            <button class="lightbox-close" onclick="closeLightbox()">&times;</button>
        </div>
        <div class="lightbox-overlay" onclick="closeLightbox()"></div>
    `;
    
    // Add lightbox styles if not already present
    if (!document.querySelector('#lightbox-styles')) {
        const style = document.createElement('style');
        style.id = 'lightbox-styles';
        style.textContent = `
            .lightbox {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                animation: fadeIn 0.3s ease;
            }
            .lightbox-content {
                position: relative;
                max-width: 90%;
                max-height: 90%;
            }
            .lightbox img {
                max-width: 100%;
                max-height: 100%;
                object-fit: contain;
            }
            .lightbox-close {
                position: absolute;
                top: -40px;
                right: -40px;
                background: none;
                border: none;
                color: white;
                font-size: 30px;
                cursor: pointer;
            }
            .lightbox-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.querySelector('.lightbox');
    if (lightbox) {
        lightbox.remove();
        document.body.style.overflow = 'auto';
    }
}

// Donation amount selection
function selectDonationAmount(amount) {
    const customInput = document.querySelector('#custom-amount');
    const amountButtons = document.querySelectorAll('.amount-btn');
    
    // Remove active class from all buttons
    amountButtons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to selected button or clear if custom
    if (amount === 'custom') {
        customInput.focus();
    } else {
        document.querySelector(`[data-amount="${amount}"]`).classList.add('active');
        customInput.value = amount;
    }
}

// Search functionality
function initSearch() {
    const searchInput = document.querySelector('#search-input');
    const searchResults = document.querySelector('#search-results');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            if (query.length > 2) {
                performSearch(query);
            } else {
                hideSearchResults();
            }
        });
    }
}

function performSearch(query) {
    // This would typically search through your content
    // For demo purposes, we'll show some sample results
    const sampleResults = [
        { title: 'Health Care Program', url: 'activities.html#health-care' },
        { title: 'Education Initiative', url: 'activities.html#education' },
        { title: 'Volunteer Opportunities', url: 'work-with-us.html' },
        { title: 'Donation Information', url: 'donate.html' }
    ];
    
    const filteredResults = sampleResults.filter(result => 
        result.title.toLowerCase().includes(query)
    );
    
    showSearchResults(filteredResults);
}

function showSearchResults(results) {
    const searchResults = document.querySelector('#search-results');
    if (searchResults) {
        searchResults.innerHTML = results.map(result => `
            <a href="${result.url}" class="search-result-item">
                ${result.title}
            </a>
        `).join('');
        searchResults.style.display = 'block';
    }
}

function hideSearchResults() {
    const searchResults = document.querySelector('#search-results');
    if (searchResults) {
        searchResults.style.display = 'none';
    }
}

// Newsletter subscription
function subscribeNewsletter(email) {
    if (!email || !email.includes('@')) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Simulate newsletter subscription
    showNotification('Thank you for subscribing to our newsletter!', 'success');
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initSearch();
    
    // Newsletter form
    const newsletterForm = document.querySelector('#newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            subscribeNewsletter(email);
            this.reset();
        });
    }
});