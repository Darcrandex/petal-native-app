/**
 * @name Mine
 * @description
 * @author darcrand
 */

import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Box,
  CalendarDaysIcon,
  HStack,
  Icon,
  Pressable,
  SettingsIcon,
  Text,
  VStack,
} from '@gluestack-ui/themed'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { mediaService } from '@/services/common'
import { userService } from '@/services/user'

export default function Mine() {
  const router = useRouter()
  const safeAreaInsets = useSafeAreaInsets()
  const { data: userInfo } = useQuery({
    queryKey: ['user', 'profile'],
    queryFn: async () => userService.profile(),
    retry: false,
  })

  const { data: avatarUrl } = useQuery({
    queryKey: ['user', 'avatar', 'url'],
    enabled: !!userInfo?.avatar,
    queryFn: () => mediaService.getAccessPath(userInfo?.avatar || ''),
  })

  return (
    <>
      <VStack pt={safeAreaInsets.top} flex={1}>
        <HStack reversed space='md' p='$4'>
          <Icon as={CalendarDaysIcon} size='md' />
          <Icon as={CalendarDaysIcon} size='md' />
          <Pressable onPress={() => router.push('/profile')}>
            <Icon as={SettingsIcon} size='md' />
          </Pressable>
        </HStack>

        <HStack space='md' p='$4'>
          <Avatar>
            <AvatarFallbackText>{userInfo?.nickname}</AvatarFallbackText>
            <AvatarImage source={{ uri: avatarUrl || 'https://i.pravatar.cc/300' }} />
          </Avatar>

          <Box>
            <Text>{userInfo?.nickname || userInfo?.username || 'username'}</Text>
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
