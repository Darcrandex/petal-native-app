/**
 * @name PostDetail
 * @description
 * @author darcrand
 */

import { faHeart as faHeartRegular, faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Button, ButtonText, HStack, Image, Pressable, ScrollView, VStack } from '@gluestack-ui/themed'
import { useQuery } from '@tanstack/react-query'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Dimensions, Modal } from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useAuthInterceptorFn } from '@/components/LoginModal'
import { mediaService } from '@/services/common'
import { postService } from '@/services/post'
import { useUserState } from '@/stores/user'
import { useState } from 'react'

export default function PostDetail() {
  const id = useLocalSearchParams().id as string
  const safeAreaInsets = useSafeAreaInsets()
  const winSize = Dimensions.get('window')
  const router = useRouter()

  const { user } = useUserState()

  const { data } = useQuery({
    queryKey: ['post', id],
    queryFn: async () => postService.getById(id),
  })

  const { data: imageSource } = useQuery({
    queryKey: ['post', 'item', 'image', data?.imageUrl],
    enabled: !!data?.imageUrl,
    placeholderData: 'https://placehold.co/300',
    initialData: 'https://placehold.co/300',
    queryFn: () => mediaService.getAccessPath(data?.imageUrl || ''),
  })

  const [visible, setVisible] = useState(false)
  const editable = user?.id === data?.userId

  const onLike = useAuthInterceptorFn(() => {
    console.log('like')
  })

  return (
    <>
      <VStack pt={safeAreaInsets.top} flex={1}>
        <HStack m='$2' space='md'>
          <Pressable p='$2' mr='auto' onPress={() => router.back()}>
            <FontAwesomeIcon icon={faAngleLeft} size={20} />
          </Pressable>

          {editable ? (
            <Pressable p='$2'>
              <FontAwesomeIcon icon={faPenToSquare} size={20} />
            </Pressable>
          ) : (
            <Pressable p='$2' onPress={onLike}>
              <FontAwesomeIcon icon={faHeartRegular} size={20} />
            </Pressable>
          )}

          <Button bgColor='$rose500' size='sm'>
            <ButtonText>采集</ButtonText>
          </Button>
        </HStack>

        <ScrollView flex={1} showsVerticalScrollIndicator={false} pb={safeAreaInsets.bottom}>
          <Pressable onPress={() => setVisible(true)}>
            <Image
              width={winSize.width}
              height={data?.imageWidth ? winSize.width * (data?.imageHeight / data?.imageWidth) : 0}
              source={imageSource}
              alt=''
              role='img'
              bgColor='$purple500'
            />
          </Pressable>
        </ScrollView>
      </VStack>

      <Modal visible={visible} transparent onRequestClose={() => setVisible(false)}>
        <ImageViewer imageUrls={[{ url: imageSource }]} onClick={() => setVisible(false)} />
      </Modal>
    </>
  )
}
