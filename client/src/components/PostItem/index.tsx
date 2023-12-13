/**
 * @name PostItem
 * @description
 * @author darcrand
 */

import { mediaService } from '@/services/common'
import { PostModel } from '@/types/post.model'
import { Avatar, AvatarFallbackText, AvatarImage, HStack, Image, Text, VStack, View } from '@gluestack-ui/themed'
import { useQuery } from '@tanstack/react-query'
import { hsl } from 'color'
import { useMemo } from 'react'
import { Dimensions } from 'react-native'

const PADDING = 6

export type PostItemProps = { data: PostModel }

export default function PostItem(props: PostItemProps) {
  const viewSize = useMemo(() => {
    const winSize = Dimensions.get('window')
    const width = Math.floor((winSize.width - 6 * PADDING) * 0.5)
    const height = Math.floor((props.data.imageHeight / props.data.imageWidth) * width)
    return { width, height }
  }, [props.data])

  const { data: imageSource } = useQuery({
    queryKey: ['post', 'item', 'image', props.data.imageUrl],
    enabled: !!props.data.imageUrl,
    queryFn: async () => {
      const res = await mediaService.getAccessPath(props.data.imageUrl)
      return { uri: res }
    },
  })

  const bgColor = useMemo(() => {
    const h = props.data.id.split('').reduce((prev, curr) => prev + curr.charCodeAt(0), 0)
    return hsl(h, 85, 65).rgb().toString()
  }, [props.data.id])

  const avatarBgColor = useMemo(() => {
    if (!props.data.user?.username) return ''
    const h = props.data.user?.username.split('').reduce((prev, curr) => prev + curr.charCodeAt(0), 0)
    return hsl(h, 85, 65).rgb().toString()
  }, [props.data.user?.username])

  const { data: avatarUrl } = useQuery({
    queryKey: ['user', 'avatar', 'url'],
    enabled: !!props.data.user?.avatar,
    queryFn: () => mediaService.getAccessPath(props.data.user?.avatar || ''),
  })

  const matchedFavorite = useMemo(() => {
    return props.data.favorites?.find((f) => f.user?.id === props.data.user?.id)
  }, [props.data])

  return (
    <>
      <View margin={PADDING}>
        <Image
          width={viewSize.width}
          height={viewSize.height}
          source={imageSource?.uri || ''}
          alt=''
          role='img'
          style={{ borderTopLeftRadius: PADDING, borderTopRightRadius: PADDING, backgroundColor: bgColor }}
        />

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
              <AvatarImage source={{ uri: avatarUrl || 'https://i.pravatar.cc/300' }} />
            </Avatar>

            <View>
              <Text fontSize='$xs' color='$secondary300' lineHeight='$xs'>
                {props.data.user?.nickname}
              </Text>
              <Text fontSize='$xs' color='$secondary400' lineHeight='$xs'>
                {matchedFavorite?.name}
              </Text>
            </View>
          </HStack>
        </VStack>
      </View>
    </>
  )
}
