/**
 * SAYANJALI NEXUS - Animations Module
 * Scroll-triggered animations and advanced effects
 */

class AnimationsManager {
    constructor() {
        this.observedElements = new Map();
        this.scrollAnimations = [];
        this.mousePosition = { x: 0, y: 0 };
        
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupMouseTracker();
        this.setupParallaxEffects();
        this.setupCounterAnimations();
        this.setupRevealAnimations();
    }

    /**
     * Setup Scroll Animations
     */
    setupScrollAnimations() {
        const animationElements = document.querySelectorAll('[data-animation]');
        
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const animation = entry.target.getAttribute('data-animation');
                    entry.target.classList.add(animation);
                    
                    // Remove observer after animation
                    const delay = entry.target.getAttribute('data-animation-delay') || 0;
                    setTimeout(() => {
                        animationObserver.unobserve(entry.target);
                    }, parseInt(delay) + 1000);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });

        animationElements.forEach(el => {
            animationObserver.observe(el);
        });
    }

    /**
     * Mouse Position Tracker for Effects
     */
    setupMouseTracker() {
        document.addEventListener('mousemove', (e) => {
            this.mousePosition.x = e.clientX / window.innerWidth;
            this.mousePosition.y = e.clientY / window.innerHeight;
            
            // Apply mouse-based effects
            this.applyMouseEffects();
        });
    }

    /**
     * Apply Mouse-Based Effects
     */
    applyMouseEffects() {
        const lightEffects = document.querySelectorAll('[data-mouse-effect]');
        
        lightEffects.forEach(element => {
            const x = this.mousePosition.x * 100;
            const y = this.mousePosition.y * 100;
            
            element.style.setProperty('--mouse-x', `${x}%`);
            element.style.setProperty('--mouse-y', `${y}%`);
        });
    }

    /**
     * Parallax Effects
     */
    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        window.addEventListener('scroll', () => {
            parallaxElements.forEach(element => {
                const speed = element.getAttribute('data-parallax') || 0.5;
                const yPos = window.pageYOffset * speed;
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    /**
     * Counter Animations for Numbers
     */
    setupCounterAnimations() {
        const counters = document.querySelectorAll('[data-counter]');
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    const target = parseInt(entry.target.getAttribute('data-counter'));
                    const duration = parseInt(entry.target.getAttribute('data-counter-duration')) || 1000;
                    
                    this.animateCounter(entry.target, target, duration);
                    entry.target.classList.add('counted');
                }
            });
        }, {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    /**
     * Animate Counter Number
     */
    animateCounter(element, target, duration) {
        const start = 0;
        const startTime = Date.now();
        
        const animate = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / duration, 1);
            const value = Math.floor(progress * target);
            
            element.textContent = value + (element.getAttribute('data-counter-suffix') || '');
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.textContent = target + (element.getAttribute('data-counter-suffix') || '');
            }
        };
        
        animate();
    }

    /**
     * Reveal Animations
     */
    setupRevealAnimations() {
        const revealElements = document.querySelectorAll('[data-reveal]');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const revealType = entry.target.getAttribute('data-reveal');
                    const delay = entry.target.getAttribute('data-reveal-delay') || 0;
                    
                    setTimeout(() => {
                        entry.target.classList.add(`reveal-${revealType}`);
                        entry.target.classList.add('revealed');
                    }, parseInt(delay));
                    
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });

        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
    }
}

/**
 * Advanced Effects Manager
 */
class EffectsManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupGlassEffect();
        this.setupGradientAnimation();
        this.setupPulseEffect();
        this.setupGlowEffect();
        this.setupHoverEffects();
    }

    /**
     * Enhanced Glass Effect with Backdrop
     */
    setupGlassEffect() {
        const glassElements = document.querySelectorAll('.glass-effect');
        
        glassElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.backdropFilter = 'blur(15px)';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.backdropFilter = 'blur(10px)';
            });
        });
    }

    /**
     * Gradient Animation
     */
    setupGradientAnimation() {
        const gradientElements = document.querySelectorAll('.gradient-text');
        
        gradientElements.forEach(element => {
            const gradient = window.getComputedStyle(element).backgroundImage;
            let angle = 0;
            
            setInterval(() => {
                angle += 1;
                element.style.backgroundPosition = `${angle}% center`;
            }, 50);
        });
    }

    /**
     * Pulse Effect
     */
    setupPulseEffect() {
        const pulseElements = document.querySelectorAll('[data-pulse]');
        
        pulseElements.forEach(element => {
            setInterval(() => {
                const pulse = element.getAttribute('data-pulse');
                element.style.animation = `pulse-effect 2s ease-in-out infinite`;
            }, 2000);
        });
    }

    /**
     * Glow Effect
     */
    setupGlowEffect() {
        const glowElements = document.querySelectorAll('[data-glow]');
        
        glowElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.boxShadow = `0 0 30px rgba(0, 217, 255, 0.6), inset 0 0 30px rgba(0, 217, 255, 0.2)`;
                element.style.transition = 'box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.boxShadow = `0 8px 24px rgba(0, 217, 255, 0.15)`;
            });
        });
    }

    /**
     * Enhanced Hover Effects
     */
    setupHoverEffects() {
        const hoverElements = document.querySelectorAll('[data-hover-effect]');
        
        hoverElements.forEach(element => {
            const effect = element.getAttribute('data-hover-effect');
            
            element.addEventListener('mouseenter', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                element.style.setProperty('--hover-x', `${x}px`);
                element.style.setProperty('--hover-y', `${y}px`);
                element.classList.add(`hover-${effect}`);
            });
            
            element.addEventListener('mouseleave', () => {
                element.classList.remove(`hover-${effect}`);
            });
        });
    }
}

