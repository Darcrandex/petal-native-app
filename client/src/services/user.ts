import { UserModel } from '@/types/user.model'
import { http } from '@/utils/http'

export const userService = {
  login: (data: Pick<UserModel, 'username' | 'password'>): Promise<string> => http.post('/auth/login', data),

  registry: (data: Pick<UserModel, 'username' | 'password'>) => http.post('/auth/registry', data),

  logout() {},

  profile: (): Promise<UserModel> => http.get('/user/profile'),

  update: (data: Partial<UserModel>): Promise<any> => http.put('/user/update', data),
}
