/**
 * @name NavButton
 * @description 底部导航按钮
 * @author darcrand
 */

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Pressable, Text, VStack, useToken } from '@gluestack-ui/themed'
import { usePathname, useRouter } from 'expo-router'

export type NavButtonProps = { label: string; icon?: any; activeIcon?: any; to: string; replace?: boolean }

export default function NavButton(props: NavButtonProps) {
  const pathname = usePathname()
  const router = useRouter()
  const isActive = pathname === props.to

  const $secondary950 = useToken('colors', 'secondary950')
  const $secondary300 = useToken('colors', 'secondary300')

  return (
    <Pressable onPress={() => (props.replace ? router.replace(props.to) : router.push(props.to))}>
      <VStack p='$2' alignItems='center' space='xs'>
        <FontAwesomeIcon
          size={24}
          icon={isActive ? props.activeIcon : props.icon}
          color={isActive ? $secondary950 : $secondary300}
        />

        <Text fontSize='$xs' lineHeight='$xs' color={isActive ? '$secondary950' : '$secondary300'}>
          {props.label}
        </Text>
      </VStack>
    </Pressable>
  )
}
