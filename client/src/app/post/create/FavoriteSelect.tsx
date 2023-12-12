/**
 * @name FavoriteSelect
 * @description
 * @author darcrand
 */

import { favoriteService } from '@/services/favorite'
import { CloseIcon, Icon, Input, InputField, Pressable, Text, View } from '@gluestack-ui/themed'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useControllableValue } from 'ahooks'
import { useState } from 'react'
import { Modal } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export type FavoriteSelectProps = {
  value?: string
  onChange?: (value?: string) => void
}

export default function FavoriteSelect(props: FavoriteSelectProps) {
  const [value, onChange] = useControllableValue(props)
  const [open, setOpen] = useState(false)
  const safeAreaInsets = useSafeAreaInsets()

  const { data: favorites } = useQuery({
    queryKey: ['favorite', 'all'],
    queryFn: () => favoriteService.all(),
  })

  const valueLabel = favorites?.find((f) => f.id === value)?.name || '请选择画板'

  const [keyword, setKeyword] = useState('')
  const filtered = favorites?.filter((f) => !keyword || f.name.includes(keyword))
  const canCreate = keyword && !favorites?.some((item) => item.name === keyword)

  const queryClient = useQueryClient()
  const { mutate: createFavorite } = useMutation({
    mutationFn: () => favoriteService.add({ name: keyword }),
    onSuccess: (createdId) => {
      queryClient.invalidateQueries({ queryKey: ['favorite', 'all'] })
      onChange(createdId)
      setOpen(false)
    },
  })

  return (
    <>
      <Pressable onPress={() => setOpen(true)}>
        <Text p='$4'>{valueLabel}</Text>
      </Pressable>

      <Modal visible={open} transparent animationType='slide' onRequestClose={() => setOpen(false)}>
        <View h='$full' bg='white' mt={safeAreaInsets.top}>
          <Pressable onPress={() => setOpen(false)}>
            <Icon as={CloseIcon} m='$2' w='$6' h='$6' />
          </Pressable>

          <Input>
            <InputField placeholder='搜索画板' value={keyword} onChange={(e) => setKeyword(e.nativeEvent.text)} />
          </Input>

          {canCreate && (
            <Pressable my='$6' onPress={() => createFavorite()}>
              <Text>新建 「{keyword}」 画板</Text>
            </Pressable>
          )}

          {filtered?.map((f) => (
            <Pressable
              key={f.id}
              onPress={() => {
                onChange(f.id)
                setOpen(false)
              }}
            >
              <Text p='$2' m='$2'>
                {f.name}
              </Text>
            </Pressable>
          ))}
        </View>
      </Modal>
    </>
  )
}
