/**
 * @name CategorySelect
 * @description
 * @author darcrand
 */

import { cateService } from '@/services/cate'
import { CloseIcon, Icon, Pressable, Text, View } from '@gluestack-ui/themed'
import { useQuery } from '@tanstack/react-query'
import { useControllableValue } from 'ahooks'
import { useState } from 'react'
import { Modal } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export type CategorySelectProps = {
  value?: string
  onChange?: (value?: string) => void
}

export default function CategorySelect(props: CategorySelectProps) {
  const [value, onChange] = useControllableValue(props)
  const [open, setOpen] = useState(false)
  const safeAreaInsets = useSafeAreaInsets()

  const { data: categories } = useQuery({
    queryKey: ['category', 'all'],
    queryFn: () => cateService.all({ pageSize: 100 }),
    select: (res) => res.list,
  })

  const valueLabel = categories?.find((f) => f.id === value)?.name || '请选择分类'

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

          {categories?.map((item) => (
            <Pressable
              key={item.id}
              my='$6'
              onPress={() => {
                onChange(item.id)
                setOpen(false)
              }}
            >
              <Text p='$2' m='$2'>
                {item.name}
              </Text>
            </Pressable>
          ))}
        </View>
      </Modal>
    </>
  )
}
