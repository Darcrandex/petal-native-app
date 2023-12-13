/**
 * @name Profile
 * @description
 * @author darcrand
 */

import {
  ArrowLeftIcon,
  Button,
  CheckIcon,
  HStack,
  Icon,
  Image,
  Input,
  InputField,
  Pressable,
  Text,
  VStack,
} from '@gluestack-ui/themed'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import * as ImagePicker from 'expo-image-picker'
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { mediaService } from '@/services/common'
import { userService } from '@/services/user'

export default function Profile() {
  const router = useRouter()
  const safeAreaInsets = useSafeAreaInsets()
  const queryClient = useQueryClient()

  const [imageAsset, setImageAsset] = useState<ImagePicker.ImagePickerAsset>()
  const [nickname, setNickname] = useState<string | undefined>('')

  const { data: userInfo } = useQuery({
    queryKey: ['user', 'profile'],
    queryFn: async () => userService.profile(),
    retry: false,
  })

  useEffect(() => {
    if (userInfo) {
      setNickname(userInfo.nickname)
    }
  }, [userInfo])

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    })

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImageAsset(result.assets[0])
    }
  }

  const { mutate: onSubmit } = useMutation({
    mutationFn: async () => {
      let avatar: string | undefined = undefined

      if (imageAsset) {
        avatar = await mediaService.upload(imageAsset)
      }

      const merged = { nickname, avatar: avatar || userInfo?.avatar }
      await userService.update(merged)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
      router.back()
    },
  })

  return (
    <>
      <VStack pt={safeAreaInsets.top}>
        <HStack justifyContent='space-between'>
          <Pressable onPress={() => router.back()}>
            <Icon as={ArrowLeftIcon} m='$2' w='$6' h='$6' />
          </Pressable>

          <Button onPress={() => onSubmit()}>
            <Icon as={CheckIcon} m='$2' w='$6' h='$6' />
          </Button>
        </HStack>

        <Text>Profile</Text>

        <Input>
          <InputField placeholder='昵称' value={nickname} onChange={(e) => setNickname(e.nativeEvent.text)} />
        </Input>

        <Pressable onPress={pickImage}>
          <Image role='img' bg='$warmGray200' size='md' alt='selected image' source={{ uri: imageAsset?.uri }} />
        </Pressable>
      </VStack>
    </>
  )
}
