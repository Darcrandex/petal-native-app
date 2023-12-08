import { PageData, PageParams } from '@/types/global'
import { http } from '@/utils/http'

export const postService = {
  pages: (params?: PageParams): Promise<PageData> => http.get('/post', { params }),

  add: (data: any) => http.post('/post', data),

  update: (data: any) => http.put(`/post/${data.id}`, data),

  remove: (id: string) => http.delete(`/post/${id}`),
}
