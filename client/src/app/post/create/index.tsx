/**
 * @name PostCreate
 * @description 新建
 * @author darcrand
 */

import FavoriteTools from '@/components/FavoriteTools'
import { mediaService } from '@/services/common'
import { postService } from '@/services/post'
import {
  CheckIcon,
  CloseIcon,
  HStack,
  Icon,
  Image,
  Pressable,
  Text,
  Textarea,
  TextareaInput,
  View,
} from '@gluestack-ui/themed'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import * as ImagePicker from 'expo-image-picker'
import { router } from 'expo-router'
import { head, isNil, isNotNil } from 'ramda'
import { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function PostCreate() {
  const safeAreaInsets = useSafeAreaInsets()
  const queryClient = useQueryClient()
  const [tabKey, setTabKey] = useState('1')

  const [imageAsset, setImage] = useState<ImagePicker.ImagePickerAsset>()
  const [favoriteId, setFavoriteId] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [content, setContent] = useState('')

  const { mutate: onSubmit } = useMutation({
    mutationFn: async () => {
      if (!imageAsset) return
      const res = await mediaService.upload(imageAsset)
      await postService.create({
        imageUrl: res,
        imageWidth: imageAsset.width,
        imageHeight: imageAsset.height,
        favoriteId,
        categoryId,
        content,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', 'page'] })
      router.back()
      router.replace('/')
    },
  })

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    })

    if (!result.canceled && isNotNil(result.assets)) {
      setImage(head(result.assets))
    }
  }

  return (
    <>
      <View style={{ paddingTop: safeAreaInsets.top, paddingBottom: safeAreaInsets.bottom }}>
        <HStack justifyContent='space-between'>
          <Pressable onPress={() => router.back()}>
            <Icon as={CloseIcon} m='$2' w='$6' h='$6' />
          </Pressable>

          <Pressable disabled={isNil(imageAsset)} onPress={() => onSubmit()}>
            <Icon as={CheckIcon} m='$2' w='$6' h='$6' />
          </Pressable>
        </HStack>

        <Pressable onPress={pickImage}>
          <Image role='img' bgColor='$gray' size='md' alt='selected image' source={{ uri: imageAsset?.uri }} />
        </Pressable>

        <View margin='$4'>
          <Text>{imageAsset?.width}</Text>
          <Text>{imageAsset?.height}</Text>
          <Text>{imageAsset?.fileSize}</Text>
        </View>

        <Textarea size='md' w='$full'>
          <TextareaInput placeholder='Your text goes here...' value={content} onChangeText={setContent} />
        </Textarea>

        <FavoriteTools selected={favoriteId} onSelect={setFavoriteId} />
      </View>
    </>
  )
}
