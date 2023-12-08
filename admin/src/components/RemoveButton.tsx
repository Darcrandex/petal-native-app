/**
 * @name RemoveButton
 * @description 逻辑提取的删除按钮
 */

import { useMutation } from '@tanstack/react-query'
import { Button, Popconfirm } from 'antd'
import { PropsWithChildren } from 'react'

export type RemoveButtonProps = PropsWithChildren<{
  recordId: string // 当前数据行的id
  service?: (id: string) => Promise<any> // 用于删除的接口函数
  onSuccess?: () => void // 自定义成功回调
}>

export default function RemoveButton(props: RemoveButtonProps) {
  const { mutate, isPending } = useMutation({
    mutationFn: props.service,
    onSuccess: props.onSuccess,
  })

  return (
    <>
      <Popconfirm
        title='删除数据'
        description='确定要删除当前数据吗?'
        onConfirm={() => mutate(props.recordId)}
        okText='确定'
        cancelText='取消'
      >
        <Button disabled={isPending}>{props.children || '删除'}</Button>
      </Popconfirm>
    </>
  )
}
