import { useEffect, useState } from 'react'
import { fallbackProducts } from '@/data/products'
import useFetch from '@/hooks/useFetch'

const isUsablePlan = (plan) =>
    plan &&
    typeof plan.id === 'string' &&
    typeof plan.title === 'string' &&
    typeof plan.description === 'string' &&
    Number.isFinite(Number(plan.price)) &&
    Array.isArray(plan.features)

const usePlans = () => {
    const { isLoading, request } = useFetch()
    const [plans, setPlans] = useState(fallbackProducts)
    const [source, setSource] = useState('fallback')
    const [error, setError] = useState(null)

    useEffect(() => {
        let isCurrent = true

        const loadPlans = async () => {
            try {
                const response = await request('/api/plans')
                const apiPlans = response?.plans

                if (!Array.isArray(apiPlans) || apiPlans.length === 0 || !apiPlans.every(isUsablePlan)) {
                    throw new Error('The plans API returned invalid data.')
                }

                if (isCurrent) {
                    setPlans(apiPlans)
                    setSource('database')
                    setError(null)
                }
            } catch (requestError) {
                if (requestError.name === 'AbortError' || !isCurrent) return

                setPlans(fallbackProducts)
                setSource('fallback')
                setError(requestError)
            }
        }

        loadPlans()

        return () => {
            isCurrent = false
        }
    }, [request])

    return {
        plans,
        source,
        isFallback: source === 'fallback',
        isLoading,
        error,
    }
}

export default usePlans
