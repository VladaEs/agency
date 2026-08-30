import Labels from '@/components/Labels/Labels'
import Title from '@/components/Title/Title'
import { TITLE_VARIANTS } from '@/components/Title/titleVariants'
import styles from './MainSection.module.css'
import BlobSVG from '@/components/BlobSVG/BlobSVG'
import Button from '@/components/Button/Button'
import ArrowRightIcon from '@/components/Button/ArrowRightIcon'
import mainScreen from '@/assets/images/mainScreen.png'
import SectionWrapper from "@/components/sectionWrapper/SectionWrapper"
import {
    BUTTON_SIZES,
    BUTTON_VARIANTS,
} from '@/components/Button/buttonVariants'

const MainSection = () => {


    return (
        <SectionWrapper>
            <div className="mt-25 mx-auto flex max-w-[1440px] flex-col items-center gap-12 lg:flex-row lg:justify-between lg:gap-10 xl:gap-16">
                <div className="w-full min-w-0 lg:w-1/2 lg:max-w-[720px]">
                    <Title variant={TITLE_VARIANTS.EYEBROW}>
                        Web Design &amp; Development
                    </Title>

                    <Title className="mt-5 ">
                        Websites for small businesses that mean business.
                    </Title>

                    <Title variant={TITLE_VARIANTS.SUBTITLE} className="mt-7">
                        I design and develop modern, fast websites that help small
                        businesses attract more customers and grow online.
                    </Title>

                    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                        <Button
                            href="#quote"
                            size={BUTTON_SIZES.LARGE}
                            endIcon={<ArrowRightIcon />}
                            className="w-full sm:w-auto"
                        >
                            Get a free quote
                        </Button>
                        <Button
                            href="#work"
                            variant={BUTTON_VARIANTS.OUTLINE}
                            size={BUTTON_SIZES.LARGE}
                            className="w-full sm:w-auto"
                        >
                            View my work
                        </Button>
                    </div>

                    <Labels className="mt-10 lg:mt-16" />
                </div>


                <div className={styles.imageWrapper}>
                    <BlobSVG />
                    <img
                        src={mainScreen}
                        alt="Preview of a website displayed on a laptop"
                    />
                </div>
            </div>
            
        </SectionWrapper>
    )
}

export default MainSection
