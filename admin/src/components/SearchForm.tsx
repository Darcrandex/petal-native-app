/**
 * @name SearchForm
 * @description 搜索区域表单
 * @author darcrand
 */

import { FieldItem } from '@/types/global'
import { cls } from '@/utils/cls'
import { Button, Form, FormInstance, Input } from 'antd'

export type SearchFormProps = {
  form: FormInstance
  fields?: FieldItem[]
  submit?: () => void
  reset?: () => void

  className?: string
  buttons?: React.ReactNode
}

export default function SearchForm(props: SearchFormProps) {
  if (props.fields?.length === 0 && !props.buttons) {
    return null
  }

  return (
    <header className={cls(props.className)}>
      <Form form={props.form} layout='inline'>
        {props.fields?.map((field) => (
          <Form.Item key={field.name} label={field.label} name={field.name}>
            {field.type === 'input' && <Input placeholder='请输入' allowClear />}
          </Form.Item>
        ))}

        <div className='space-x-2'>
          {typeof props.submit === 'function' && (
            <Button type='primary' onClick={props.submit}>
              搜索
            </Button>
          )}
          {typeof props.reset === 'function' && <Button onClick={props.reset}>重置</Button>}

          {props.buttons}
        </div>
      </Form>
    </header>
  )
}
