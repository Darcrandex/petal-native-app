/**
 * @name PostDetail
 * @description 采集详情
 * @author darcrand
 */

import { faHeart as faHeartRegular, faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Button, ButtonText, HStack, Pressable, ScrollView, Text, VStack, View } from '@gluestack-ui/themed'
import { useQuery } from '@tanstack/react-query'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Dimensions, Modal } from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useAuthInterceptorFn } from '@/components/LoginModal'
import { useUserInfo } from '@/loaders/useUserInfo'
import { postService } from '@/services/post'
import FadeImage from '@/ui/FadeImage'
import { getColorFromStr } from '@/utils/getColorFromStr'
import { useState } from 'react'

export default function PostDetail() {
  const id = useLocalSearchParams().id as string
  const safeAreaInsets = useSafeAreaInsets()
  const winSize = Dimensions.get('window')
  const router = useRouter()
  const { data: userInfo } = useUserInfo()

  const { data } = useQuery({
    queryKey: ['post', id],
    queryFn: async () => postService.getById(id),
  })

  const bgColor = getColorFromStr(id)

  const [visible, setVisible] = useState(false)
  const isCreator = userInfo?.id === data?.userId

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

          {isCreator ? (
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
            <View bgColor={bgColor}>
              <FadeImage
                width={winSize.width}
                height={data?.imageWidth ? winSize.width * (data?.imageHeight / data?.imageWidth) : 0}
                source={data?.imageUrl}
              />
            </View>
          </Pressable>

          {/* 创建者 */}
          <Text>{data?.userId}</Text>

          {/* 创建者对当前帖子的（第一个）收藏夹 */}
          {/* 帖子可以被它的创建者收藏，且允许被收藏到不同的收藏夹中 */}
          {/* 只获取第一个收藏夹 */}
          <Text>收藏于 【收藏夹名称】</Text>
        </ScrollView>
      </VStack>

      <Modal visible={visible} transparent onRequestClose={() => setVisible(false)}>
        <ImageViewer imageUrls={[{ url: data?.imageUrl || '' }]} onClick={() => setVisible(false)} />
      </Modal>
    </>
  )
}
