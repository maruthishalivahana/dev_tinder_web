import axios from 'axios'
import { BASE_URL } from './constants'

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
})

// Debugging interceptors: logs request and response headers to help trace auth cookie
api.interceptors.request.use(
    (config) => {
        try {
            // Note: browsers don't expose HttpOnly cookies to JS; this will show cookie header only if it's sent
            console.debug('[api] Request:', config.method?.toUpperCase(), config.url)
            console.debug('[api] Request headers:', config.headers)
        } catch (e) {
            console.debug('[api] Request logging failed', e)
        }
        return config
    },
    (error) => {
        console.debug('[api] Request error', error)
        return Promise.reject(error)
    }
)

api.interceptors.response.use(
    (response) => {
        try {
            console.debug('[api] Response:', response.status, response.config.url)
            console.debug('[api] Response headers:', response.headers)
        } catch (e) {
            console.debug('[api] Response logging failed', e)
        }
        return response
    },
    (error) => {
        try {
            console.debug('[api] Response error:', error?.response?.status, error?.response?.config?.url)
            console.debug('[api] Response error headers:', error?.response?.headers)
        } catch (e) {
            console.debug('[api] Response error logging failed', e)
        }
        return Promise.reject(error)
    }
)

export default api
