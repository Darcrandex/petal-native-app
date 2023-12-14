/**
 * @name TabsLayout
 * @description
 * @author darcrand
 */

import { AddIcon, BellIcon, HStack, Icon, MoonIcon, Pressable, VStack } from '@gluestack-ui/themed'
import { Slot, useRouter } from 'expo-router'
import { useCallback } from 'react'
import { useWindowDimensions } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import NavButton from '@/components/NavButton'
import { userService } from '@/services/user'
import { useLoginModal } from '@/stores/login-modal'

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
        }
      } catch (e) {
        onOpen()
      }
    }

    fn()
  }, [onOpen, router])

  return (
    <>
      <VStack pb={safeAreaInsets.bottom} h={height}>
        <Slot />

        <HStack justifyContent='space-around' alignItems='center'>
          <NavButton label='关注' icon={BellIcon} to='/' />

          <Pressable
            display='flex'
            alignItems='center'
            justifyContent='center'
            borderRadius='$full'
            w='$8'
            h='$8'
            bg='$rose500'
            onPress={beforeOpen}
          >
            <Icon as={AddIcon} size='md' color='$white' />
          </Pressable>

          <NavButton label='我的' icon={MoonIcon} to='/mine' />
        </HStack>
      </VStack>
    </>
  )
}
