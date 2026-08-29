import CTACard from '@/components/CTACard/CTACard'
import { CTA_CARD_VARIANTS } from '@/components/CTACard/ctaCardVariants'
import DarkSectionPanel from '@/components/DarkSectionPanel/DarkSectionPanel'
import { TITLE_VARIANTS } from '@/components/Title/titleVariants'
import Title from '@/components/Title/Title'
import { services } from '@/data/services'
import styles from './ServicesBlack.module.css'

const ServicesBlack = () => (
    <DarkSectionPanel className={styles.servicesPanel} id="services">
        <header className={styles.intro}>
            <Title variant={TITLE_VARIANTS.EYEBROW} className={styles.eyebrow}>
                Services
            </Title>
            <Title
                variant={TITLE_VARIANTS.BODY_SMALL}
                color="var(--color-on-dark)"
                className={styles.heading}
            >
                How can I help your business?
            </Title>
        </header>

        <div className={styles.services}>
            {services.map((service, index) => (
                <CTACard
                    {...service}
                    key={service.title}
                    number={index + 1}
                    variant={CTA_CARD_VARIANTS.COMPACT_DARK}
                />
            ))}
        </div>
    </DarkSectionPanel>
)

export default ServicesBlack
