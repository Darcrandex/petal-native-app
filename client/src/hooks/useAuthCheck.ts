import { userService } from '@/services/user'
import { useQuery } from '@tanstack/react-query'

export function useAuthCheck() {
  const { isError } = useQuery({
    queryKey: ['user', 'profile'],
    queryFn: async () => userService.profile(),
    retry: false,
  })

  return { validAuth: !isError }
}
