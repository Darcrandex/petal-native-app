/**
 * @name TabsLayout
 * @description
 * @author darcrand
 */

import { useLoginModal } from '@/components/LoginModal/context'
import { styled } from '@gluestack-style/react'
import { Button, ButtonText, HStack, VStack } from '@gluestack-ui/themed'
import { Link, Slot } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function TabsLayout() {
  const safeAreaInsets = useSafeAreaInsets()
  const { onOpen } = useLoginModal()

  return (
    <>
      <VStack pb={safeAreaInsets.bottom} bg='$red400' h='100%'>
        <Slot />

        <HStack justifyContent='space-around'>
          <LinkText replace href='/'>
            Home
          </LinkText>

          <LinkText href='/post/create'>new</LinkText>

          <LinkText replace href='/mine'>
            Mine
          </LinkText>

          <Button onPress={() => onOpen()}>
            <ButtonText>modal</ButtonText>
          </Button>
        </HStack>
      </VStack>
    </>
  )
}

const LinkText = styled(Link, {
  color: '$blue400',
  padding: 20,
})
