import CustomPricingCard from '@/components/PricingCard/CustomPricingCard'
import PricingCard from '@/components/PricingCard/PricingCard'
import SectionWrapper from '@/components/sectionWrapper/SectionWrapper'
import { TITLE_VARIANTS } from '@/components/Title/titleVariants'
import Title from '@/components/Title/Title'
import { products } from '@/data/products'
import styles from './Pricing.module.css'

const Pricing = ({ onPlanSelect }) => (
    <SectionWrapper>
        <div className={styles.pricingPanel} id="pricing">
            <header className={styles.intro}>
                <Title variant={TITLE_VARIANTS.EYEBROW} className={styles.eyebrow}>
                    Pricing
                </Title>
                <Title variant={TITLE_VARIANTS.BODY_SMALL} className={styles.heading}>
                    Simple pricing.<br />No surprises.
                </Title>
            </header>

            <div className={styles.plans}>
                {products.map((product) => (
                    <PricingCard
                        {...product}
                        key={product.id}
                        onSelect={() => onPlanSelect?.(product.id)}
                    />
                ))}
            </div>

            <CustomPricingCard className={styles.customPricing} />
        </div>
    </SectionWrapper>
)

export default Pricing
