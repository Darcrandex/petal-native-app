import { userService } from '@/services/user'
import { useQuery } from '@tanstack/react-query'

/**
 * @description 单独封装获取用户信息的hook
 */
export function useUserInfo() {
  const queryResult = useQuery({
    queryKey: ['user', 'profile'],
    queryFn: () => userService.profile(),
    retry: false,
    throwOnError: false,
  })

  return queryResult
}
