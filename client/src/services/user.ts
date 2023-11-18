import { UserModel } from '@/types/user.model'
import { http } from '@/utils/http'

export const userService = {
  login: (data: Pick<UserModel, 'username' | 'password'>) => http.post<string>('/user/login', data),

  registry: (data: Pick<UserModel, 'username' | 'password'>) => http.post<string>('/user/registry', data),

  logout() {},
}
