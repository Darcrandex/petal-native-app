/**
 * @name Select
 * @description 弹框模式的单选组件
 * @author darcrand
 */

import { useControllableValue } from 'ahooks'
import { useCallback, useState } from 'react'
import { Modal } from 'react-native'

export type SelectProps = {
  value?: string
  onChange?: (value: string) => void
  options?: { value: string; label: string }[]
  placeholder?: string
}

export default function Select(props: SelectProps) {
  const [value, onChange] = useControllableValue(props)
  const [open, setOpen] = useState(false)
  const onClose = useCallback(() => {}, [])

  return (
    <>
      <Modal visible={open} animationType='fade' transparent onRequestClose={onClose}></Modal>
    </>
  )
}
