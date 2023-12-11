/**
 * @name PostDetail
 * @description
 * @author darcrand
 */

import { mediaService } from '@/services/common'
import { postService } from '@/services/post'
import { ArrowLeftIcon, HStack, Icon, Image, Pressable, ScrollView, VStack } from '@gluestack-ui/themed'
import { useQuery } from '@tanstack/react-query'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Dimensions } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function PostDetail() {
  const id = useLocalSearchParams().id as string
  const safeAreaInsets = useSafeAreaInsets()
  const winSize = Dimensions.get('window')
  const router = useRouter()

  const { data } = useQuery({
    queryKey: ['post', id],
    queryFn: async () => postService.getById(id),
  })

  const { data: imageSource } = useQuery({
    queryKey: ['post', 'item', 'image', data?.imageUrl],
    enabled: !!data?.imageUrl,
    queryFn: async () => {
      const res = await mediaService.getAccessPath(data?.imageUrl || '')
      return { uri: res }
    },
  })

  return (
    <>
      <VStack pt={safeAreaInsets.top} pb={safeAreaInsets.bottom} flex={1}>
        <HStack>
          <Pressable onPress={() => router.back()}>
            <Icon as={ArrowLeftIcon} m='$2' w='$6' h='$6' />
          </Pressable>
        </HStack>

        <ScrollView flex={1} showsVerticalScrollIndicator={false}>
          <Image
            width={winSize.width}
            height={data?.imageWidth ? winSize.width * (data?.imageHeight / data?.imageWidth) : 0}
            source={imageSource || { uri: data?.imageUrl }}
            alt=''
            role='img'
            bgColor='$purple500'
          />
        </ScrollView>
      </VStack>
    </>
  )
}
