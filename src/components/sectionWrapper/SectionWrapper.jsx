

const SectionWrapper = ({ children }) => {
    // This component wraps its children in a section with consistent padding and spacing.
    return (
        <section className="px-5 py-10 sm:px-8 sm:py-14 lg:px-16 lg:py-16">
            {children}
        </section>
    );
}

export default SectionWrapper;