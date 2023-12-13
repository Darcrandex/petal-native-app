import { PageData, PageParams } from '@/types/global'
import { PostModel } from '@/types/post.model'
import { http } from '@/utils/http'

export const postService = {
  create: async (post: Partial<PostModel>) => http.post('/post', post),

  pages: async (params?: PageParams): Promise<PageData<PostModel>> => http.get('/post', { params }),

  getById: async (id: string): Promise<PostModel> => http.get(`/post/${id}`),
}
