import Labels from '@/components/Labels/Labels'
import Title from '@/components/Title/Title'
import { TITLE_VARIANTS } from '@/components/Title/titleVariants'
import styles from './MainSection.module.css'
import BlobSVG from '@/components/BlobSVG/BlobSVG'

const MainSection = () => {


    return (
        <section className="px-5 py-10 sm:px-8 lg:px-16 lg:py-16">
            <div className="flex flex-row items-center justify-between gap-x-10">
                <div>
                    <Title variant={TITLE_VARIANTS.EYEBROW}>
                        Web Design &amp; Development
                    </Title>

                    <Title className="mt-5">
                        Websites for small businesses that mean business.
                    </Title>

                    <Title variant={TITLE_VARIANTS.SUBTITLE} className="mt-7">
                        I design and develop modern, fast websites that help small
                        businesses attract more customers and grow online.
                    </Title>

                    <Labels className="mt-10 lg:mt-16" />
                </div>


                <div className={`${styles.imageWrapper}`}>
                    <BlobSVG />
                </div>
            </div>
            
        </section>
    )
}

export default MainSection
