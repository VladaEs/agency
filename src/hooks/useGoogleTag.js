import { useEffect } from 'react'

import useFetch from '@/hooks/useFetch'

let initialized = false

export default function useGoogleTag() {
    const { request } = useFetch()

    useEffect(() => {
        if (initialized) return

        let isCurrent = true

        const loadGoogleTag = async () => {
            try {
                const config = await request('/api/config', {
                    headers: { Accept: 'application/json' },
                })
                const googleTagId = config?.googleTagId

                if (!isCurrent || initialized || typeof googleTagId !== 'string' || !/^AW-[0-9]+$/.test(googleTagId)) return

                window.dataLayer = window.dataLayer || []
                window.gtag = window.gtag || function () { window.dataLayer.push(arguments) }
                window.gtag('js', new Date())
                window.gtag('config', googleTagId)

                const script = document.createElement('script')
                script.async = true
                script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(googleTagId)}`
                document.head.appendChild(script)
                initialized = true
            } catch {
                // Tracking failures and cancelled requests must not interrupt the app.
            }
        }

        void loadGoogleTag()

        return () => {
            isCurrent = false
        }
    }, [request])
}
