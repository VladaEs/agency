import {
  BUTTON_SIZES,
  BUTTON_VARIANTS,
} from './buttonVariants'
import styles from './Button.module.css'

const variantClasses = {
  [BUTTON_VARIANTS.PRIMARY]:
    'border-black bg-black text-white hover:border-neutral-800 hover:bg-neutral-800',
  [BUTTON_VARIANTS.OUTLINE]:
    'border-neutral-400 bg-white text-black hover:border-black hover:bg-black hover:text-white',
}

const sizeClasses = {
  [BUTTON_SIZES.SMALL]: 'h-11 gap-3 px-5 text-sm',
  [BUTTON_SIZES.MEDIUM]: 'h-[52px] gap-4 px-6 text-sm sm:text-base',
  [BUTTON_SIZES.LARGE]: 'h-[60px] gap-5 px-7 text-base',
}

function Button({
  children,
  href,
  variant = BUTTON_VARIANTS.PRIMARY,
  size = BUTTON_SIZES.MEDIUM,
  startIcon,
  endIcon,
  className = '',
  type = 'button',
  ...props
}) {
  const Component = href ? 'a' : 'button'
  const safeVariant = variantClasses[variant]
    ? variant
    : BUTTON_VARIANTS.PRIMARY
  const safeSize = sizeClasses[size] ? size : BUTTON_SIZES.MEDIUM

  const componentProps = href ? { href, ...props } : { type, ...props }

  return (
    <Component
      className={`${styles.button} inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full border-2 font-body font-semibold leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2 ${variantClasses[safeVariant]} ${sizeClasses[safeSize]} ${className}`}
      {...componentProps}
    >
      {startIcon && <span className={styles.startIcon} aria-hidden="true">{startIcon}</span>}
      <span className={styles.label}>{children}</span>
      {endIcon && <span className={styles.endIcon} aria-hidden="true">{endIcon}</span>}
    </Component>
  )
}

export default Button
