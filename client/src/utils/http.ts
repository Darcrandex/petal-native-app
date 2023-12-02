import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

export const http = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 10000,
})

http.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token')
  if (token) {
    config.headers.authorization = `Bearer ${token}`
  }

  return config
})

http.interceptors.response.use((response) => {
  console.log('response', response.data)

  if (!response || response.status >= 400) {
    return Promise.reject(response)
  }

  return response
})
