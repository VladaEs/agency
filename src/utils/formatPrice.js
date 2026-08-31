export const DEFAULT_CURRENCY_CODE = 'GBP'

const getCurrencyCode = (currency) =>
    typeof currency === 'string' && /^[A-Z]{3}$/.test(currency)
        ? currency
        : DEFAULT_CURRENCY_CODE

export const formatPrice = (price, currency = DEFAULT_CURRENCY_CODE) =>
    new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: getCurrencyCode(currency),
        maximumFractionDigits: Number.isInteger(Number(price)) ? 0 : 2,
    }).format(Number(price) || 0)
