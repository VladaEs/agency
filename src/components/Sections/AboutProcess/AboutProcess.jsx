import ProcessStep from '@/components/ProcessStep/ProcessStep'
import SectionWrapper from '@/components/sectionWrapper/SectionWrapper'
import { TITLE_VARIANTS } from '@/components/Title/titleVariants'
import Title from '@/components/Title/Title'
import aboutPortrait from '@/assets/about-portrait.jpg'
import { processSteps } from '@/data/processSteps'
import styles from './AboutProcess.module.css'

const AboutProcess = ({ name = 'Vladyslav' , surname = 'Voronin' }) => (
    <SectionWrapper>
        <div className={styles.sectionContent} id="about">
            <article className={`${styles.panel} ${styles.aboutPanel}`}>
                <Title variant={TITLE_VARIANTS.EYEBROW} className={styles.eyebrow}>
                    About me
                </Title>
                <Title variant={TITLE_VARIANTS.BODY_SMALL} className={styles.heading}>
                    Hi, I’m {name}
                </Title>

                <div className={styles.aboutContent}>
                    <figure className={styles.portraitFigure}>
                        <img
                            className={styles.portrait}
                            src={aboutPortrait}
                            alt="Independent web developer"
                        />
                        <figcaption className={styles.photoCredit}>
                            Photo by{' '}
                            <a
                                href="https://unsplash.com/@ernestflowerss"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Ernest Flowers
                            </a>
                        </figcaption>
                    </figure>

                    <div className={styles.bio}>
                        <p>
                            I’m an independent web developer helping small businesses build a
                            professional presence online.
                        </p>
                        <p>
                            You’ll work directly with me from our first conversation to the day
                            your website goes live—and beyond.
                        </p>
                        <span className={styles.signature}>{name} {surname}</span>
                    </div>
                </div>
            </article>

            <article className={`${styles.panel} ${styles.processPanel}`}>
                <Title variant={TITLE_VARIANTS.EYEBROW} className={styles.eyebrow}>
                    My process
                </Title>
                <Title variant={TITLE_VARIANTS.BODY_SMALL} className={styles.heading}>
                    From idea to launch.
                </Title>

                <ol className={styles.processList}>
                    {processSteps.map((step, index) => (
                        <ProcessStep
                            {...step}
                            key={step.title}
                            number={index + 1}
                        />
                    ))}
                </ol>
            </article>
        </div>
    </SectionWrapper>
)

export default AboutProcess
