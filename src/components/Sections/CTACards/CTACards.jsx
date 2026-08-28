import CTACard from '@/components/CTACard/CTACard'
import CTAActionCard from '@/components/CTACard/CTAActionCard'
import SectionWrapper from '@/components/sectionWrapper/SectionWrapper'
import styles from './CTACards.module.css'

const services = [
    {
        icon: 'design',
        title: 'Web Design',
        description: 'Modern, professional designs that represent your business.',
        tone: 'pink',
    },
    {
        icon: 'development',
        title: 'Development',
        description: 'Fast, secure and responsive websites built to perform.',
        tone: 'lime',
    },
    {
        icon: 'seo',
        title: 'SEO Ready',
        description: 'Built with SEO best practices so customers can find you.',
        tone: 'yellow',
    },
    {
        icon: 'support',
        title: 'Support',
        description: 'Ongoing support and updates whenever you need them.',
        tone: 'orange',
    },
]

const CTACards = () => (
    <SectionWrapper>
        <div className={styles.sectionContent}>
            <div className={styles.ctaCardsContainer}>
                <CTACard {...services[0]} />
                <CTACard {...services[1]} />
                <CTAActionCard className={styles.actionCard} />
                <CTACard {...services[2]} />
                <CTACard {...services[3]} />
            </div>

            <p className={styles.caption}>
                Everything you need to get your business online.
            </p>
        </div>
    </SectionWrapper>
)

export default CTACards
