/**
 * @name TabsLayout
 * @description
 * @author darcrand
 */

import { faCompass, faUser } from '@fortawesome/free-regular-svg-icons'
import { faCompass as faCompassRegular, faPlusCircle, faUser as faUserRegular } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

import { HStack, Pressable, VStack, useToken } from '@gluestack-ui/themed'
import { Slot, useRouter } from 'expo-router'
import { useCallback } from 'react'
import { useWindowDimensions } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import NavButton from '@/components/NavButton'
import { useAuthCheck } from '@/hooks/useAuthCheck'
import { useLoginModal } from '@/stores/login-modal'

export default function TabsLayout() {
  const safeAreaInsets = useSafeAreaInsets()
  const { validAuth } = useAuthCheck()

  const { onOpen } = useLoginModal()
  const router = useRouter()
  const { height } = useWindowDimensions()

  const beforeOpen = useCallback(() => {
    if (validAuth) {
      router.push('/post/create')
    } else {
      onOpen()
    }
  }, [validAuth, onOpen, router])

  const $rose500 = useToken('colors', 'rose500')

  return (
    <>
      <VStack pb={safeAreaInsets.bottom} h={height}>
        <Slot />

        <HStack justifyContent='space-around' alignItems='center'>
          <NavButton label='关注' icon={faCompass} activeIcon={faCompassRegular} to='/' />

          <Pressable onPress={beforeOpen}>
            <FontAwesomeIcon icon={faPlusCircle} color={$rose500} size={32} />
          </Pressable>

          <NavButton label='我的' icon={faUser} activeIcon={faUserRegular} to='/mine' />
        </HStack>
      </VStack>
    </>
  )
}
