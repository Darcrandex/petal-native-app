import { userService } from '@/services/user'
import { useQuery } from '@tanstack/react-query'

// 用于检测用户是否登录
export function useAuthCheck() {
  const { isError } = useQuery({
    queryKey: ['user', 'profile'],
    queryFn: async () => userService.profile(),
    retry: false,
    throwOnError: false,
  })

  return { validAuth: !isError }
}
