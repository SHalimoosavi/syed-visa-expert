/**
 * SAYANJALI NEXUS - Main Application JavaScript
 * Interactive functionality and DOM manipulation
 */

class SayanjaliApp {
    constructor() {
        this.navItems = document.querySelectorAll('.nav-link');
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.navbar = document.getElementById('navbar');
        this.faqItems = document.querySelectorAll('.faq-item');
        
        this.init();
    }

    init() {
        this.setupMenuToggle();
        this.setupNavigation();
        this.setupFAQ();
        this.setupScrollBehavior();
        this.setupIntersectionObserver();
        this.setupScrollReveal();
    }

    /**
     * Mobile Menu Toggle
     */
    setupMenuToggle() {
        if (!this.hamburger) return;

        this.hamburger.addEventListener('click', () => {
            this.hamburger.classList.toggle('active');
            this.navMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        this.navItems.forEach(item => {
            item.addEventListener('click', () => {
                this.hamburger.classList.remove('active');
                this.navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            const isClickInsideMenu = this.navMenu.contains(e.target);
            const isClickOnHamburger = this.hamburger.contains(e.target);
            
            if (!isClickInsideMenu && !isClickOnHamburger && this.navMenu.classList.contains('active')) {
                this.hamburger.classList.remove('active');
                this.navMenu.classList.remove('active');
            }
        });
    }

    /**
     * Navigation Link Active State
     */
    setupNavigation() {
        this.navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                this.navItems.forEach(link => link.classList.remove('active'));
                item.classList.add('active');
            });
        });

        // Update active nav item based on scroll position
        window.addEventListener('scroll', () => {
            this.updateActiveNavItem();
        });
    }

    /**
     * Update active navigation item based on current section
     */
    updateActiveNavItem() {
        const sections = document.querySelectorAll('section');
        let currentSectionId = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= sectionTop - 200) {
                currentSectionId = section.getAttribute('id');
            }
        });

        this.navItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentSectionId)) {
                link.classList.add('active');
            }
        });
    }

    /**
     * FAQ Accordion Functionality
     */
    setupFAQ() {
        this.faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all items
                this.faqItems.forEach(faqItem => {
                    faqItem.classList.remove('active');
                });
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    }

    /**
     * Setup Scroll Behavior for Navigation
     */
    setupScrollBehavior() {
        window.addEventListener('scroll', () => {
            // Add class to navbar on scroll
            if (window.pageYOffset > 50) {
                this.navbar.classList.add('scrolled');
                this.navbar.style.borderColor = 'rgba(0, 217, 255, 0.2)';
                this.navbar.style.background = 'rgba(15, 15, 30, 0.95)';
            } else {
                this.navbar.classList.remove('scrolled');
                this.navbar.style.borderColor = 'rgba(0, 217, 255, 0.1)';
                this.navbar.style.background = 'rgba(15, 15, 30, 0.8)';
            }

            // Update scroll progress
            this.updateScrollProgress();
        });
    }

    /**
     * Update Scroll Progress Bar
     */
    updateScrollProgress() {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.pageYOffset / docHeight) * 100;
        
        let progressBar = document.querySelector('.scroll-progress');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'scroll-progress';
            document.body.insertBefore(progressBar, document.body.firstChild);
        }
        
        progressBar.style.width = scrolled + '%';
    }

    /**
     * Intersection Observer for Scroll Animations
     */
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: [0, 0.1, 0.5],
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    
                    // Add staggered animation for grid items
                    if (entry.target.classList.contains('help-card') ||
                        entry.target.classList.contains('choose-card') ||
                        entry.target.classList.contains('article-card')) {
                        entry.target.style.animationPlayState = 'running';
                    }
                }
            });
        }, observerOptions);

        // Observe all sections and cards
        document.querySelectorAll('section, .help-card, .choose-card, .article-card, .expertise-card, .faq-item, .timeline-item').forEach(section => {
            observer.observe(section);
        });
    }

    /**
     * Scroll Reveal Animation
     */
    setupScrollReveal() {
        const elements = document.querySelectorAll('[data-scroll-reveal]');
        
        if (elements.length === 0) return;

        const revealOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -100px 0px'
        };

        const revealOnScroll = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, revealOptions);

        elements.forEach(element => revealOnScroll.observe(element));
    }

    /**
     * Smooth scroll to section
     */
    smoothScroll(target) {
        const element = document.querySelector(target);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    /**
     * Track user interactions for analytics
     */
    trackInteraction(eventName, eventData = {}) {
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, eventData);
        }
        console.log(`Event: ${eventName}`, eventData);
    }
}

/**
 * Utility Functions
 */
const Utilities = {
    /**
     * Format phone number
     */
    formatPhoneNumber(phone) {
        return phone.replace(/(\d{2})(\d{5})(\d{5})/, '+$1 $2 $3');
    },

    /**
     * Check if element is in viewport
     */
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    /**
     * Copy text to clipboard
     */
    copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            console.log('Copied to clipboard:', text);
            this.showNotification('Copied to clipboard!');
        }).catch(err => {
            console.error('Could not copy text:', err);
        });
    },

    /**
     * Show notification
     */
    showNotification(message, duration = 3000) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(0, 217, 255, 0.2);
            border: 1px solid rgba(0, 217, 255, 0.5);
            color: #00d9ff;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 2000;
            font-size: 14px;
            animation: slide-in-right 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slide-out-right 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, duration);
    },

    /**
     * Get URL parameter
     */
    getUrlParameter(name) {
        const url = new URL(window.location);
        return url.searchParams.get(name);
    },

    /**
     * Debounce function
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * Throttle function
     */
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

