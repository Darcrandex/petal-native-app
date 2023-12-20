import { userService } from '@/services/user'
import { useQuery } from '@tanstack/react-query'
import { useCallback } from 'react'
import { useLoginModal } from './useLoginModal'

// 在触发需要用户验证的事件时调用
// 判断当前用户是否已经登录
// 如果未登录则弹出登录对话框
export function useAuthInterceptorFn(callback: (...args: any[]) => any) {
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
