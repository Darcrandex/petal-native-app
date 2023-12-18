/**
 * @name PostItem
 * @description 列表中的采集
 * @author darcrand
 */

import { Avatar, AvatarFallbackText, AvatarImage, HStack, Text, VStack, View } from '@gluestack-ui/themed'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Animated, Dimensions } from 'react-native'

import { mediaService } from '@/services/common'
import { PostModel } from '@/types/post.model'
import { getColorFromStr } from '@/utils/getColorFromStr'

const PADDING = 6

export type PostItemProps = { data: PostModel }

export default function PostItem(props: PostItemProps) {
  const viewSize = useMemo(() => {
    const winSize = Dimensions.get('window')
    const width = Math.ceil((winSize.width - 6 * PADDING) * 0.5)
    const height = Math.ceil((props.data.imageHeight / props.data.imageWidth) * width)
    return { width, height }
  }, [props.data])

  const { data: imageUri } = useQuery({
    queryKey: ['post', 'item', 'image', props.data.imageUrl],
    enabled: !!props.data.imageUrl,
    queryFn: () => mediaService.getAccessPath(props.data.imageUrl),
    placeholderData: 'https://placehold.co/300',
  })

  const bgColor = getColorFromStr(props.data.id)

  const avatarBgColor = getColorFromStr(props.data.user?.username)

  const { data: avatarUrl } = useQuery({
    queryKey: ['user', 'avatar', 'url'],
    enabled: !!props.data.user?.avatar,
    queryFn: () => mediaService.getAccessPath(props.data.user?.avatar || ''),
    placeholderData: 'https://placehold.co/300',
  })

  // 当前采集的作者所收藏的收藏夹
  const creatorFavorite = useMemo(() => {
    return props.data.favorites?.find((f) => f.userId === props.data.userId)
  }, [props.data])

  // 图片动画
  const [imageLoaded, setImageLoaded] = useState(false)
  const fadeAnim = useRef(new Animated.Value(0)).current
  useEffect(() => {
    if (imageLoaded) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start()
    }
  }, [fadeAnim, imageLoaded])

  return (
    <>
      <View margin={PADDING}>
        <View bgColor={bgColor} style={{ borderTopLeftRadius: PADDING, borderTopRightRadius: PADDING }}>
          <Animated.Image
            width={viewSize.width}
            height={viewSize.height}
            source={{ uri: imageUri }}
            style={{
              width: '100%',
              borderTopLeftRadius: PADDING,
              borderTopRightRadius: PADDING,
              opacity: fadeAnim,
            }}
            onLoadEnd={() => setImageLoaded(true)}
          />
        </View>

        <VStack
          space='md'
          bg='$white'
          p='$2'
          style={{ borderBottomLeftRadius: PADDING, borderBottomRightRadius: PADDING }}
        >
          <Text fontSize='$xs'>{props.data.content}</Text>

          <HStack space='xs' alignItems='center'>
            <Avatar size='sm' borderRadius='$full' style={{ backgroundColor: avatarBgColor }}>
              <AvatarFallbackText>{props.data.user?.nickname}</AvatarFallbackText>
              <AvatarImage source={{ uri: avatarUrl }} />
            </Avatar>

            <View>
              <Text fontSize='$xs' color='$secondary300' lineHeight='$xs'>
                {props.data.user?.nickname}
              </Text>
              <Text fontSize='$xs' color='$secondary400' lineHeight='$xs'>
                {creatorFavorite?.name}
              </Text>
            </View>
          </HStack>
        </VStack>
      </View>
    </>
  )
}
