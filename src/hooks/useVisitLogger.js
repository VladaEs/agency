import { useEffect } from 'react'

const API_BASE_URL = (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '')
const VISIT_LOGGED_KEY = 'norda:visit-logged'

let visitRequest = null

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

const recordVisit = () => {
    if (wasLoggedThisSession()) return Promise.resolve()
    if (visitRequest) return visitRequest

    visitRequest = fetch(`${API_BASE_URL}/api/visits`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
        },
        keepalive: true,
    })
        .then((response) => {
            if (response.ok) markLoggedThisSession()
        })
        .catch(() => {
            // Visitor logging must never interrupt the website experience.
        })
        .finally(() => {
            visitRequest = null
        })

    return visitRequest
}

const useVisitLogger = () => {
    useEffect(() => {
        void recordVisit()
    }, [])
}

export default useVisitLogger
