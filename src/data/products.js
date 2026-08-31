/**
 * FALLBACK ONLY.
 *
 * Live plan data must come from GET /api/plans. Keep this list in sync with
 * the database only so the page remains usable while the API is unavailable.
 */
export const fallbackProducts = Object.freeze([
    {
        id: 'starter-website',
        title: 'Starter Website',
        description: 'Perfect for self-employed professionals and small businesses.',
        price: 499,
        currency: 'GBP',
        icon: 'screen',
        featured: false,
        badge: null,
        features: [
            'Up to 5 pages',
            'Mobile responsive',
            'Contact form',
            'Basic SEO',
            'Hosting setup',
        ],
    },
    {
        id: 'business-website',
        title: 'Business Website',
        description: 'For growing businesses that need more features and flexibility.',
        price: 1299,
        currency: 'GBP',
        icon: 'briefcase',
        featured: true,
        badge: 'Popular',
        features: [
            'Up to 10 pages',
            'Custom design',
            'Advanced forms',
            'SEO setup',
            'Analytics integration',
        ],
    },
])
