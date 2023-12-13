/**
 * @name PostCreate
 * @description 新建页面
 * @author darcrand
 */

import {
  CheckIcon,
  CloseIcon,
  HStack,
  Icon,
  Image,
  Pressable,
  Textarea,
  TextareaInput,
  View,
} from '@gluestack-ui/themed'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import * as ImagePicker from 'expo-image-picker'
import { router } from 'expo-router'
import { isNil } from 'ramda'
import { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import CategorySelect from './CategorySelect'
import FavoriteSelect from './FavoriteSelect'

import { mediaService } from '@/services/common'
import { postService } from '@/services/post'

type FormValues = {
  imageAsset?: ImagePicker.ImagePickerAsset
  favoriteId?: string
  categoryId?: string
  content?: string
}

export default function PostCreate() {
  const safeAreaInsets = useSafeAreaInsets()
  const queryClient = useQueryClient()

  const [values, setValues] = useState<FormValues>({
    imageAsset: undefined,
    favoriteId: '',
    categoryId: '',
    content: '',
  })

  const canSubmit = Boolean(values.categoryId && values.favoriteId && values.imageAsset)

  const { mutate: onSubmit } = useMutation({
    mutationFn: async () => {
      const { imageAsset, favoriteId, categoryId, content } = values
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
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    })

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setValues((prev) => ({ ...prev, imageAsset: result.assets?.[0] }))
    }
  }

  return (
    <>
      <View style={{ paddingTop: safeAreaInsets.top, paddingBottom: safeAreaInsets.bottom }}>
        <HStack justifyContent='space-between'>
          <Pressable onPress={() => router.back()}>
            <Icon as={CloseIcon} m='$2' w='$6' h='$6' />
          </Pressable>

          <Pressable disabled={isNil(values.imageAsset)} onPress={() => onSubmit()}>
            <Icon as={CheckIcon} m='$2' w='$6' h='$6' color={canSubmit ? '$success300' : '$red200'} />
          </Pressable>
        </HStack>

        <Pressable onPress={pickImage}>
          <Image
            role='img'
            bg='$warmGray200'
            size='md'
            alt='selected image'
            source={{ uri: values.imageAsset?.uri || 'https://placehold.co/300' }}
          />
        </Pressable>

        <Textarea size='md' w='$full'>
          <TextareaInput
            placeholder='Your text goes here...'
            value={values.content}
            onChangeText={(val) => setValues((prev) => ({ ...prev, content: val }))}
          />
        </Textarea>

        <FavoriteSelect
          value={values.favoriteId}
          onChange={(val) => setValues((prev) => ({ ...prev, favoriteId: val }))}
        />

        <CategorySelect
          value={values.categoryId}
          onChange={(val) => setValues((prev) => ({ ...prev, categoryId: val }))}
        />
      </View>
    </>
  )
}
