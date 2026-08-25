import Label from '@/components/Labels/Label/Label'
import { LABEL_SIZES } from '@/components/Labels/Label/labelSizes'

const defaultItems = ['Web Design', 'Development', 'SEO', 'Support']

const listSizeClasses = {
  [LABEL_SIZES.SMALL]: 'gap-x-3 gap-y-2 text-sm',
  [LABEL_SIZES.MEDIUM]: 'gap-x-5 gap-y-3 text-base',
  [LABEL_SIZES.LARGE]: 'gap-x-6 gap-y-3 text-lg',
}

const itemSizeClasses = {
  [LABEL_SIZES.SMALL]: 'gap-x-3',
  [LABEL_SIZES.MEDIUM]: 'gap-x-5',
  [LABEL_SIZES.LARGE]: 'gap-x-6',
}

function Labels({
  items = defaultItems,
  size = LABEL_SIZES.MEDIUM,
  className = '',
}) {
  const listSize = listSizeClasses[size] ?? listSizeClasses[LABEL_SIZES.MEDIUM]
  const itemSize = itemSizeClasses[size] ?? itemSizeClasses[LABEL_SIZES.MEDIUM]

  return (
    <ul
      className={`flex flex-wrap items-center font-semibold text-neutral-700 ${listSize} ${className}`}
      aria-label="Services included"
    >
      {items.map((item, index) => (
        <li key={item} className={`inline-flex items-center ${itemSize}`}>
          {index > 0 && (
            <span className="text-[0.65em] text-neutral-500" aria-hidden="true">
              &bull;
            </span>
          )}
          <Label highlighted={index === 0} size={size}>{item}</Label>
        </li>
      ))}
    </ul>
  )
}

export default Labels
