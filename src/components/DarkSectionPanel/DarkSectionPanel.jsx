import SectionWrapper from '@/components/sectionWrapper/SectionWrapper'
import styles from './DarkSectionPanel.module.css'

const DarkSectionPanel = ({ children, className = '', ...props }) => (
    <SectionWrapper>
        <div className={styles.sectionContent}>
            <div className={`${styles.panel} ${className}`} {...props}>
                {children}
            </div>
        </div>
    </SectionWrapper>
)

export default DarkSectionPanel
