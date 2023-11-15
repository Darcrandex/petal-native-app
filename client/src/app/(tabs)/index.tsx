/**
 * @name Follow
 * @description
 * @author darcrand
 */

import { postService } from '@/services/post'
import { ScrollView, Text, View } from '@gluestack-ui/themed'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'expo-router'
import { useState } from 'react'
import { RefreshControl, StyleSheet } from 'react-native'

export default function Follow() {
  const { data, refetch } = useQuery({
    queryKey: ['post', 'page'],
    queryFn: async () => postService.pages(),
  })

  const [refreshing, setRefreshing] = useState(false)
  const onRefresh = async () => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {data?.data.map((v) => (
          <Link key={v.id} href={`/post/${v.id}`}>
            <View margin='$6'>
              <Text>{v.imageUrl.slice(-20)}</Text>
              <Text>{v.content}</Text>
            </View>
          </Link>
        ))}
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'pink',
  },
})
