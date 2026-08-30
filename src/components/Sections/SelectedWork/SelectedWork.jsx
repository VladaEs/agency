import ArrowRightIcon from '@/components/Button/ArrowRightIcon'
import ProjectCard from '@/components/ProjectCard/ProjectCard'
import SectionWrapper from '@/components/sectionWrapper/SectionWrapper'
import { TITLE_VARIANTS } from '@/components/Title/titleVariants'
import Title from '@/components/Title/Title'
import { projects } from '@/data/projects'
import styles from './SelectedWork.module.css'
import {Link} from 'react-router-dom'
const SelectedWork = () => (
    <SectionWrapper>
        <div className={styles.sectionContent} id="work">
            <header className={styles.header}>
                <Title variant={TITLE_VARIANTS.EYEBROW}>
                    Selected work
                </Title>
                <Link className={styles.viewAll} to="#contact">
                    <span>View all projects</span>
                    <ArrowRightIcon />
                </Link>
            </header>

            <div className={styles.projects}>
                {projects.map((project) => (
                    <ProjectCard {...project} key={project.title} />
                ))}
            </div>
        </div>
    </SectionWrapper>
)

export default SelectedWork
