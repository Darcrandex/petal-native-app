/**
 * @name TabsLayout
 * @description
 * @author darcrand
 */

import NavButton from '@/components/NavButton'
import { useLoginModal } from '@/stores/login-modal'
import { useUserState } from '@/stores/user'
import { CalendarDaysIcon, HStack, Icon, Pressable, Text, VStack } from '@gluestack-ui/themed'
import { Slot, useRouter } from 'expo-router'
import { isNotNil } from 'ramda'
import { useWindowDimensions } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function TabsLayout() {
  const safeAreaInsets = useSafeAreaInsets()
  const { user } = useUserState()
  const { onOpen } = useLoginModal()
  const router = useRouter()
  const { height } = useWindowDimensions()

  return (
    <>
      <VStack pb={safeAreaInsets.bottom} bg='$red400' h={height}>
        <Slot />

        <HStack justifyContent='space-around' alignItems='center' bg='$pink400'>
          <NavButton label='关注' icon={<Icon as={CalendarDaysIcon} size='md' />} to='/' />

          <Pressable
            onPress={() => {
              isNotNil(user) ? router.push('/post/create') : onOpen()
            }}
          >
            <Text>++</Text>
          </Pressable>
          <NavButton label='我的' icon={<Icon as={CalendarDaysIcon} size='md' />} to='/mine' />
        </HStack>
      </VStack>
    </>
  )
}
