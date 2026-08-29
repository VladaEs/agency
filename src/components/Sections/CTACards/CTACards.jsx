import { Fragment } from 'react'
import CTACard from '@/components/CTACard/CTACard'
import CTAActionCard from '@/components/CTACard/CTAActionCard'
import SectionWrapper from '@/components/sectionWrapper/SectionWrapper'
import { services } from '@/data/services'
import styles from './CTACards.module.css'

const CTACards = () => (
    <SectionWrapper>
        <div className={styles.sectionContent} id="work">
            <div className={styles.ctaCardsContainer}>
                {services.map((service, index) => (
                    <Fragment key={service.title}>
                        {index === 2 && <CTAActionCard className={styles.actionCard} />}
                        <CTACard {...service} />
                    </Fragment>
                ))}
            </div>

            <p className={styles.caption}>
                Everything you need to get your business online.
            </p>
        </div>
    </SectionWrapper>
)

export default CTACards
