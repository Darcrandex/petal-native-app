import { CategoryModel } from '@/types/category.model'
import { PageData, PageParams } from '@/types/global'
import { http } from '@/utils/http'

export const cateService = {
  all: async (params?: PageParams): Promise<PageData<CategoryModel>> => http.get('/category', { params }),
}
