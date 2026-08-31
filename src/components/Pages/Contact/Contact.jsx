import ContactProject from '@/components/Sections/ContactProject/ContactProject'
import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'
import usePlans from '@/hooks/usePlans'

const Contact = () => {
    const { plans, source: plansSource } = usePlans()

    return (
        <>
            <Header />
            <main>
                <ContactProject plans={plans} plansSource={plansSource} />
            </main>
            <Footer />
        </>
    )
}

export default Contact;
