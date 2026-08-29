import styles from './Testimonial.module.css'

const getInitials = (name) => name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

const Testimonial = ({ quote, author, company, avatar }) => (
    <figure className={styles.testimonial}>
        <blockquote className={styles.quote}>“{quote}”</blockquote>
        <figcaption className={styles.authorBlock}>
            {avatar ? (
                <img className={styles.avatar} src={avatar} alt="" />
            ) : (
                <span className={styles.initials} aria-hidden="true">
                    {getInitials(author)}
                </span>
            )}
            <span>
                <strong className={styles.author}>{author}</strong>
                <span className={styles.company}>{company}</span>
            </span>
        </figcaption>
    </figure>
)

export default Testimonial
