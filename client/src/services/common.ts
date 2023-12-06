import { http } from '@/utils/http'

export const mediaService = {
  upload: async (file: any) => {
    const formData = new FormData()
    formData.append('file', file)

    const res = await http.post('/media/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return res
  },
}