/**
 * Analytics and Tracking
 */
const Analytics = {
    /**
     * Track button clicks
     */
    trackButtonClick(buttonText) {
        console.log('Button clicked:', buttonText);
        if (typeof gtag !== 'undefined') {
            gtag('event', 'button_click', {
                'button_text': buttonText
            });
        }
    },

    /**
     * Track link clicks
     */
    trackLinkClick(href) {
        console.log('Link clicked:', href);
        if (typeof gtag !== 'undefined') {
            gtag('event', 'link_click', {
                'link_url': href
            });
        }
    },

    /**
     * Track section views
     */
    trackSectionView(sectionId) {
        console.log('Section viewed:', sectionId);
        if (typeof gtag !== 'undefined') {
            gtag('event', 'section_view', {
                'section_id': sectionId
            });
        }
    },

    /**
     * Track WhatsApp clicks
     */
    trackWhatsAppClick() {
        console.log('WhatsApp clicked');
        if (typeof gtag !== 'undefined') {
            gtag('event', 'whatsapp_click', {
                'phone_number': '+918008123605'
            });
        }
    }
};

/**
 * Performance Monitoring
 */
const Performance = {
    /**
     * Log Core Web Vitals
     */
    monitorWebVitals() {
        // Largest Contentful Paint
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach((entry) => {
                    console.log('LCP:', entry.renderTime || entry.loadTime);
                });
            });
            observer.observe({ entryTypes: ['largest-contentful-paint'] });
        }

        // Cumulative Layout Shift
        let cls = 0;
        const clsObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (!entry.hadRecentInput) {
                    cls += entry.value;
                    console.log('CLS:', cls);
                }
            }
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });

        // First Input Delay
        if ('PerformanceObserver' in window) {
            const fidObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach((entry) => {
                    console.log('FID:', entry.processingDuration);
                });
            });
            fidObserver.observe({ entryTypes: ['first-input'] });
        }
    }
};

/**
 * Enhanced Button Interactions
 */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize main app
    const app = new SayanjaliApp();

    // Enhanced button interactions with visual feedback
    document.querySelectorAll('.btn').forEach(button => {
        // Click event
        button.addEventListener('click', (e) => {
            // Create ripple effect
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.width = '0';
            ripple.style.height = '0';
            ripple.style.position = 'absolute';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.5)';
            ripple.style.pointerEvents = 'none';
            ripple.style.animation = `ripple 0.6s ease-out`;
            
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
            
            Analytics.trackButtonClick(button.textContent);
        });

        // Hover feedback
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
    });

    // Enhanced link click tracking
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            Analytics.trackLinkClick(link.href);
        });
    });

    // WhatsApp click tracking with haptic feedback
    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
        link.addEventListener('click', () => {
            Analytics.trackWhatsAppClick();
            // Haptic feedback if available
            if (navigator.vibrate) {
                navigator.vibrate(50);
            }
        });
    });

    // Section view tracking
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                Analytics.trackSectionView(entry.target.id);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('section[id]').forEach(section => {
        sectionObserver.observe(section);
    });

    // Monitor Web Vitals
    Performance.monitorWebVitals();

    // Log page load time
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page Load Time:', pageLoadTime + 'ms');
        
        // Performance feedback
        if (pageLoadTime < 2000) {
            console.log('✅ Excellent page load performance!');
        }
    });

    // Setup external link tracking
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.addEventListener('click', () => {
            console.log('External link clicked:', link.href);
        });
    });

    // Accessibility: Focus management
    document.addEventListener('keydown', (e) => {
        // Escape key closes mobile menu
        if (e.key === 'Escape') {
            const hamburger = document.getElementById('hamburger');
            const navMenu = document.querySelector('.nav-menu');
            if (hamburger?.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu?.classList.remove('active');
            }
        }
        
        // Tab key navigation with focus ring
        if (e.key === 'Tab') {
            document.body.classList.add('focus-visible-enabled');
        }
    });

    // Prevent form submission if forms exist
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('Form submitted:', new FormData(form));
            Utilities.showNotification('Thank you! We will be in touch shortly.');
        });
    });

    // Smooth scroll enhancement
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // Add focus visible class to body when using keyboard
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('focus-visible-enabled');
    });

    console.log('SAYANJALI NEXUS - Application initialized with premium enhancements');
});

/**
 * Window Load Event
 */
window.addEventListener('load', () => {
    console.log('Page fully loaded');
    
    // Remove loading states
    document.body.classList.remove('loading');
    
    // Enable animations
    document.querySelectorAll('[data-animate]').forEach(el => {
        el.classList.add('animate');
    });
});

/**
 * Unload Event
 */
window.addEventListener('beforeunload', () => {
    console.log('User is leaving the page');
});

/**
 * Visibility Change Event
 */
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('Page is hidden');
    } else {
        console.log('Page is visible');
    }
});

/**
 * Export for use in other scripts
 */
window.SayanjaliApp = SayanjaliApp;
window.Utilities = Utilities;
window.Analytics = Analytics;
window.Performance = Performance;
