/**
 * @name NavButton
 * @description 底部导航按钮
 * @author darcrand
 */

import { Icon, Pressable, Text, VStack } from '@gluestack-ui/themed'
import { usePathname, useRouter } from 'expo-router'

export type NavButtonProps = { label: string; icon?: any; to: string; replace?: boolean }

export default function NavButton(props: NavButtonProps) {
  const pathname = usePathname()
  const router = useRouter()
  const isActive = pathname === props.to

  return (
    <Pressable onPress={() => (props.replace ? router.replace(props.to) : router.push(props.to))}>
      <VStack p='$2' alignItems='center'>
        <Icon as={props.icon} size='md' color={isActive ? '$secondary950' : '$secondary300'} />

        <Text fontSize='$xs' lineHeight='$xs' color={isActive ? '$secondary950' : '$secondary300'}>
          {props.label}
        </Text>
      </VStack>
    </Pressable>
  )
}
