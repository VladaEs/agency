import ArrowRightIcon from '@/components/Button/ArrowRightIcon'
import Button from '@/components/Button/Button'
import { BUTTON_SIZES } from '@/components/Button/buttonVariants'
import { CURRENCY } from '@/data/products'
import styles from './PricingCard.module.css'

const CheckIcon = () => (
    <svg
        className={styles.checkIcon}
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
    >
        <path
            d="m4.5 10.25 3.35 3.35 7.65-7.2"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
)

const PricingCard = ({
    title,
    description,
    price,
    currency = CURRENCY.symbol,
    pricePrefix = 'from',
    features = [],
    featured = false,
    badge,
    href = '#contact',
    buttonLabel = 'Get started',
    onSelect,
    className = '',
}) => (
    <article className={`${styles.card} ${featured ? styles.featured : ''} ${className}`}>
        {badge && <span className={styles.badge}>{badge}</span>}

        <div>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.description}>{description}</p>
        </div>

        <p className={styles.price}>
            <span className={styles.pricePrefix}>{pricePrefix}</span>{' '}
            <span className={styles.priceAmount}>
                <span className={styles.currency}>{currency}</span>
                {Number(price).toLocaleString('en-GB')}
            </span>
        </p>

        <ul className={styles.features}>
            {features.map((feature) => (
                <li key={feature}>
                    <CheckIcon />
                    <span>{feature}</span>
                </li>
            ))}
        </ul>

        <Button
            href={href}
            onClick={onSelect}
            size={BUTTON_SIZES.SMALL}
            className={styles.button}
            endIcon={<ArrowRightIcon />}
        >
            {buttonLabel}
        </Button>
    </article>
)

export default PricingCard
