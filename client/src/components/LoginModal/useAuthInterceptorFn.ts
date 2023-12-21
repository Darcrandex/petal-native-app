import { userService } from '@/services/user'
import { useQuery } from '@tanstack/react-query'
import { useCallback } from 'react'
import { useLoginModal } from './useLoginModal'

/**
 * @description 用于拦截需要用户验证的触发函数
 * @param callback 业务上真正需要触发的函数
 */
export function useAuthInterceptorFn(callback: (...args: any[]) => void) {
  const { onOpen } = useLoginModal()

  const { isError } = useQuery({
    queryKey: ['user', 'profile'],
    queryFn: async () => userService.profile(),
    retry: false,
    throwOnError: false,
  })

  const fn = useCallback(
    (...args: any[]) => {
      if (!isError) {
        callback(...args)
      } else {
        onOpen()
      }
    },
    [callback, isError, onOpen],
  )

  return fn
}
