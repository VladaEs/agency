import { formatPrice } from '@/utils/formatPrice'

const getPricingAnswer = (plans) => {
    const pricedPlans = [...plans]
        .filter((plan) => Number.isFinite(Number(plan.price)))
        .sort((first, second) => Number(first.price) - Number(second.price))

    if (pricedPlans.length === 0) {
        return 'Every project receives a clear fixed quote before any work starts.'
    }

    const lowestPlan = pricedPlans[0]
    const highestPlan = pricedPlans[pricedPlans.length - 1]

    if (lowestPlan.id === highestPlan.id) {
        return `Website packages begin at ${formatPrice(lowestPlan.price, lowestPlan.currency)}. I’ll confirm a clear fixed quote before any work starts.`
    }

    return `Website packages currently range from ${formatPrice(lowestPlan.price, lowestPlan.currency)} to ${formatPrice(highestPlan.price, highestPlan.currency)}. I’ll confirm a clear fixed quote before any work starts.`
}

export const createFaqs = (plans) => [
    {
        question: 'How much does a website cost?',
        answer: getPricingAnswer(plans),
    },
    {
        question: 'How long does it take to build a website?',
        answer: 'Most websites take between three and six weeks, depending on the size of the project and how quickly content and feedback are available.',
    },
    {
        question: 'Do you provide hosting and domain support?',
        answer: 'Yes. I can help set up your domain, hosting and business email, or work with services you already use.',
    },
    {
        question: 'Will my website be mobile friendly?',
        answer: 'Absolutely. Every website is designed and tested to work smoothly across phones, tablets, laptops and larger screens.',
    },
    {
        question: 'Can you redesign my existing website?',
        answer: 'Yes. I can refresh the visual design, improve performance and usability, or rebuild the existing site when that is the better long-term option.',
    },
]
