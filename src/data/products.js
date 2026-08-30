export const CURRENCY = Object.freeze({
    code: 'GBP',
    symbol: '£',
    locale: 'en-GB',
})

export const products = Object.freeze([
    {
        id: 'starter-website',
        title: 'Starter Website',
        description: 'Perfect for self-employed professionals and small businesses.',
        price: 499,
        icon: 'screen',
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

export const formatPrice = (price) =>
    new Intl.NumberFormat(CURRENCY.locale, {
        style: 'currency',
        currency: CURRENCY.code,
        maximumFractionDigits: 0,
    }).format(price)

export const contactPlanOptions = Object.freeze([
    ...products,
    {
        id: 'not-sure',
        title: 'Not sure yet',
        description: 'I need help deciding what’s right for my business.',
        icon: 'help',
    },
])

