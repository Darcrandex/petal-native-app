/**
 * @name AddForm
 * @description
 * @author darcrand
 */

import { FieldItem } from '@/types/global'
import { useMutation } from '@tanstack/react-query'
import { Button, Drawer, Form, Input } from 'antd'
import { useCallback, useState } from 'react'

export type AddFormProps = {
  mutationFn: (values: any) => Promise<any> // 新增接口函数
  fields?: FieldItem[]
  onSuccess?: () => void
  className?: string
}

export default function AddForm(props: AddFormProps) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>新建</Button>

      <Drawer title='新建' width={600} open={open} onClose={() => setOpen(false)} footer={null} destroyOnClose>
        <FormContent {...props} onClose={() => setOpen(false)} />
      </Drawer>
    </>
  )
}

function FormContent(props: AddFormProps & { onClose: () => void }) {
  const [form] = Form.useForm()

  const { mutate, isPending } = useMutation({
    mutationFn: props.mutationFn,
    onSuccess() {
      props.onClose()
      props.onSuccess?.()
    },
  })

  const onFinish = useCallback(
    (values: any) => {
      mutate(values)
    },
    [mutate]
  )

  return (
    <Form form={form} layout='vertical' onFinish={onFinish}>
      {props.fields?.map((field) => (
        <Form.Item key={field.name} label={field.label} name={field.name}>
          {field.type === 'input' && <Input />}
        </Form.Item>
      ))}

      <Button htmlType='submit' type='primary' loading={isPending}>
        确定
      </Button>
    </Form>
  )
}
