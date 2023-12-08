import { PageData } from '@/types/global'
import { PostModel } from '@/types/post.model'
import { http } from '@/utils/http'

export const postService = {
  create: async (post: Omit<PostModel, 'id'>) => http.post<string>('/post', post),

  pages: async () => http.get<PageData<PostModel>>('/post'),

  getById: async (id: string) => http.get<PostModel>(`/post/${id}`),
}
