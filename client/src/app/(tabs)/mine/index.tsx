/**
 * @name Mine
 * @description
 * @author darcrand
 */

import { Avatar, Box, CalendarDaysIcon, HStack, Icon, Pressable, Text, VStack } from '@gluestack-ui/themed'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function Mine() {
  const safeAreaInsets = useSafeAreaInsets()

  return (
    <>
      <VStack pt={safeAreaInsets.top} flex={1}>
        <HStack reversed space='md' p='$4'>
          <Icon as={CalendarDaysIcon} size='md' />
          <Icon as={CalendarDaysIcon} size='md' />
          <Icon as={CalendarDaysIcon} size='md' />
        </HStack>

        <HStack space='md' p='$4'>
          <Avatar size='lg' />

          <Box>
            <Text>name</Text>
            <Text>email</Text>
          </Box>
        </HStack>

        <HStack space='md' margin='$4'>
          <Pressable bg='$green400' flex={1} borderRadius={4}>
            <VStack alignItems='center' paddingVertical='$2'>
              <Text>25</Text>
              <Text>画板</Text>
            </VStack>
          </Pressable>

          <Pressable bg='$green400' flex={1}>
            <VStack>
              <Text>83</Text>
              <Text>采集</Text>
            </VStack>
          </Pressable>

          <Pressable bg='$green400' flex={1}>
            <VStack>
              <Text>23</Text>
              <Text>喜欢</Text>
            </VStack>
          </Pressable>

          <Pressable bg='$green400' flex={1}>
            <VStack>
              <Text>12</Text>
              <Text>关注</Text>
            </VStack>
          </Pressable>
        </HStack>
      </VStack>
    </>
  )
}
