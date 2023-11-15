/**
 * @name PostDetail
 * @description
 * @author darcrand
 */

import { postService } from '@/services/post'
import { Button, Text, View } from '@gluestack-ui/themed'
import { useQuery } from '@tanstack/react-query'
import { router, useLocalSearchParams } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function PostDetail() {
  const id = useLocalSearchParams().id as string
  const safeAreaInsets = useSafeAreaInsets()

  const { data } = useQuery({
    queryKey: ['post', id],
    queryFn: async () => postService.getById(id),
  })

  return (
    <>
      <View style={{ paddingTop: safeAreaInsets.top, paddingBottom: safeAreaInsets.bottom }}>
        <Button onPress={() => router.back()}>
          <Text>go back</Text>
        </Button>

        <Text>detail</Text>
        <Text margin='$4'>{JSON.stringify(data, null, 2)}</Text>
      </View>
    </>
  )
}
