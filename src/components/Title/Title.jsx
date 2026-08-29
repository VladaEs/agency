import { TITLE_VARIANTS } from './titleVariants'

const variantClasses = {
  [TITLE_VARIANTS.HERO]:
    'max-w-[900px] text-4xl font-black leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-7xl xl:text-8xl',
  [TITLE_VARIANTS.BODY]:
    'max-w-[900px] text-3xl font-black leading-[1.05] tracking-[-0.035em] sm:text-4xl lg:text-5xl',
  [TITLE_VARIANTS.BODY_SMALL]:
    'max-w-[720px] text-xl font-bold leading-tight tracking-[-0.025em] sm:text-2xl lg:text-3xl',
  [TITLE_VARIANTS.SUBTITLE]:
    'max-w-[620px] text-base font-medium leading-relaxed sm:text-lg lg:text-xl',
  [TITLE_VARIANTS.CAPTION]:
    'max-w-[620px] text-xs font-medium leading-relaxed sm:text-sm',
  [TITLE_VARIANTS.EYEBROW]:
    'text-sm font-bold uppercase tracking-[0.04em] sm:text-base lg:text-lg',
}

const variantColors = {
  [TITLE_VARIANTS.HERO]: 'var(--color-text)',
  [TITLE_VARIANTS.BODY]: 'var(--color-text)',
  [TITLE_VARIANTS.BODY_SMALL]: 'var(--color-text)',
  [TITLE_VARIANTS.SUBTITLE]: 'var(--color-text-muted)',
  [TITLE_VARIANTS.CAPTION]: 'var(--color-text-muted)',
  [TITLE_VARIANTS.EYEBROW]: 'var(--color-pink)',
}

const defaultTags = {
  [TITLE_VARIANTS.HERO]: 'h1',
  [TITLE_VARIANTS.BODY]: 'h2',
  [TITLE_VARIANTS.BODY_SMALL]: 'h3',
  [TITLE_VARIANTS.SUBTITLE]: 'p',
  [TITLE_VARIANTS.CAPTION]: 'p',
  [TITLE_VARIANTS.EYEBROW]: 'p',
}

function Title({
  children,
  variant = TITLE_VARIANTS.HERO,
  as,
  color,
  className = '',
  style,
}) {
  const safeVariant = variantClasses[variant] ? variant : TITLE_VARIANTS.HERO
  const Component = as ?? defaultTags[safeVariant]

  return (
    <Component
      className={`${variantClasses[safeVariant]} ${className}`}
      style={{ ...style, color: color ?? style?.color ?? variantColors[safeVariant] }}
    >
      {children}
    </Component>
  )
}

export default Title
