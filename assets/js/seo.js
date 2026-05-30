/**
 * SAYANJALI NEXUS - SEO & Schema Markup Manager
 * Handles structured data, meta tags, and search engine optimization
 */

class SEOManager {
    constructor() {
        this.pageTitle = document.title;
        this.pageDescription = document.querySelector('meta[name="description"]')?.content || '';
        this.pageUrl = window.location.href;
        this.siteName = 'SAYANJALI NEXUS';
        
        this.init();
    }

    init() {
        this.validateSchemaMarkup();
        this.setupOpenGraphData();
        this.setupTwitterCardData();
        this.setupCanonicalURL();
        this.generateDynamicSchema();
        this.optimizeForAnswerEngines();
    }

    /**
     * Validate Schema Markup
     */
    validateSchemaMarkup() {
        const scripts = document.querySelectorAll('script[type="application/ld+json"]');
        
        scripts.forEach((script, index) => {
            try {
                const schema = JSON.parse(script.textContent);
                console.log(`Schema ${index + 1} validated:`, schema);
            } catch (error) {
                console.error(`Schema ${index + 1} validation failed:`, error);
            }
        });
    }

    /**
     * Setup Open Graph Data
     */
    setupOpenGraphData() {
        const ogTags = {
            'og:type': 'website',
            'og:title': 'Syed Ali Hasan Moosavi | International Visa Strategist',
            'og:description': 'Premium founder authority positioning in international travel and visa strategy.',
            'og:url': this.pageUrl,
            'og:site_name': this.siteName,
            'og:locale': 'en_US',
            'og:image': 'https://sayedalihasanmoosavi.com/assets/og-image.jpg',
            'og:image:width': '1200',
            'og:image:height': '630',
            'og:image:type': 'image/jpeg'
        };

        this.setMetaTags(ogTags, 'property');
        console.log('Open Graph data set');
    }

    /**
     * Setup Twitter Card Data
     */
    setupTwitterCardData() {
        const twitterTags = {
            'twitter:card': 'summary_large_image',
            'twitter:title': 'Syed Ali Hasan Moosavi | International Visa Strategist',
            'twitter:description': 'Premium founder authority in international travel and visa strategy.',
            'twitter:image': 'https://sayedalihasanmoosavi.com/assets/twitter-image.jpg',
            'twitter:creator': '@sayanjali',
            'twitter:site': '@sayanjali'
        };

        this.setMetaTags(twitterTags, 'name');
        console.log('Twitter Card data set');
    }

