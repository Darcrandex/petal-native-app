import { PageData, PageParams } from '@/types/common'
import { http } from '@/utils/http'

export const cateService = {
  pages: (params?: PageParams) => http.get<PageData>('/cate', { params }),

  add: (data: any) => http.post('/cate', data),

  update: (data: any) => http.put(`/cate/${data.id}`, data),

  remove: (id: string) => http.delete(`/cate/${id}`),
}
