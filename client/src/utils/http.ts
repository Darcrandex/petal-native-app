import axios from 'axios'

export const http = axios.create({
  baseURL: process.env.EXPO_API_URL,
  timeout: 10000,
})

http.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

http.interceptors.response.use((response) => response)
