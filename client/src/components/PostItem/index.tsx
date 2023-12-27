/**
 * @name PostItem
 * @description 列表中的采集
 * @author darcrand
 */

import { Avatar, AvatarFallbackText, AvatarImage, HStack, Text, VStack, View } from '@gluestack-ui/themed'
import { useMemo } from 'react'
import { Dimensions } from 'react-native'

import { PostModel } from '@/types/post.model'
import FadeImage from '@/ui/FadeImage'
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

  const bgColor = getColorFromStr(props.data.id)

  const avatarBgColor = getColorFromStr(props.data.user?.username)

  // 当前采集的作者所收藏的收藏夹
  const creatorFavorite = useMemo(() => {
    return props.data.favorites?.find((f) => f.userId === props.data.userId)
  }, [props.data])

  return (
    <>
      <View margin={PADDING}>
        <View bgColor={bgColor} style={{ borderTopLeftRadius: PADDING, borderTopRightRadius: PADDING }}>
          <FadeImage
            width={viewSize.width}
            height={viewSize.height}
            source={props.data.imageUrl}
            style={{
              borderTopLeftRadius: PADDING,
              borderTopRightRadius: PADDING,
            }}
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
              <AvatarImage source={{ uri: props.data.user?.avatar || '' }} />
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