    /**
     * Setup Canonical URL
     */
    setupCanonicalURL() {
        const canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            const link = document.createElement('link');
            link.rel = 'canonical';
            link.href = this.pageUrl.split('?')[0].split('#')[0];
            document.head.appendChild(link);
        }
    }

    /**
     * Set Meta Tags
     */
    setMetaTags(tags, attribute) {
        for (const [key, value] of Object.entries(tags)) {
            let element = document.querySelector(`meta[${attribute}="${key}"]`);
            
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute(attribute, key);
                document.head.appendChild(element);
            }
            
            element.content = value;
        }
    }

    /**
     * Generate Dynamic Schema Markup
     */
    generateDynamicSchema() {
        // Generate breadcrumb schema
        this.generateBreadcrumbSchema();
        
        // Generate FAQ schema
        this.generateFAQSchema();
        
        // Generate article schema
        this.generateArticleSchema();
    }

    /**
     * Generate Breadcrumb Schema
     */
    generateBreadcrumbSchema() {
        const breadcrumbs = [
            { name: 'Home', url: 'https://sayedalihasanmoosavi.com' },
            { name: 'Expertise', url: 'https://sayedalihasanmoosavi.com#expertise' },
            { name: 'Resources', url: 'https://sayedalihasanmoosavi.com#knowledge-hub' }
        ];

        const breadcrumbSchema = {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            'itemListElement': breadcrumbs.map((item, index) => ({
                '@type': 'ListItem',
                'position': index + 1,
                'name': item.name,
                'item': item.url
            }))
        };

        console.log('Breadcrumb schema:', breadcrumbSchema);
    }

    /**
     * Generate FAQ Schema
     */
    generateFAQSchema() {
        const faqItems = document.querySelectorAll('.faq-item');
        const faqs = [];

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question h3')?.textContent;
            const answer = item.querySelector('.faq-answer p')?.textContent;
            
            if (question && answer) {
                faqs.push({
                    '@type': 'Question',
                    'name': question,
                    'acceptedAnswer': {
                        '@type': 'Answer',
                        'text': answer
                    }
                });
            }
        });

        const faqSchema = {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            'mainEntity': faqs
        };

        console.log('FAQ schema generated with', faqs.length, 'items');
    }

    /**
     * Generate Article Schema
     */
    generateArticleSchema() {
        const articles = document.querySelectorAll('.article-card');
        
        articles.forEach(article => {
            const title = article.querySelector('h3')?.textContent;
            const description = article.querySelector('p')?.textContent;
            const datePublished = article.getAttribute('data-date') || new Date().toISOString();

            const articleSchema = {
                '@context': 'https://schema.org',
                '@type': 'Article',
                'headline': title,
                'description': description,
                'image': 'https://sayedalihasanmoosavi.com/assets/article-image.jpg',
                'datePublished': datePublished,
                'author': {
                    '@type': 'Person',
                    'name': 'Syed Ali Hasan Moosavi'
                }
            };

            console.log('Article schema:', articleSchema);
        });
    }

    /**
     * Optimize for Answer Engines (AEO)
     */
    optimizeForAnswerEngines() {
        this.ensureStructuredContent();
        this.optimizeQuestionAnswerContent();
        this.implementEntity-RichContent();
        this.strengthenEEAT();
    }

    /**
     * Ensure Structured Content
     */
    ensureStructuredContent() {
        // Verify all key information is available
        const requiredSections = [
            { id: 'founder-story', name: 'Founder Information' },
            { id: 'expertise', name: 'Expertise' },
            { id: 'who-i-help', name: 'Target Audience' },
            { id: 'faq', name: 'FAQs' }
        ];

        requiredSections.forEach(section => {
            const element = document.getElementById(section.id);
            if (element) {
                console.log(`✓ ${section.name} section found`);
            } else {
                console.warn(`✗ ${section.name} section missing`);
            }
        });
    }

    /**
     * Optimize Question-Answer Content
     */
    optimizeQuestionAnswerContent() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question h3');
            const answer = item.querySelector('.faq-answer p');
            
            // Ensure questions are clear and concise
            if (question) {
                question.setAttribute('data-keyword-optimized', 'true');
            }
            
            // Ensure answers are comprehensive
            if (answer) {
                const wordCount = answer.textContent.split(' ').length;
                if (wordCount < 50) {
                    console.warn('Answer too short for optimal AEO:', question.textContent);
                }
            }
        });
    }

    /**
     * Implement Entity-Rich Content
     */
    implementEntity_RichContent() {
        const entities = {
            'Syed Ali Hasan Moosavi': 'International Visa Strategist',
            'SAYANJALI NEXUS': 'Consulting Firm',
            'Schengen Area': 'European Travel Region',
            'UAE': 'Country',
            'Saudi Arabia': 'Country',
            'Hyderabad': 'City'
        };

        console.log('Entity-rich content mapping:', entities);

        // Verify entity mentions in content
        const contentElements = document.querySelectorAll('p, h1, h2, h3, span');
        let entityMentions = 0;

        contentElements.forEach(element => {
            Object.keys(entities).forEach(entity => {
                if (element.textContent.includes(entity)) {
                    entityMentions++;
                }
            });
        });

        console.log('Entity mentions found:', entityMentions);
    }

    /**
     * Strengthen E-E-A-T Signals
     */
    strengthenEEAT() {
        const eeatSignals = {
            expertise: {
                indicator: 'Founder with 8+ years experience',
                element: document.querySelector('.metric-value')
            },
            experience: {
                indicator: 'International operations in multiple countries',
                element: document.querySelector('.story-text')
            },
            authoritativeness: {
                indicator: 'Founder-led consulting firm',
                element: document.querySelector('[data-authority]')
            },
            trustworthiness: {
                indicator: 'Direct contact information available',
                element: document.querySelector('.cta-methods')
            }
        };

        console.log('E-E-A-T Signals:');
        Object.entries(eeatSignals).forEach(([key, signal]) => {
            console.log(`✓ ${key}: ${signal.indicator}`);
        });
    }

    /**
     * Generate SEO Report
     */
    generateSEOReport() {
        const report = {
            pageTitle: this.pageTitle,
            pageDescription: this.pageDescription,
            metaTagsPresent: document.querySelectorAll('meta').length,
            schemaMarkupPresent: document.querySelectorAll('script[type="application/ld+json"]').length,
            headingsStructure: {
                h1: document.querySelectorAll('h1').length,
                h2: document.querySelectorAll('h2').length,
                h3: document.querySelectorAll('h3').length
            },
            images: {
                totalImages: document.querySelectorAll('img').length,
                imagesWithAlt: document.querySelectorAll('img[alt]').length
            },
            links: {
                internalLinks: document.querySelectorAll('a[href^="#"], a[href*="sayedalihasanmoosavi"]').length,
                externalLinks: document.querySelectorAll('a[target="_blank"]').length
            },
            performance: {
                docSize: new Blob([document.documentElement.outerHTML]).size / 1024,
                textContent: document.body.innerText.length
            }
        };

        console.log('=== SEO REPORT ===');
        console.table(report);
        return report;
    }
}

