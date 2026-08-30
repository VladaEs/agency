import ArrowRightIcon from '@/components/Button/ArrowRightIcon'
import IconButton from '@/components/Button/IconButton'
import LogoMark from '@/components/LogoBlack/LogoMark'
import navigationLinks from '@/data/navigationLinks'
import styles from './Footer.module.css'
import {Link} from 'react-router-dom'
const Footer = ({ brandName = 'Norda' }) => {
    const currentYear = new Date().getFullYear()

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <footer className={styles.footer}>
            <div className={styles.content}>
                <Link className={styles.brand} to="/" aria-label={`${brandName} home`}>
                    <LogoMark className={styles.logo} title="" />
                    <span>{brandName}</span>
                </Link>

                <nav className={styles.navigation} aria-label="Footer navigation">
                    {navigationLinks.map(({ href, label }) => (
                        <Link to={href} key={href}>{label}</Link>
                    ))}
                </nav>

                <p className={styles.copyright}>
                    © {currentYear} {brandName}. All rights reserved.
                </p>

                <IconButton
                    className={styles.backToTop}
                    aria-label="Back to top"
                    onClick={scrollToTop}
                >
                    <ArrowRightIcon className={styles.upIcon} />
                </IconButton>
            </div>
        </footer>
    )
}

export default Footer
