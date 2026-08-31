import { useState, useRef, useEffect } from "react";
import navigationLinks from "../../data/navigationLinks";
import LogoBlack from "../LogoBlack/LogoBlack";
import NavLinks from "../NavLinks/NavLinks";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import Button from "@/components/Button/Button";
import { BUTTON_SIZES } from '@/components/Button/buttonVariants'
import ArrowRightIcon from '@/components/Button/ArrowRightIcon'
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFloating, setIsFloating] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const placeholderRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const header = headerRef.current;
    const placeholder = placeholderRef.current;
    if (!header || !placeholder) return undefined;

    const updateHeaderHeight = () => setHeaderHeight(header.offsetHeight);
    const updateHeaderPosition = () => {
      setIsFloating(placeholder.getBoundingClientRect().bottom <= 0);
    };

    updateHeaderHeight();
    updateHeaderPosition();

    const resizeObserver = new ResizeObserver(updateHeaderHeight);
    resizeObserver.observe(header);

    window.addEventListener("scroll", updateHeaderPosition, { passive: true });
    window.addEventListener("resize", updateHeaderPosition);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("scroll", updateHeaderPosition);
      window.removeEventListener("resize", updateHeaderPosition);
    };
  }, []);

  return (
    <div
      ref={placeholderRef}
      style={{ height: isFloating ? headerHeight : undefined }}
    >
      <header
        className={`${styles.header} ${isFloating ? styles.headerFloating : ""} w-full px-3 py-2 sm:px-5 sm:py-3`}
        ref={headerRef}
      >
        <div className="mx-auto flex max-w-[2040px] items-center justify-between rounded-[2rem] bg-white px-5 py-4 shadow-[0_10px_35px_rgba(15,23,42,0.06)] sm:px-8 lg:px-16 lg:py-6">
          <Link
            to="/"
            className="flex shrink-0 items-center gap-2.5"
            aria-label="Norda home"
          >
            <LogoBlack className="h-14 w-14" />
            <span className="text-xl font-extrabold tracking-[-0.04em] text-black sm:text-2xl">
              Norda
            </span>
          </Link>

          <NavLinks />

          <div className="hidden lg:block">
            <Button
                href="#contact"
                size={BUTTON_SIZES.LARGE}
                endIcon={<ArrowRightIcon />}
                className="w-auto"
            >
                Get a free quote
            </Button>
          </div>

          <div className="relative lg:hidden">
            <button
              type="button"
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-black text-white"
              aria-label={
                isMenuOpen ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              {isMenuOpen ? (
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="m6 6 12 12M18 6 6 18" />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
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
                  href="#contact"
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
    </div>
  );
}

export default Header;
