const iconPaths = {
    design: (
        <>
            <path d="M7 7.5 4.5 10 7 12.5M17 7.5l2.5 2.5-2.5 2.5M9.5 15l5-10" />
            <path d="M5 17.5c3.5 2 10.5 2 14 0" />
        </>
    ),
    development: (
        <>
            <rect x="3" y="4.5" width="18" height="15" rx="2" />
            <path d="m9 9-3 3 3 3m6-6 3 3-3 3m-2.5-8-2 10" />
        </>
    ),
    seo: (
        <>
            <path d="M3 18h18M5 15l4-4 3 2 6-7" />
            <circle cx="18.5" cy="5.5" r="1.5" />
        </>
    ),
    support: (
        <>
            <path d="M4 13v-2a8 8 0 0 1 16 0v2" />
            <path d="M6.5 17H6a2 2 0 0 1-2-2v-2h2.5v4Zm11 0H19a1 1 0 0 0 1-1v-3h-2.5v4Z" />
            <path d="M17.5 17c0 1.5-1.5 2.5-4 2.5" />
        </>
    ),
}

const CTAIcon = ({ name, className = '' }) => (
    <svg
        className={className}
        width="44"
        height="44"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        {iconPaths[name] ?? iconPaths.design}
    </svg>
)

export default CTAIcon
