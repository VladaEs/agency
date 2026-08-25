import { LABEL_SIZES } from './labelSizes'

const highlightedSizeClasses = {
  [LABEL_SIZES.SMALL]: {
    wrapper: 'gap-2',
    icon: 'h-6 w-6',
    check: 'h-3.5 w-3.5',
  },
  [LABEL_SIZES.MEDIUM]: {
    wrapper: 'gap-2.5',
    icon: 'h-7 w-7',
    check: 'h-4 w-4',
  },
  [LABEL_SIZES.LARGE]: {
    wrapper: 'gap-3',
    icon: 'h-8 w-8',
    check: 'h-[18px] w-[18px]',
  },
}

function Label({ children, highlighted = false, size = LABEL_SIZES.MEDIUM }) {
  const sizeClasses = highlightedSizeClasses[size] ?? highlightedSizeClasses[LABEL_SIZES.MEDIUM]

  if (highlighted) {
    return (
      <span className={`inline-flex items-center ${sizeClasses.wrapper}`}>
        <span
          className={`inline-flex shrink-0 items-center justify-center rounded-full bg-[var(--color-success)] text-white ${sizeClasses.icon}`}
          aria-hidden="true"
        >
          <svg
            className={sizeClasses.check}
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="m5 10.25 3.1 3.1L15.25 6.5"
              stroke="currentColor"
              strokeWidth="2.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span>{children}</span>
      </span>
    )
  }

  return <span>{children}</span>
}

export default Label
