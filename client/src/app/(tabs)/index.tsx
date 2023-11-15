/**
 * @name Follow
 * @description
 * @author darcrand
 */

import PostItem from '@/components/PostItem'
import { postService } from '@/services/post'
import { PostModel } from '@/types/post.model'
import { HStack, Pressable, ScrollView, Text, VStack } from '@gluestack-ui/themed'
import { useQuery } from '@tanstack/react-query'
import { router } from 'expo-router'
import { isNil } from 'ramda'
import { useEffect, useState } from 'react'
import { RefreshControl } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type Column = {
  id: string
  posts: PostModel[]
  totalHeight: number
}

export default function Follow() {
  const safeAreaInsets = useSafeAreaInsets()
  const [columns, setColumns] = useState<Column[]>([])

  const { data, refetch, isLoading } = useQuery({
    queryKey: ['post', 'page'],
    queryFn: async () => postService.pages(),
  })

  useEffect(() => {
    if (isNil(data)) return
    setColumns(() => {
      const newColumns = [
        { id: `col-1`, posts: [], totalHeight: 0 },
        { id: `col-2`, posts: [], totalHeight: 0 },
      ]

      data.forEach((v) => {
        const minHeightColumn = newColumns.reduce<Column | null>(
          (acc, cur) => (!acc || cur.totalHeight < acc.totalHeight ? cur : acc),
          null
        )

        if (minHeightColumn) {
          const isExist = minHeightColumn.posts.some((p) => p.id === v.id)
          if (!isExist) {
            minHeightColumn.posts.push(v)
            minHeightColumn.totalHeight += v.imageHeight
          }
        }
      })

      return newColumns
    })
  }, [data])

  const onNavigate = (id: number) => {
    router.push(`/post/${id}`)
  }

  return (
    <>
      <VStack pt={safeAreaInsets.top} flex={1} bg='$blue400'>
        <HStack justifyContent='center'>
          <Text>Follow</Text>
        </HStack>

        <ScrollView
          bg='$green300'
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} />}
        >
          <HStack margin={6}>
            {columns.map((g) => (
              <VStack key={g.id} width='$1/2'>
                {g.posts.map((v, i) => (
                  <Pressable key={v.id} onPress={() => onNavigate(v.id)}>
                    <PostItem data={v} />
                  </Pressable>
                ))}
              </VStack>
            ))}
          </HStack>
        </ScrollView>
      </VStack>
    </>
  )
}
