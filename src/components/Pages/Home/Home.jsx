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
import usePlans from '@/hooks/usePlans'


const Home = () => {
    const { plans, source: plansSource } = usePlans()
    const [selectedPlanId, setSelectedPlanId] = useState(null)
    const activePlanId = selectedPlanId === 'not-sure' ||
        plans.some((plan) => plan.id === selectedPlanId)
        ? selectedPlanId
        : plans[0]?.id ?? 'not-sure'

    return (
        <>
          <Header />
          <MainSection />
          <ServicesBlack />
          <SelectedWork />
          <CTACards />
          <AboutProcess name="Vladyslav" surname={"Voronin"}/>
          <Pricing
            plans={plans}
            plansSource={plansSource}
            onPlanSelect={setSelectedPlanId}
          />
          <Testimonials />
          <FAQContact plans={plans} />
          <ContactProject
            plans={plans}
            plansSource={plansSource}
            selectedPlanId={activePlanId}
            onPlanChange={setSelectedPlanId}
          />
          <Footer />
        </>
    )
}
export default Home;
