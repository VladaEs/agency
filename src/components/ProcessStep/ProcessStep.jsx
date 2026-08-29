import styles from './ProcessStep.module.css'

const ProcessStep = ({ number, title, description }) => (
    <li className={styles.step}>
        <span className={styles.marker} aria-hidden="true">
            {String(number).padStart(2, '0')}
        </span>
        <div className={styles.content}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.description}>{description}</p>
        </div>
    </li>
)

export default ProcessStep
