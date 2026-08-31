import { useCallback, useEffect, useRef, useState } from 'react'

const API_BASE_URL = (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '')

export class FetchError extends Error {
    constructor(message, status, responseData) {
        super(message)
        this.name = 'FetchError'
        this.status = status
        this.responseData = responseData
    }
}

const isJsonBody = (body) =>
    body !== null &&
    typeof body === 'object' &&
    !(body instanceof FormData) &&
    !(body instanceof Blob) &&
    !(body instanceof URLSearchParams)

const getResponseData = async (response) => {
    if (response.status === 204) return null

    const contentType = response.headers.get('content-type') ?? ''
    return contentType.includes('application/json')
        ? response.json()
        : response.text()
}

const useFetch = () => {
    const abortControllerRef = useRef(null)
    const isMountedRef = useRef(true)
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    useEffect(() => {
        isMountedRef.current = true

        return () => {
            isMountedRef.current = false
            abortControllerRef.current?.abort()
        }
    }, [])

    const reset = useCallback(() => {
        setData(null)
        setError(null)
        setIsSuccess(false)
    }, [])

    const request = useCallback(async (endpoint, options = {}) => {
        abortControllerRef.current?.abort()

        const controller = new AbortController()
        abortControllerRef.current = controller

        const headers = new Headers(options.headers)
        const shouldStringifyBody = isJsonBody(options.body)

        if (shouldStringifyBody && !headers.has('Content-Type')) {
            headers.set('Content-Type', 'application/json')
        }

        setIsLoading(true)
        setIsSuccess(false)
        setError(null)

        try {
            const url = /^https?:\/\//i.test(endpoint)
                ? endpoint
                : `${API_BASE_URL}${endpoint}`

            const response = await fetch(url, {
                ...options,
                headers,
                body: shouldStringifyBody
                    ? JSON.stringify(options.body)
                    : options.body,
                signal: controller.signal,
            })
            const responseData = await getResponseData(response)

            if (!response.ok) {
                const message = responseData?.error ||
                    responseData?.message ||
                    `Request failed with status ${response.status}`

                throw new FetchError(message, response.status, responseData)
            }

            if (isMountedRef.current) {
                setData(responseData)
                setIsSuccess(true)
            }
            return responseData
        } catch (requestError) {
            if (requestError.name !== 'AbortError' && isMountedRef.current) {
                setError(requestError)
            }

            throw requestError
        } finally {
            if (
                isMountedRef.current &&
                abortControllerRef.current === controller
            ) {
                setIsLoading(false)
                abortControllerRef.current = null
            }
        }
    }, [])

    return {
        data,
        error,
        isLoading,
        isSuccess,
        request,
        reset,
    }
}

export default useFetch;
