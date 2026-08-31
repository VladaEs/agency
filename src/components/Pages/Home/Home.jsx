import { useState } from 'react'
import Header from '@/components/Header/Header'
import MainSection from '@/components/Sections/Main/MainSection'
import CTACards from '@/components/Sections/CTACards/CTACards'
import ServicesBlack from '@/components/Sections/ServicesBlack/ServicesBlack'
import AboutProcess from '@/components/Sections/AboutProcess/AboutProcess'
import Pricing from '@/components/Sections/Pricing/Pricing'
import Testimonials from '@/components/Sections/Testimonials/Testimonials'
import FAQContact from '@/components/Sections/FAQContact/FAQContact'
import Footer from '@/components/Footer/Footer'
import SelectedWork from '@/components/Sections/SelectedWork/SelectedWork'
import ContactProject from '@/components/Sections/ContactProject/ContactProject'
import { products } from '@/data/products'


const Home = () => {
    const [selectedPlanId, setSelectedPlanId] = useState(products[0].id)

    return (
        <>
          <Header />
          <MainSection />
          <ServicesBlack />
          <SelectedWork />
          <CTACards />
          <AboutProcess name="Vladyslav" surname={"Voronin"}/>
          <Pricing onPlanSelect={setSelectedPlanId} />
          <Testimonials />
          <FAQContact />
          <ContactProject
            selectedPlanId={selectedPlanId}
            onPlanChange={setSelectedPlanId}
          />
          <Footer />
        </>
    )
}
export default Home;
