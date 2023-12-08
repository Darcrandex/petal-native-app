/**
 * @name TabsLayout
 * @description
 * @author darcrand
 */

import NavButton from '@/components/NavButton'
import { userService } from '@/services/user'
import { useLoginModal } from '@/stores/login-modal'
import { CalendarDaysIcon, HStack, Icon, Pressable, Text, VStack } from '@gluestack-ui/themed'
import { Slot, useRouter } from 'expo-router'
import { useCallback } from 'react'
import { useWindowDimensions } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function TabsLayout() {
  const safeAreaInsets = useSafeAreaInsets()

  const { onOpen } = useLoginModal()
  const router = useRouter()
  const { height } = useWindowDimensions()

  const beforeOpen = useCallback(() => {
    const fn = async () => {
      try {
        const res = await userService.profile()
        if (res) {
          router.push('/post/create')
          return
        }
      } catch (e) {
        onOpen()
      }
    }

    fn()
  }, [onOpen, router])

  return (
    <>
      <VStack pb={safeAreaInsets.bottom} bg='$red400' h={height}>
        <Slot />

        <HStack justifyContent='space-around' alignItems='center' bg='$pink400'>
          <NavButton label='关注' icon={<Icon as={CalendarDaysIcon} size='md' />} to='/' />

          <Pressable onPress={beforeOpen}>
            <Text>++</Text>
          </Pressable>
          <NavButton label='我的' icon={<Icon as={CalendarDaysIcon} size='md' />} to='/mine' />
        </HStack>
      </VStack>
    </>
  )
}
