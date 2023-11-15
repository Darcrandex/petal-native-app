/**
 * @name Follow
 * @description
 * @author darcrand
 */

import { HStack, ScrollView, Text, VStack, View } from '@gluestack-ui/themed'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'expo-router'
import { useState } from 'react'
import { RefreshControl } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import items from '@/mock/posts.json'
import { PostModel } from '@/types/post.model'

export default function Follow() {
  const safeAreaInsets = useSafeAreaInsets()

  const { data, refetch } = useQuery({
    queryKey: ['post', 'page'],
    queryFn: async () => items as PostModel[],
  })

  const [refreshing, setRefreshing] = useState(false)
  const onRefresh = async () => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }

  return (
    <>
      <VStack pt={safeAreaInsets.top} flex={1} bg='$blue400'>
        <HStack justifyContent='center'>
          <Text>Follow</Text>
        </HStack>

        <ScrollView
          flex={1}
          bg='$green300'
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          {data?.map((v) => (
            <Link key={v.id} href={`/post/${v.id}`}>
              <View margin='$6'>
                <Text>{v.imageUrl.slice(-20)}</Text>
                <Text>{v.content}</Text>
              </View>
            </Link>
          ))}
        </ScrollView>
      </VStack>
    </>
  )
}
