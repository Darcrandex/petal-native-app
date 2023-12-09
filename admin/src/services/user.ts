import { http } from '@/utils/http'

export const userService = {
  login: (data: any): Promise<string> => http.post('/auth/login', data),

  registry: (data: any) => http.post('/auth/registry', data),

  logout() {},

  profile: () => http.get('/auth/profile'),
}
