/**
 * @name NavBar
 * @description 顶部可滑动的导航栏
 * @author darcrand
 */

import { HStack, Icon, MenuIcon, Pressable, ScrollView, Text } from '@gluestack-ui/themed'
import { useControllableValue } from 'ahooks'

export type NavBarProps = {
  value?: string
  onChange?: (value: string) => void
  items?: { id: string; label: string }[]
}

export default function NavBar(props: NavBarProps) {
  const [value, onChange] = useControllableValue(props)

  return (
    <>
      <HStack alignItems='center'>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} scrollEventThrottle={20}>
          {props.items?.map((v) => (
            <Pressable
              key={v.id}
              height='auto'
              px='$2'
              m='$2'
              bgColor={value === v.id ? '$secondary950' : 'transparent'}
              borderRadius='$full'
              onPress={() => onChange?.(v.id)}
            >
              <Text color={value === v.id ? '$secondary0' : '$secondary950'} fontSize='$sm'>
                {v.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <Pressable>
          <Icon as={MenuIcon} m='$2' w='$5' h='$5' />
        </Pressable>
      </HStack>
    </>
  )
}
