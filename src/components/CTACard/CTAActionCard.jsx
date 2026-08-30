import ArrowRightIcon from '@/components/Button/ArrowRightIcon'
import styles from './CTACard.module.css'
import {Link} from 'react-router-dom'
const CTAActionCard = ({ href = '#quote', className = '' }) => (
    <article className={`${styles.actionCard} ${className}`}>
        <span className={styles.actionAccent} aria-hidden="true">
            <span />
            <span />
            <span />
        </span>

        <Link className={styles.actionLink} to={href}>
            <span>Let&rsquo;s Talk</span>
            <ArrowRightIcon />
        </Link>

        <svg
            className={styles.smile}
            viewBox="0 0 74 42"
            fill="none"
            aria-hidden="true"
        >
            <path d="M8 7c2 19 23 32 45 22 7-3 11-8 13-14" />
            <path d="m57 13 9 2 2-9" />
        </svg>
    </article>
)

export default CTAActionCard
