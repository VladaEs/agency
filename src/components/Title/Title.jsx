import { TITLE_VARIANTS } from './titleVariants'

const variantClasses = {
  [TITLE_VARIANTS.HERO]:
    'max-w-[900px] text-4xl font-black leading-[0.98] tracking-[-0.045em] text-[var(--color-text)] sm:text-6xl lg:text-7xl xl:text-8xl',
  [TITLE_VARIANTS.SUBTITLE]:
    'max-w-[620px] text-base font-medium leading-relaxed text-neutral-700 sm:text-lg lg:text-xl',
  [TITLE_VARIANTS.EYEBROW]:
    'text-sm font-bold uppercase tracking-[0.04em] text-[var(--color-pink)] sm:text-base lg:text-lg',
}

const defaultTags = {
  [TITLE_VARIANTS.HERO]: 'h1',
  [TITLE_VARIANTS.SUBTITLE]: 'p',
  [TITLE_VARIANTS.EYEBROW]: 'p',
}

function Title({
  children,
  variant = TITLE_VARIANTS.HERO,
  as,
  className = '',
}) {
  const safeVariant = variantClasses[variant] ? variant : TITLE_VARIANTS.HERO
  const Component = as ?? defaultTags[safeVariant]

  return (
    <Component className={`${variantClasses[safeVariant]} ${className}`}>
      {children}
    </Component>
  )
}

export default Title
