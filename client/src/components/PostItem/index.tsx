/**
 * @name PostItem
 * @description
 * @author darcrand
 */

import { mediaService } from '@/services/common'
import { PostModel } from '@/types/post.model'
import { Image, Text, View } from '@gluestack-ui/themed'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { Dimensions } from 'react-native'

export type PostItemProps = { data: PostModel }

export default function PostItem(props: PostItemProps) {
  const viewSize = useMemo(() => {
    const winSize = Dimensions.get('window')
    const width = Math.floor((winSize.width - 36) * 0.5)
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

  return (
    <>
      <View margin={6} bgColor='$orange300'>
        <Image
          width={viewSize.width}
          height={viewSize.height}
          source={imageSource || { uri: props.data.imageUrl }}
          alt=''
          role='img'
          bgColor='$purple500'
        />

        <Text>desc {props.data.content}</Text>
        <Text>
          size {props.data.imageWidth}x{props.data.imageHeight}
        </Text>
        <Text>
          {viewSize.width}x{viewSize.height}
        </Text>
      </View>
    </>
  )
}
