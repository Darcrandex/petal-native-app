import { FavoriteModel } from '@/types/favorite.model'
import { http } from '@/utils/http'

export const favoriteService = {
  add: async (favorite: Partial<FavoriteModel>): Promise<string> => http.post('/favorite', favorite),

  all: async (): Promise<FavoriteModel[]> => http.get('/favorite/user'),
}
