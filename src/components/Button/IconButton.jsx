const IconButton = ({ children, className = '', type = 'button', ...props }) => (
    <button
        type={type}
        className={`inline-grid h-12 w-12 shrink-0 cursor-pointer place-items-center rounded-full border-2 border-white/15 bg-white text-black transition hover:scale-105 hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${className}`}
        {...props}
    >
        {children}
    </button>
)

export default IconButton
