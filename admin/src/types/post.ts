export type PostItem = {
  id: string
  imageUrl: string
  imageWidth: number
  imageHeight: number
  content?: string
  status?: 'saved' | 'published' | 'rejected'
}
