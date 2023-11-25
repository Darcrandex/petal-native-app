/**
 * @name NavButton
 * @description 底部导航按钮
 * @author darcrand
 */

import { Pressable, Text, VStack } from '@gluestack-ui/themed'
import { usePathname, useRouter } from 'expo-router'
import { ReactNode } from 'react'

export type NavButtonProps = { label: string; icon?: ReactNode; to: string; replace?: boolean }

export default function NavButton(props: NavButtonProps) {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <Pressable onPress={() => (props.replace ? router.replace(props.to) : router.push(props.to))}>
      <VStack margin='$1' space='xs' alignItems='center'>
        {props.icon}
        <Text fontWeight={pathname === props.to ? 'bold' : 'normal'}>{props.label}</Text>
      </VStack>
    </Pressable>
  )
}
