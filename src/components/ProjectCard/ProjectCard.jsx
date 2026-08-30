import ArrowRightIcon from '@/components/Button/ArrowRightIcon'
import styles from './ProjectCard.module.css'

const ProjectCard = ({
    title,
    description,
    tags = [],
    tone = 'pink',
    href = '#contact',
}) => {
    const toneClass = styles[tone] ?? styles.pink

    return (
        <article className={styles.card}>
            <a
                className={`${styles.preview} ${toneClass}`}
                href={href}
                aria-label={`View ${title} project`}
            >
                <span className={styles.mockWindow} aria-hidden="true">
                    <span className={styles.mockHeader} />
                    <span className={styles.mockHeading} />
                    <span className={styles.mockCopy} />
                    <span className={styles.mockButton} />
                </span>
                <span className={styles.projectArrow} aria-hidden="true">
                    <ArrowRightIcon />
                </span>
            </a>

            <div className={styles.content}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.description}>{description}</p>
                <ul className={styles.tags} aria-label="Project services">
                    {tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
            </div>
        </article>
    )
}

export default ProjectCard
