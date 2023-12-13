import { UserModel } from './user.model'

export type FavoriteModel = {
  id: string
  name: string
  desc?: string
  user?: UserModel
}
