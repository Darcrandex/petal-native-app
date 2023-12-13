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
  ScrollView,
  Text,
} from '@gluestack-ui/themed'
import { useControllableValue } from 'ahooks'
import { useState } from 'react'

export type NavBarProps = {
  value?: string
  onChange?: (value: string) => void
  items?: { id: string; label: string }[]
  showMenu?: boolean
}

export default function NavBar(props: NavBarProps) {
  const [value, onChange] = useControllableValue(props)
  const [open, setOpen] = useState(false)

  return (
    <>
      <HStack alignItems='center'>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} scrollEventThrottle={20}>
          {props.items?.map((v) => (
            <Pressable
              key={v.id}
              height='auto'
              px='$2'
              m='$2'
              bgColor={value === v.id ? '$secondary950' : 'transparent'}
              borderRadius='$full'
              onPress={() => onChange?.(v.id)}
            >
              <Text color={value === v.id ? '$secondary0' : '$secondary950'} fontSize='$sm'>
                {v.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {props.showMenu !== false && (
          <Pressable onPress={() => setOpen(true)}>
            <Icon as={MenuIcon} m='$2' w='$5' h='$5' />
          </Pressable>
        )}
      </HStack>

      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <ModalBackdrop />

        <ModalContent>
          <ModalHeader>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>

          <ModalBody>
            <ScrollView showsHorizontalScrollIndicator={false} scrollEventThrottle={20} height='$80'>
              {props.items?.map((v) => (
                <Pressable
                  key={v.id}
                  px='$2'
                  m='$2'
                  onPress={() => {
                    onChange?.(v.id)
                    setOpen(false)
                  }}
                >
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
