import { CategoryModel } from '@/types/category.model'
import { PageParams } from '@/types/global'
import { http } from '@/utils/http'

export const cateService = {
  all: async (params?: PageParams): Promise<CategoryModel[]> => http.get('/category', { params }),
}
