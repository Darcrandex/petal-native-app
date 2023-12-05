import { http } from '@/utils/http'

export const userService = {
  login: (data: any) => http.post<string>('/auth/login', data),

  registry: (data: any) => http.post<string>('/auth/registry', data),

  logout() {},

  profile: () => http.get('/auth/profile'),
}
