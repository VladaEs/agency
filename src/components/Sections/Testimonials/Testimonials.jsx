import { useState } from 'react'
import ArrowRightIcon from '@/components/Button/ArrowRightIcon'
import IconButton from '@/components/Button/IconButton'
import DarkSectionPanel from '@/components/DarkSectionPanel/DarkSectionPanel'
import Testimonial from '@/components/Testimonial/Testimonial'
import { TITLE_VARIANTS } from '@/components/Title/titleVariants'
import Title from '@/components/Title/Title'
import { testimonials } from '@/data/testimonials'
import styles from './Testimonials.module.css'

const Testimonials = () => {
    const [activeIndex, setActiveIndex] = useState(0)

    const showPrevious = () => {
        setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length)
    }

    const showNext = () => {
        setActiveIndex((current) => (current + 1) % testimonials.length)
    }

    return (
        <DarkSectionPanel className={styles.testimonialsPanel} id="testimonials">
            <header className={styles.intro}>
                <Title variant={TITLE_VARIANTS.EYEBROW} className={styles.eyebrow}>
                    Testimonials
                </Title>
                <Title
                    variant={TITLE_VARIANTS.BODY_SMALL}
                    color="var(--color-on-dark)"
                    className={styles.heading}
                >
                    What my clients say.
                </Title>
            </header>

            <div className={styles.testimonialContent} aria-live="polite">
                <span className={styles.openQuote} aria-hidden="true">“</span>
                <Testimonial {...testimonials[activeIndex]} />
            </div>

            <span className={styles.decorativeQuote} aria-hidden="true">”</span>

            <div className={styles.controls}>
                <IconButton aria-label="Show previous testimonial" onClick={showPrevious}>
                    <ArrowRightIcon className={styles.previousIcon} />
                </IconButton>
                <IconButton aria-label="Show next testimonial" onClick={showNext}>
                    <ArrowRightIcon />
                </IconButton>
            </div>
        </DarkSectionPanel>
    )
}

export default Testimonials
