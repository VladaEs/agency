import ArrowRightIcon from '@/components/Button/ArrowRightIcon'
import Button from '@/components/Button/Button'
import { BUTTON_SIZES, BUTTON_VARIANTS } from '@/components/Button/buttonVariants'
import styles from './PricingCard.module.css'

const PricingDoodle = () => (
    <svg
        className={styles.doodle}
        viewBox="0 0 64 64"
        fill="none"
        aria-hidden="true"
    >
        <path d="M18 44c-2-10 0-22 5-25 3-2 5 0 4 5l-1 9c4-11 8-18 12-17 4 2 0 11-2 16 5-8 10-11 13-8 4 5-5 12-10 15 6-2 10-1 10 3 0 5-8 9-15 10" />
    </svg>
)

const CustomPricingCard = ({ href = '#contact', className = '' }) => (
    <aside className={`${styles.customCard} ${className}`}>
        <PricingDoodle />
        <div className={styles.customContent}>
            <h3 className={styles.customTitle}>Need something different?</h3>
            <p className={styles.customDescription}>
                Let’s create the right solution for your business.
            </p>
        </div>
        <Button
            href={href}
            variant={BUTTON_VARIANTS.OUTLINE}
            size={BUTTON_SIZES.SMALL}
            endIcon={<ArrowRightIcon />}
        >
            Get a quote
        </Button>
    </aside>
)

export default CustomPricingCard