/**
 * Text Animation Manager
 */
class TextAnimationManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupTypingAnimation();
        this.setupGlitchEffect();
        this.setupRevealText();
    }

    /**
     * Typing Animation
     */
    setupTypingAnimation() {
        const typingElements = document.querySelectorAll('[data-typing]');
        
        typingElements.forEach(element => {
            const text = element.getAttribute('data-typing');
            const speed = parseInt(element.getAttribute('data-typing-speed')) || 100;
            
            this.typeText(element, text, speed);
        });
    }

    /**
     * Type Text
     */
    typeText(element, text, speed) {
        let index = 0;
        element.textContent = '';
        
        const type = () => {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(type, speed);
            }
        };
        
        type();
    }

    /**
     * Glitch Effect
     */
    setupGlitchEffect() {
        const glitchElements = document.querySelectorAll('[data-glitch]');
        
        glitchElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.applyGlitch(element);
            });
        });
    }

    /**
     * Apply Glitch Effect
     */
    applyGlitch(element) {
        const originalText = element.textContent;
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let glitchCount = 0;
        
        const glitch = () => {
            let text = '';
            for (let i = 0; i < originalText.length; i++) {
                if (Math.random() > 0.8) {
                    text += chars.charAt(Math.floor(Math.random() * chars.length));
                } else {
                    text += originalText.charAt(i);
                }
            }
            element.textContent = text;
            
            if (glitchCount < 10) {
                glitchCount++;
                setTimeout(glitch, 50);
            } else {
                element.textContent = originalText;
            }
        };
        
        glitch();
    }

    /**
     * Reveal Text on Scroll
     */
    setupRevealText() {
        const revealTextElements = document.querySelectorAll('[data-reveal-text]');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.revealText(entry.target);
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        });

        revealTextElements.forEach(el => {
            revealObserver.observe(el);
        });
    }

    /**
     * Reveal Text Animation
     */
    revealText(element) {
        const text = element.textContent;
        element.innerHTML = '';
        
        const words = text.split(' ');
        
        words.forEach((word, wordIndex) => {
            const wordSpan = document.createElement('span');
            wordSpan.style.display = 'inline-block';
            wordSpan.style.overflow = 'hidden';
            
            word.split('').forEach((char, charIndex) => {
                const charSpan = document.createElement('span');
                charSpan.textContent = char;
                charSpan.style.display = 'inline-block';
                charSpan.style.animation = `revealChar 0.5s ease-out forwards`;
                charSpan.style.animationDelay = `${(wordIndex * 0.5) + (charIndex * 0.05)}s`;
                wordSpan.appendChild(charSpan);
            });
            
            element.appendChild(wordSpan);
            if (wordIndex < words.length - 1) {
                element.appendChild(document.createTextNode(' '));
            }
        });
    }
}

/**
 * Initialize All Animation Managers
 */
document.addEventListener('DOMContentLoaded', () => {
    const animationsManager = new AnimationsManager();
    const effectsManager = new EffectsManager();
    const textAnimationManager = new TextAnimationManager();
    
    // Make managers available globally
    window.AnimationsManager = AnimationsManager;
    window.EffectsManager = EffectsManager;
    window.TextAnimationManager = TextAnimationManager;
    
    console.log('Animation managers initialized');
});

/**
 * Performance-Optimized Animation Loop
 */
class OptimizedAnimationLoop {
    constructor() {
        this.animationFrameId = null;
        this.isRunning = false;
        this.callbacks = [];
    }

    add(callback) {
        this.callbacks.push(callback);
        if (!this.isRunning) {
            this.start();
        }
    }

    remove(callback) {
        const index = this.callbacks.indexOf(callback);
        if (index > -1) {
            this.callbacks.splice(index, 1);
        }
        if (this.callbacks.length === 0) {
            this.stop();
        }
    }

    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.loop();
    }

    stop() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
        this.isRunning = false;
    }

    loop() {
        this.callbacks.forEach(callback => {
            try {
                callback();
            } catch (error) {
                console.error('Animation loop error:', error);
            }
        });
        
        if (this.isRunning) {
            this.animationFrameId = requestAnimationFrame(() => this.loop());
        }
    }
}

// Export animation loop
window.OptimizedAnimationLoop = OptimizedAnimationLoop;
const animationLoop = new OptimizedAnimationLoop();
window.animationLoop = animationLoop;

console.log('Animations module loaded');
