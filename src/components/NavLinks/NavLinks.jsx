import navigationLinks from '../../data/navigationLinks'

function NavLinks() {
  return (
    <nav
      className="hidden items-center gap-10 text-base font-semibold text-neutral-800 lg:flex xl:gap-16"
      aria-label="Primary navigation"
    >
      {navigationLinks.map(({ href, label }) => (
        <a
          key={href}
          href={href}
          className="transition-colors hover:text-pink-500"
        >
          {label}
        </a>
      ))}
    </nav>
  )
}

export default NavLinks
