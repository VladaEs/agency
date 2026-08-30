import { useState } from 'react'
import SectionWrapper from '@/components/sectionWrapper/SectionWrapper'
import {
    contactPlanOptions,
    formatPrice,
    products,
} from '@/data/products'
import styles from './ContactProject.module.css'

const PlanIcon = ({ type }) => {
    if (type === 'briefcase') {
        return (
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 7V5.8A1.8 1.8 0 0 1 9.8 4h4.4A1.8 1.8 0 0 1 16 5.8V7m3.5 0h-15A1.5 1.5 0 0 0 3 8.5v10A1.5 1.5 0 0 0 4.5 20h15a1.5 1.5 0 0 0 1.5-1.5v-10A1.5 1.5 0 0 0 19.5 7Z" />
            </svg>
        )
    }

    if (type === 'screen') {
        return (
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3.5" y="4" width="17" height="12" rx="1.5" />
                <path d="M9 20h6m-3-4v4" />
            </svg>
        )
    }

    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9.7 9a2.4 2.4 0 1 1 3.9 1.9c-1 .7-1.6 1.2-1.6 2.6M12 17.5h.01" />
            <circle cx="12" cy="12" r="9" />
        </svg>
    )
}

const ContactIcon = ({ type }) => {
    const paths = {
        email: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>,
        location: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
        clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></>,
    }

    return <svg viewBox="0 0 24 24" aria-hidden="true">{paths[type]}</svg>
}

const ContactProject = ({ selectedPlanId, onPlanChange }) => {
    const [starter, business] = products
    const [localPlanId, setLocalPlanId] = useState(starter.id)
    const activePlanId = selectedPlanId ?? localPlanId
    const selectPlan = (planId) => {
        if (onPlanChange) {
            onPlanChange(planId)
            return
        }

        setLocalPlanId(planId)
    }

    return (
        <SectionWrapper>
            <section className={styles.section} id="contact" aria-labelledby="contact-title">
                <div className={styles.intro}>
                    <span className={styles.eyebrow}>Contact</span>
                    <div className={styles.titleWrap}>
                        <h2 className={styles.title} id="contact-title">
                            Have a project<br />in mind?
                        </h2>
                        <svg className={styles.burst} viewBox="0 0 54 54" aria-hidden="true">
                            <path d="M14 21 8 9m17 8 2-14m9 21 12-8M37 35l13 2" />
                        </svg>
                    </div>
                    <p className={styles.lead}>
                        Tell me about your project, goals and timeline.<br />
                        I’ll get back to you within one business day.
                    </p>

                    <dl className={styles.details}>
                        <div className={styles.detail}>
                            <span className={`${styles.detailIcon} ${styles.pink}`}><ContactIcon type="email" /></span>
                            <div><dt>Email</dt><dd><a href="mailto:hello@yourname.dev">hello@yourname.dev</a></dd></div>
                        </div>
                        <div className={styles.detail}>
                            <span className={`${styles.detailIcon} ${styles.lime}`}><ContactIcon type="location" /></span>
                            <div><dt>Based in</dt><dd>United Kingdom</dd></div>
                        </div>
                        <div className={styles.detail}>
                            <span className={`${styles.detailIcon} ${styles.orange}`}><ContactIcon type="clock" /></span>
                            <div><dt>Response time</dt><dd>Within 1 business day</dd></div>
                        </div>
                    </dl>

                    <span className={styles.squiggle} aria-hidden="true" />
                </div>

                <form
                    className={styles.form}
                    action="mailto:hello@yourname.dev"
                    method="post"
                    encType="text/plain"
                >
                    <fieldset className={styles.planFieldset}>
                        <legend>Which plan are you interested in?</legend>
                        <div className={styles.planGrid}>
                            {contactPlanOptions.map((plan) => (
                                <label className={styles.plan} key={plan.id}>
                                    <input
                                        type="radio"
                                        name="plan"
                                        value={plan.title}
                                        checked={activePlanId === plan.id}
                                        onChange={() => selectPlan(plan.id)}
                                    />
                                    <span className={styles.planContent}>
                                        <span className={styles.planTopline}>
                                            <span className={styles.radio} />
                                            <span className={styles.planIcon}><PlanIcon type={plan.icon} /></span>
                                        </span>
                                        <strong>{plan.title}</strong>
                                        <span className={styles.planDescription}>{plan.description}</span>
                                        {plan.price && <small>From {formatPrice(plan.price)}</small>}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </fieldset>

                    <div className={styles.fields}>
                        <label>
                            <span>Your name <b>*</b></span>
                            <input name="name" type="text" placeholder="e.g. John Smith" autoComplete="name" required />
                        </label>
                        <label>
                            <span>Email address <b>*</b></span>
                            <input name="email" type="email" placeholder="e.g. john@example.com" autoComplete="email" required />
                        </label>
                        <label>
                            <span>Business / Company name</span>
                            <input name="company" type="text" placeholder="e.g. Acme Ltd." autoComplete="organization" />
                        </label>
                        <label>
                            <span>What do you need? <b>*</b></span>
                            <select name="service" defaultValue="" required>
                                <option value="" disabled>Select an option</option>
                                {products.map((product) => <option key={product.id} value={product.id}>{product.title}</option>)}
                                <option value="redesign">Website redesign</option>
                                <option value="other">Something else</option>
                            </select>
                        </label>
                        <label>
                            <span>Budget</span>
                            <select name="budget" defaultValue="">
                                <option value="" disabled>Select your budget</option>
                                <option value={`up-to-${starter.price}`}>Up to {formatPrice(starter.price)}</option>
                                <option value={`${starter.price}-${business.price}`}>{formatPrice(starter.price)} – {formatPrice(business.price)}</option>
                                <option value={`${business.price}-plus`}>{formatPrice(business.price)}+</option>
                            </select>
                        </label>
                        <label className={styles.messageField}>
                            <span>Tell me about your project <b>*</b></span>
                            <textarea name="message" placeholder="Describe your project, goals and timeline..." rows="4" required />
                        </label>
                    </div>

                    <button className={styles.submit} type="submit">
                        <span>Send enquiry</span><span aria-hidden="true">→</span>
                    </button>
                    <p className={styles.privacy}>
                        <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>
                        Your information is safe and never shared.
                    </p>
                </form>
            </section>
        </SectionWrapper>
    )
}

export default ContactProject
