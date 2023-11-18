/**
 * @name TabsLayout
 * @description
 * @author darcrand
 */

import { useLoginModal } from '@/stores/login-modal'
import { useUserState } from '@/stores/user'
import { CalendarDaysIcon, HStack, Icon, Pressable, Text, VStack } from '@gluestack-ui/themed'
import { Slot, usePathname, useRouter } from 'expo-router'
import { isNotNil } from 'ramda'
import { ReactNode } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function TabsLayout() {
  const safeAreaInsets = useSafeAreaInsets()
  const { user } = useUserState()
  const { onOpen } = useLoginModal()
  const router = useRouter()

  return (
    <>
      <VStack pb={safeAreaInsets.bottom} bg='$red400' h='100%'>
        <Slot />

        <HStack justifyContent='space-around' alignItems='center'>
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

function NavButton(props: { label: string; icon?: ReactNode; to: string; replace?: boolean }) {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <Pressable onPress={() => (props.replace ? router.replace(props.to) : router.push(props.to))}>
      <VStack margin='$4' space='xs' alignItems='center'>
        {props.icon}
        <Text fontWeight={pathname === props.to ? 'bold' : 'normal'}>{props.label}</Text>
      </VStack>
    </Pressable>
  )
}
