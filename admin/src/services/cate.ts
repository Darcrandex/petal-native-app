import { PageData, PageParams } from '@/types/global'
import { http } from '@/utils/http'

export const cateService = {
  pages: (params?: PageParams): Promise<PageData> => http.get('/category', { params }),

  one: (id: string): Promise<any> => http.get(`/category/${id}`),

  add: (data: any) => http.post('/category', data),

  update: ({ id, ...data }: any) => http.put(`/category/${id}`, data),

  remove: (id: string) => http.delete(`/category/${id}`),
}
