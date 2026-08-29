const LogoMark = ({ className = '', title = 'Norda' }) => {
    const accessibilityProps = title
        ? { role: 'img', 'aria-label': title }
        : { 'aria-hidden': true }

    return (
        <svg
            className={className}
            viewBox="49.84 78.25 412.32 234.75"
            fill="none"
            {...accessibilityProps}
        >
        <path
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M71 313C56 313 45 298 52 285L166 88C173 75 191 75 199 88L256 187L313 88C321 75 339 75 346 88L460 285C467 298 456 313 441 313H71ZM171 279H341L256 132L171 279Z"
        />
        </svg>
    )
}

export default LogoMark
