import { req } from '@/utils/req'

export type Post = {
  id: number
  imageUrl: string
  imageWidth: number
  imageHeight: number
  content?: string
}

export const postService = {
  create: async (post: Omit<Post, 'id'>) => req.post<string>('/post', post),

  pages: async () => req.get<Post[]>('/post'),

  getById: async (id: string) => req.get<Post>(`/post/${id}`),
}
