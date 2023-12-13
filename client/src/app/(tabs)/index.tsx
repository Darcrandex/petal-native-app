/**
 * @name Follow
 * @description 首页
 * @author darcrand
 */

import { HStack, Pressable, ScrollView, VStack } from '@gluestack-ui/themed'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useDebounceFn } from 'ahooks'
import { router } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import { Dimensions, NativeScrollEvent, NativeSyntheticEvent, RefreshControl } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import PostItem from '@/components/PostItem'
import { cateService } from '@/services/cate'
import { postService } from '@/services/post'
import { PostModel } from '@/types/post.model'
import NavBar from '@/ui/NavBar'

type Column = {
  id: string
  posts: PostModel[]
  totalHeight: number
}

export default function Follow() {
  const safeAreaInsets = useSafeAreaInsets()
  const [columns, setColumns] = useState<Column[]>([])

  const { data: categories } = useQuery({
    queryKey: ['category', 'all'],
    queryFn: () => cateService.all({ pageSize: 100 }),
    select: (res) => res.list,
  })

  const [query, setQuery] = useState({ category: '' })

  useEffect(() => {
    if (categories && categories.length > 0 && !query.category) {
      setQuery({ category: categories[0].id })
    }
  }, [query, categories])

  const {
    data: mergedPosts,
    fetchNextPage,
    hasNextPage,
    refetch,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['post', 'page', query],
    queryFn: (p) => {
      const { pageParam } = p
      return postService.pages({ ...query, page: pageParam })
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const { total, pageSize, current } = lastPage
      const maxPage = Math.ceil(total / pageSize)
      const hasNextPage = current < maxPage
      return hasNextPage ? current + 1 : undefined
    },
    getPreviousPageParam: (firstPage) => {
      return firstPage.current > 2 ? firstPage.current - 1 : undefined
    },
    select(data) {
      return data.pages.reduce<PostModel[]>((acc, cur) => {
        return [...acc, ...cur.list]
      }, [])
    },
  })

  useEffect(() => {
    if (!mergedPosts) return

    setColumns(() => {
      const winSize = Dimensions.get('window')
      // 所有图片的显示宽度
      const viewWidth = 0.5 * winSize.width

      const newColumns = [
        { id: `col-1`, posts: [], totalHeight: 0 },
        { id: `col-2`, posts: [], totalHeight: 0 },
      ]

      mergedPosts?.forEach((v) => {
        const minHeightColumn = newColumns.reduce<Column | null>(
          (acc, cur) => (!acc || cur.totalHeight < acc.totalHeight ? cur : acc),
          null,
        )

        if (minHeightColumn) {
          const isExist = minHeightColumn.posts.some((p) => p.id === v.id)
          if (!isExist) {
            // 等比缩放计算显示高度
            const viewHeight = Math.floor((v.imageHeight / v.imageWidth) * viewWidth)
            minHeightColumn.totalHeight += viewHeight
            minHeightColumn.posts.push(v)
          }
        }
      })

      return newColumns
    })
  }, [mergedPosts])

  const onNavigate = (id: string) => {
    router.push(`/post/${id}`)
  }

  // load more
  const { run: onLoadMore } = useDebounceFn(
    () => {
      if (hasNextPage) fetchNextPage()
    },
    { wait: 1000 },
  )

  const onScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent
      const paddingToBottom = 20
      const isCloseToBottom =
        contentOffset.y > 0 && layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom

      if (isCloseToBottom) onLoadMore()
    },
    [onLoadMore],
  )

  return (
    <>
      <VStack pt={safeAreaInsets.top} flex={1}>
        <NavBar
          value={query.category}
          onChange={(v) => setQuery({ category: v })}
          items={categories?.map((v) => ({ id: v.id, label: v.name }))}
        />

        <ScrollView
          flex={1}
          bg='$secondary50'
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} />}
          scrollEventThrottle={16}
          onScroll={onScroll}
        >
          <HStack margin={6}>
            {columns.map((g) => (
              <VStack key={g.id} width='$1/2'>
                {g.posts.map((v) => (
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
