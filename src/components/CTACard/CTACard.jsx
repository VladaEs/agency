import CTAIcon from './CTAIcon'
import { CTA_CARD_VARIANTS } from './ctaCardVariants'
import styles from './CTACard.module.css'

const variantClasses = {
    [CTA_CARD_VARIANTS.FEATURED]: styles.featured,
    [CTA_CARD_VARIANTS.COMPACT_DARK]: styles.compactDark,
}

const CTACard = ({
    icon,
    title,
    description,
    tone = 'pink',
    number,
    variant = CTA_CARD_VARIANTS.FEATURED,
    className = '',
}) => {
    const safeVariant = variantClasses[variant] ? variant : CTA_CARD_VARIANTS.FEATURED
    const isFeatured = safeVariant === CTA_CARD_VARIANTS.FEATURED
    const toneClass = styles[tone] ?? styles.pink
    const classes = [
        styles.card,
        variantClasses[safeVariant],
        isFeatured ? toneClass : '',
        className,
    ].filter(Boolean).join(' ')

    return (
        <article className={classes}>
            <CTAIcon name={icon} className={styles.icon} />
            <div className={styles.content}>
                {number != null && (
                    <span className={styles.number} aria-hidden="true">
                        {String(number).padStart(2, '0')}
                    </span>
                )}
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.description}>{description}</p>
            </div>
        </article>
    )
}

export default CTACard
