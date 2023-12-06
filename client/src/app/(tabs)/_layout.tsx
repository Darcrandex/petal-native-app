/**
 * @name TabsLayout
 * @description
 * @author darcrand
 */

import NavButton from '@/components/NavButton'
import { useLoginModal } from '@/stores/login-modal'
import { useUserState } from '@/stores/user'
import { CalendarDaysIcon, HStack, Icon, Pressable, Text, VStack } from '@gluestack-ui/themed'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Slot, useRouter } from 'expo-router'
import { useCallback } from 'react'
import { useWindowDimensions } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function TabsLayout() {
  const safeAreaInsets = useSafeAreaInsets()
  const { user } = useUserState()
  const { onOpen } = useLoginModal()
  const router = useRouter()
  const { height } = useWindowDimensions()

  const beforeOpen = useCallback(async () => {
    const hasToken = Boolean(await AsyncStorage.getItem('token'))
    hasToken ? router.push('/post/create') : onOpen()
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
