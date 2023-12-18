/**
 * @name NavBar
 * @description 顶部可滑动的导航栏
 * @author darcrand
 */

import {
  CloseIcon,
  HStack,
  Icon,
  MenuIcon,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Pressable,
  Text,
} from '@gluestack-ui/themed'
import { useControllableValue } from 'ahooks'
import { useRef, useState } from 'react'
import { Dimensions, ScrollView, View } from 'react-native'

export type NavBarProps = {
  value?: string
  onChange?: (value: string) => void
  items?: { id: string; label: string }[]
  showMenu?: boolean // 是否显示右边菜单
  center?: boolean // 是否居中（一般只有数量较少时使用）
}

export default function NavBar(props: NavBarProps) {
  const [value, onChange] = useControllableValue(props)
  const [open, setOpen] = useState(false)

  const scrollViewRef = useRef<ScrollView>(null)
  const itemRefs = useRef<Record<string, View | null>>({})
  const winSize = Dimensions.get('window')

  const onSetValue = (val: string) => {
    onChange(val)
    setOpen(false)

    if (props.center) return

    const view = itemRefs.current[val]
    if (view && scrollViewRef.current) {
      view.measureLayout(scrollViewRef.current.getInnerViewNode(), (x, y, w) => {
        scrollViewRef.current?.scrollTo({ x: Math.floor(x - 0.5 * (winSize.width - w)), animated: true })
      })
    }
  }

  return (
    <>
      {props.center ? (
        <HStack justifyContent='center'>
          {props.items?.map((v) => (
            <Pressable
              key={v.id}
              height='auto'
              px='$2.5'
              m='$2'
              bgColor={value === v.id ? '$secondary950' : 'transparent'}
              borderRadius='$full'
              onPress={() => onChange?.(v.id)}
            >
              <View ref={(e) => (itemRefs.current[v.id] = e)}>
                <Text color={value === v.id ? '$secondary0' : '$secondary950'} fontSize='$sm'>
                  {v.label}
                </Text>
              </View>
            </Pressable>
          ))}
        </HStack>
      ) : (
        <HStack alignItems='center'>
          <ScrollView ref={scrollViewRef} horizontal showsHorizontalScrollIndicator={false} scrollEventThrottle={20}>
            {props.items?.map((v) => (
              <Pressable
                key={v.id}
                height='auto'
                px='$2.5'
                m='$2'
                bgColor={value === v.id ? '$secondary950' : 'transparent'}
                borderRadius='$full'
                onPress={() => onChange?.(v.id)}
              >
                <View ref={(e) => (itemRefs.current[v.id] = e)}>
                  <Text color={value === v.id ? '$secondary0' : '$secondary950'} fontSize='$sm'>
                    {v.label}
                  </Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>

          {props.showMenu !== false && (
            <Pressable onPress={() => setOpen(true)}>
              <Icon as={MenuIcon} m='$2' w='$5' h='$5' />
            </Pressable>
          )}
        </HStack>
      )}

      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <ModalBackdrop />

        <ModalContent>
          <ModalHeader>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>

          <ModalBody>
            <ScrollView showsHorizontalScrollIndicator={false} scrollEventThrottle={20} style={{ height: 500 }}>
              {props.items?.map((v) => (
                <Pressable key={v.id} px='$2' m='$2' onPress={() => onSetValue(v.id)}>
                  <Text
                    color={value === v.id ? '$secondary950' : '$secondary400'}
                    fontWeight={value === v.id ? 'bold' : 'normal'}
                  >
                    {v.label}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
