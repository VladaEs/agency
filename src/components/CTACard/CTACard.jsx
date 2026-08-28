import CTAIcon from './CTAIcon'
import styles from './CTACard.module.css'

const CTACard = ({ icon, title, description, tone = 'pink', className = '' }) => {
    const toneClass = styles[tone] ?? styles.pink

    return (
        <article className={`${styles.card} ${toneClass} ${className}`}>
            <CTAIcon name={icon} />
            <div className={styles.content}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.description}>{description}</p>
            </div>
        </article>
    )
}

export default CTACard
