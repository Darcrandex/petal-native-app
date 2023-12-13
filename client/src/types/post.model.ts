import { CategoryModel } from './category.model'
import { FavoriteModel } from './favorite.model'
import { UserModel } from './user.model'

export type PostModel = {
  id: string
  imageUrl: string
  imageWidth: number
  imageHeight: number
  content?: string
  status?: 'saved' | 'published' | 'rejected'

  favoriteId?: string
  categoryId?: string
  categories?: CategoryModel[]
  favorites?: FavoriteModel[]
  user?: UserModel
}
