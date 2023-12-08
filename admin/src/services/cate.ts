import { PageData, PageParams } from '@/types/global'
import { http } from '@/utils/http'

export const cateService = {
  pages: (params?: PageParams): Promise<PageData> => http.get('/cate', { params }),

  one: (id: string): Promise<any> => http.get(`/cate/${id}`),

  add: (data: any) => http.post('/cate', data),

  update: ({ id, ...data }: any) => http.put(`/cate/${id}`, data),

  remove: (id: string) => http.delete(`/cate/${id}`),
}
