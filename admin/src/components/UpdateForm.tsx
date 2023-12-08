/**
 * @name UpdateForm
 * @description
 * @author darcrand
 */

import { FieldItem } from '@/types/global'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, Drawer, Form, Input } from 'antd'
import { useCallback, useEffect, useState } from 'react'

export type UpdateFormProps = {
  recordId: string
  queryFn: (id: string) => Promise<any> // 详情接口函数
  mutationFn: (values: any) => Promise<any> // 更新接口函数
  fields?: FieldItem[]
  onSuccess?: () => void

  className?: string
}

export default function UpdateForm(props: UpdateFormProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>编辑</Button>

      <Drawer title='编辑' width={600} open={open} onClose={() => setOpen(false)} footer={null} destroyOnClose>
        <FormContent {...props} onClose={() => setOpen(false)} />
      </Drawer>
    </>
  )
}

function FormContent(props: UpdateFormProps & { onClose: () => void }) {
  const [form] = Form.useForm()
  const queryClient = useQueryClient()

  const { data } = useQuery({
    queryKey: ['record', props.recordId],
    enabled: !!props.recordId,
    queryFn: () => props.queryFn(props.recordId),
  })

  useEffect(() => {
    if (data && form) {
      form.setFieldsValue(data)
    }
  }, [data, form])

  const { mutate, isPending } = useMutation({
    mutationFn: props.mutationFn,
    onSuccess() {
      props.onClose()
      props.onSuccess?.()
      queryClient.invalidateQueries({ queryKey: ['record', props.recordId] })
    },
  })

  const onFinish = useCallback(
    (values: any) => {
      mutate({ ...values, id: props.recordId })
    },
    [mutate, props.recordId]
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
