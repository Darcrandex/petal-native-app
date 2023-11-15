import axios from 'axios'

export const req = axios.create({
  baseURL: 'http://192.168.30.111:4060/',
  timeout: 10000,
})
