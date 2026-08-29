import ArrowRightIcon from '@/components/Button/ArrowRightIcon'
import Button from '@/components/Button/Button'
import { BUTTON_SIZES } from '@/components/Button/buttonVariants'
import { TITLE_VARIANTS } from '@/components/Title/titleVariants'
import Title from '@/components/Title/Title'
import mainScreen from '@/assets/images/mainScreen.png'
import styles from './ContactCard.module.css'

const ContactCard = ({
    title = 'Have a project in mind?',
    description = 'Let’s build something great together. Tell me about your business and I’ll get back to you within one day.',
    href = 'mailto:hello@example.com',
    buttonLabel = 'Start a project',
    className = '',
}) => (
    <article className={`${styles.card} ${className}`} id="contact">
        <div className={styles.content}>
            <Title
                variant={TITLE_VARIANTS.EYEBROW}
                color="var(--color-text)"
                className={styles.eyebrow}
            >
                Contact
            </Title>
            <Title variant={TITLE_VARIANTS.BODY_SMALL} className={styles.title}>
                {title}
            </Title>
            <p className={styles.description}>{description}</p>
            <Button
                href={href}
                size={BUTTON_SIZES.SMALL}
                endIcon={<ArrowRightIcon />}
            >
                {buttonLabel}
            </Button>
        </div>

        <div className={styles.visual} aria-hidden="true">
            <span className={styles.accentLines}>
                <span />
                <span />
                <span />
            </span>
            <img src={mainScreen} alt="" />
        </div>
    </article>
)

export default ContactCard
