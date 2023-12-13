import * as ImagePicker from 'expo-image-picker'

import { http } from '@/utils/http'

export const mediaService = {
  upload: async (file: ImagePicker.ImagePickerAsset) => {
    const formData = new FormData()

    // 不太清楚为什么在ts中会报错
    // 但是后端接收是可行的
    // @ts-ignore
    formData.append('file', { name: file.fileName, type: file.type, uri: file.uri })

    const imageUri: string = await http.post('/media/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return imageUri
  },

  // 通过图片的url获取图片的实时访问路径
  getAccessPath: (imageUrl: string): Promise<string> => http.get('/media/access-path', { params: { imageUrl } }),
}
