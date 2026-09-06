import { useEffect } from 'react'
import useFetch from '@/hooks/useFetch'

const VISIT_LOGGED_KEY = 'norda:visit-logged'

const wasLoggedThisSession = () => {
    try {
        return sessionStorage.getItem(VISIT_LOGGED_KEY) === 'true'
    } catch {
        return false
    }
}

const markLoggedThisSession = () => {
    try {
        sessionStorage.setItem(VISIT_LOGGED_KEY, 'true')
    } catch {
        // Logging still succeeds when session storage is unavailable.
    }
}

const useVisitLogger = () => {
    const { request } = useFetch()

    useEffect(() => {
        if (wasLoggedThisSession()) return

        const recordVisit = async () => {
            try {
                await request('/api/visits', {
                    method: 'POST',
                    headers: { Accept: 'application/json' },
                    keepalive: true,
                })
                markLoggedThisSession()
            } catch {
                // Visitor logging must never interrupt the website experience.
            }
        }

        void recordVisit()
    }, [request])
}

export default useVisitLogger
