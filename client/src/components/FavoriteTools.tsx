/**
 * @name FavoriteTools
 * @description 新建采集时使用到的收藏夹管理组件
 * @author darcrand
 */

import { favoriteService } from '@/services/favorite'
import { Input, InputField, Pressable, Text, View } from '@gluestack-ui/themed'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useControllableValue } from 'ahooks'
import { isNil } from 'ramda'
import { useMemo, useState } from 'react'

export type FavoriteToolsProps = {
  selected?: string
  onSelect?: (key: string) => void
}

export default function FavoriteTools(props: FavoriteToolsProps) {
  const [selected, onSelect] = useControllableValue(props, { valuePropName: 'selected', trigger: 'onSelect' })

  const { data } = useQuery({
    queryKey: ['favorite', 'all'],
    queryFn: () => favoriteService.all(),
  })

  const [keyword, setKeyword] = useState('')
  const filteredData = useMemo(
    () => data?.filter((item) => isNil(keyword) || item.name.includes(keyword)),
    [data, keyword]
  )

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: () => favoriteService.add({ name: keyword }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorite', 'all'] })
    },
  })

  return (
    <>
      <View>
        <Input variant='outline' size='md'>
          <InputField placeholder='搜索画板' value={keyword} onChange={(e) => setKeyword(e.nativeEvent.text)} />
        </Input>

        {!!keyword.trim() && (
          <Pressable my='$6' onPress={() => mutate()}>
            <Text>新建{keyword}画板</Text>
          </Pressable>
        )}
      </View>

      {filteredData?.map((item) => (
        <Pressable
          key={item.id}
          my='$4'
          bg={selected === item.id ? '$primary500' : 'transparent'}
          onPress={() => onSelect(item.id)}
        >
          <View>
            <Text>{item.name}</Text>
          </View>
        </Pressable>
      ))}
    </>
  )
}
