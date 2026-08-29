import Header from './components/Header/Header'
import MainSection from '@/components/Sections/Main/MainSection'
import CTACards from '@/components/Sections/CTACards/CTACards'
import ServicesBlack from '@/components/Sections/ServicesBlack/ServicesBlack'
import AboutProcess from '@/components/Sections/AboutProcess/AboutProcess'
import Pricing from '@/components/Sections/Pricing/Pricing'
import Testimonials from '@/components/Sections/Testimonials/Testimonials'
import FAQContact from '@/components/Sections/FAQContact/FAQContact'
import Footer from '@/components/Footer/Footer'

function App() {
  return (
    <>
      <Header />
      <MainSection />
      <CTACards />
      <ServicesBlack />
      <AboutProcess />
      <Pricing />
      <Testimonials />
      <FAQContact />
      <Footer />

    </>
  )
}

export default App;
