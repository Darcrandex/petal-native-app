/**
 * @name PostCreate
 * @description 新建
 * @author darcrand
 */

import { postService } from '@/services/post'
import { Button, Image, Text, Toast, ToastTitle, VStack, View, useToast } from '@gluestack-ui/themed'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import * as ImagePicker from 'expo-image-picker'
import { router } from 'expo-router'
import { head, isNil, isNotNil } from 'ramda'
import { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function PostCreate() {
  const toast = useToast()
  const safeAreaInsets = useSafeAreaInsets()
  const [imageAsset, setImage] = useState<ImagePicker.ImagePickerAsset>()
  const queryClient = useQueryClient()

  const { mutate: onSubmit } = useMutation({
    mutationFn: async () => {
      if (!imageAsset) return

      if (imageAsset.fileSize && imageAsset.fileSize > 1024 * 1024 * 5) {
        toast.show({
          placement: 'top',
          render: ({ id }) => (
            <Toast nativeID={`toast-${id}`} action='attention' variant='solid' bg='$error700'>
              <VStack space='xs'>
                <ToastTitle color='$textLight50'>image size too large</ToastTitle>
              </VStack>
            </Toast>
          ),
        })
        return
      }

      await postService.create({
        imageUrl: imageAsset.uri,
        imageWidth: imageAsset.width,
        imageHeight: imageAsset.height,
      })
    },
    onSuccess: () => {
      toast.show({
        placement: 'top',
        render: ({ id }) => (
          <Toast nativeID={`toast-${id}`} action='attention' variant='solid' bg='$success700'>
            <VStack space='xs'>
              <ToastTitle color='$textLight50'>create success</ToastTitle>
            </VStack>
          </Toast>
        ),
      })

      queryClient.invalidateQueries({ queryKey: ['post', 'page'] })
      router.back()
      router.replace('/')
    },
  })

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
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
        <Button onPress={() => router.back()}>
          <Text>back</Text>
        </Button>
        <Text>New One</Text>

        <Button onPress={pickImage}>
          <Text>select a image</Text>
        </Button>

        {imageAsset && <Image role='img' size='md' alt='selected image' source={{ uri: imageAsset.uri }} />}

        <View margin='$4'>
          <Text>{imageAsset?.width}</Text>
          <Text>{imageAsset?.height}</Text>
        </View>

        <Button disabled={isNil(imageAsset)} onPress={() => onSubmit()}>
          <Text>Submit</Text>
        </Button>
      </View>
    </>
  )
}
