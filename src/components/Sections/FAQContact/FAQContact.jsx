import { useState } from 'react'
import ContactCard from '@/components/ContactCard/ContactCard'
import FAQItem from '@/components/FAQItem/FAQItem'
import SectionWrapper from '@/components/sectionWrapper/SectionWrapper'
import { TITLE_VARIANTS } from '@/components/Title/titleVariants'
import Title from '@/components/Title/Title'
import { faqs } from '@/data/faqs'
import styles from './FAQContact.module.css'

const FAQContact = () => {
    const [openIndex, setOpenIndex] = useState(null)

    const toggleQuestion = (index) => {
        setOpenIndex((current) => (current === index ? null : index))
    }

    return (
        <SectionWrapper>
            <div className={styles.sectionContent}>
                <section className={styles.faqPanel} id="faq" aria-labelledby="faq-title">
                    <Title variant={TITLE_VARIANTS.EYEBROW} className={styles.eyebrow}>
                        FAQ
                    </Title>
                    <Title
                        variant={TITLE_VARIANTS.BODY_SMALL}
                        className={styles.heading}
                        as="h2"
                    >
                        <span id="faq-title">Common questions</span>
                    </Title>

                    <div className={styles.questions}>
                        {faqs.map((faq, index) => (
                            <FAQItem
                                {...faq}
                                id={`faq-${index + 1}`}
                                isOpen={openIndex === index}
                                key={faq.question}
                                onToggle={() => toggleQuestion(index)}
                            />
                        ))}
                    </div>
                </section>

                <ContactCard />
            </div>
        </SectionWrapper>
    )
}

export default FAQContact
