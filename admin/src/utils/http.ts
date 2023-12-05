import axios from 'axios'

export const http = axios.create({
  baseURL: import.meta.env.PROD ? import.meta.env.VITE_API_URI : '/api',
  timeout: 10000,
})

http.interceptors.request.use(async (config) => {
  const token = window.localStorage.getItem('token')
  if (token) {
    config.headers.authorization = `Bearer ${token}`
  }

  return config
})

http.interceptors.response.use(
  (response) => {
    console.log('response', response.data)

    if (!response || response.status >= 400) {
      return Promise.reject(response)
    }

    return response
  },
  (err) => {
    if (err.response.data.statusCode === 401) {
      window.localStorage.removeItem('token')
      window.location.href = '/login'
    }
  }
)