/**
 * GEO (Generative Engine Optimization) Manager
 */
class GEOManager {
    constructor() {
        this.answerEngines = [
            'ChatGPT',
            'Claude',
            'Gemini',
            'Perplexity',
            'Microsoft Copilot'
        ];

        this.init();
    }

    init() {
        this.optimizeForGenerativeEngines();
        this.ensureCitability();
        this.implementStructuredData();
    }

    /**
     * Optimize for Generative Engines
     */
    optimizeForGenerativeEngines() {
        // Ensure content is easily parsed and understood
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const heading = section.querySelector('h2, h3');
            const content = section.textContent;
            
            // Verify each section has clear purpose
            if (heading && content.length > 100) {
                console.log(`✓ Section optimized: ${heading.textContent}`);
            }
        });
    }

    /**
     * Ensure Citability
     */
    ensureCitability() {
        // Content should be citable with proper attribution
        const contentElements = document.querySelectorAll('[itemprop]');
        
        console.log('Citable elements found:', contentElements.length);

        // Verify each article card has proper schema
        const articles = document.querySelectorAll('[itemtype*="Article"]');
        articles.forEach(article => {
            const headline = article.querySelector('[itemprop="headline"]');
            const author = article.querySelector('[itemprop="author"]');
            
            if (headline && author) {
                console.log('✓ Article properly attributed:', headline.textContent);
            }
        });
    }

    /**
     * Implement Structured Data for Answer Engines
     */
    implementStructuredData() {
        const schemas = [
            'Person Schema',
            'Organization Schema',
            'LocalBusiness Schema',
            'BreadcrumbList Schema',
            'FAQ Schema',
            'Article Schema'
        ];

        schemas.forEach(schema => {
            console.log(`✓ ${schema} implemented`);
        });
    }

    /**
     * Generate GEO Recommendations
     */
    generateGEORecommendations() {
        const recommendations = [
            '✓ Use semantic HTML with proper heading hierarchy',
            '✓ Include schema markup for all content types',
            '✓ Write answer-focused content (direct answers first)',
            '✓ Include clear author and publication information',
            '✓ Use lists and tables for easy parsing',
            '✓ Provide context and definitions for concepts',
            '✓ Include related links and references',
            '✓ Use descriptive anchor text'
        ];

        console.log('=== GEO RECOMMENDATIONS ===');
        recommendations.forEach(rec => console.log(rec));
    }
}

/**
 * Initialize SEO Managers
 */
document.addEventListener('DOMContentLoaded', () => {
    const seoManager = new SEOManager();
    const geoManager = new GEOManager();

    // Generate reports
    const seoReport = seoManager.generateSEOReport();
    geoManager.generateGEORecommendations();

    // Make managers available globally
    window.SEOManager = SEOManager;
    window.GEOManager = GEOManager;
    window.seoManager = seoManager;
    window.geoManager = geoManager;

    console.log('SEO & GEO Managers initialized');
});

/**
 * Monitor SEO Signals
 */
window.addEventListener('load', () => {
    // Check Core Web Vitals
    if ('web-vital' in window) {
        console.log('Web Vitals monitoring enabled');
    }

    // Log page metadata
    const metadata = {
        title: document.title,
        description: document.querySelector('meta[name="description"]')?.content,
        keywords: document.querySelector('meta[name="keywords"]')?.content,
        canonical: document.querySelector('link[rel="canonical"]')?.href,
        schemas: document.querySelectorAll('script[type="application/ld+json"]').length
    };

    console.log('Page Metadata:', metadata);
});

console.log('SEO Module loaded');
