import { http } from '@/utils/http'
import * as ImagePicker from 'expo-image-picker'

export const mediaService = {
  upload: async (file: ImagePicker.ImagePickerAsset) => {
    const formData = new FormData()

    // 有问题
    // 插个眼
    const response = await fetch(file.uri)
    const blob = await response.blob()
    formData.append('file', blob)

    const res = await http.post('/media/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return res
  },
}
