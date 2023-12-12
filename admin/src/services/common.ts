import { http } from '@/utils/http'

export const commonService = {
  getImageAccessPath: (imageUrl: string): Promise<string> => http.get('/media/access-path', { params: { imageUrl } }),
}
