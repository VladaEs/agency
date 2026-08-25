import { useState } from 'react'
import navigationLinks from '../../data/navigationLinks'
import LogoBlack from '../LogoBlack/LogoBlack'
import NavLinks from '../NavLinks/NavLinks'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="w-full px-3 py-2 sm:px-5 sm:py-3">
      <div className="mx-auto flex max-w-[2040px] items-center justify-between rounded-[2rem] bg-white px-5 py-4 shadow-[0_10px_35px_rgba(15,23,42,0.06)] sm:px-8 lg:px-16 lg:py-6">
        <a href="/" className="flex shrink-0 items-center gap-2.5" aria-label="Norda home">
          <LogoBlack className="h-14 w-14" />
          <span className="text-xl font-extrabold tracking-[-0.04em] text-black sm:text-2xl">
            Norda
          </span>
        </a>

        <NavLinks />

        <a
          href="#quote"
          className="hidden items-center gap-6 rounded-full bg-black px-8 py-4 text-base font-semibold text-white transition hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 lg:flex"
        >
          <span>Get a Quote</span>
          <span className="text-2xl leading-none" aria-hidden="true">&rarr;</span>
        </a>

        <div className="relative lg:hidden">
          <button
            type="button"
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-black text-white"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? (
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="m6 6 12 12M18 6 6 18" />
              </svg>
            ) : (
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>

          {isMenuOpen && (
            <nav
              id="mobile-navigation"
              className="absolute right-0 top-14 z-50 flex w-56 flex-col gap-1 rounded-3xl bg-white p-3 text-base font-semibold text-neutral-800 shadow-xl"
              aria-label="Mobile navigation"
            >
              {navigationLinks.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  className="rounded-2xl px-4 py-3 hover:bg-neutral-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {label}
                </a>
              ))}
              <a
                href="#quote"
                className="mt-1 flex items-center justify-between rounded-full bg-black px-4 py-3 text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Get a Quote</span>
                <span aria-hidden="true">&rarr;</span>
              </a>
            </nav>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
