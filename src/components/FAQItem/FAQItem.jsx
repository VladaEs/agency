import styles from './FAQItem.module.css'

const FAQItem = ({ question, answer, isOpen, onToggle, id }) => {
    const answerId = `${id}-answer`
    const buttonId = `${id}-button`

    return (
        <div className={`${styles.item} ${isOpen ? styles.open : ''}`}>
            <h3 className={styles.questionHeading}>
                <button
                    className={styles.trigger}
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={onToggle}
                >
                    <span>{question}</span>
                    <span className={styles.icon} aria-hidden="true" />
                </button>
            </h3>
            <div
                className={styles.answerWrapper}
                id={answerId}
                role="region"
                aria-labelledby={buttonId}
                aria-hidden={!isOpen}
            >
                <div>
                    <p className={styles.answer}>{answer}</p>
                </div>
            </div>
        </div>
    )
}

export default FAQItem
