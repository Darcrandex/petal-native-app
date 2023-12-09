/**
 * @name Login
 * @description
 * @author darcrand
 */

import { userService } from '@/services/user'
import { Button, Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const onFinish = async (values: any) => {
    const token = await userService.login(values)
    if (token) {
      window.localStorage.setItem('token', token)
      navigate('/')
    }
  }

  return (
    <>
      <h1>Login</h1>

      <section>
        <Form onFinish={onFinish}>
          <Form.Item label='Username' name='username'>
            <Input />
          </Form.Item>
          <Form.Item label='Password' name='password'>
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button htmlType='submit'>Login</Button>
          </Form.Item>
        </Form>
      </section>
    </>
  )
}
