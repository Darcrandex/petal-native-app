import { PostModel } from '@/types/post.model'
import { http } from '@/utils/http'
import { uuid } from '@/utils/uuid'

export const postService = {
  create: async (post: Omit<PostModel, 'id'>) => http.post<string>('/post', post),

  // pages: async () => http.get<PostModel[]>('/post'),
  pages: async () =>
    Array.from({ length: 20 }).map(() => {
      return {
        id: uuid(),
        imageUrl: 'https://picsum.photos?random=dybvbubpvmg',
        imageWidth: 200 + ~~(Math.random() * 200),
        imageHeight: 200 + ~~(Math.random() * 300),
      }
    }),

  getById: async (id: string) => http.get<PostModel>(`/post/${id}`),
}
