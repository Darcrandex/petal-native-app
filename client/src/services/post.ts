import { PageData, PageParams } from '@/types/global'
import { PostModel } from '@/types/post.model'
import { http } from '@/utils/http'

export const postService = {
  create: async (post: Omit<PostModel, 'id'>) => http.post('/post', post),

  pages: async (params?: PageParams): Promise<PageData<PostModel>> => http.get('/post', { params }),

  getById: async (id: string) => http.get<PostModel>(`/post/${id}`),
}
