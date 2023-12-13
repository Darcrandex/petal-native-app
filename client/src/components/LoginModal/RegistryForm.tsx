/**
 * @name RegistryForm
 * @description
 * @author darcrand
 */

import { Button, ButtonText, HStack, Input, InputField, Pressable, Text, VStack } from '@gluestack-ui/themed'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'

import { userService } from '@/services/user'

export type RegistryFormProps = { setTabKey: (key: string) => void }

export default function RegistryForm(props: RegistryFormProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { mutate: onSubmit } = useMutation({
    mutationFn: async () => {
      if (!username || !password) return
      return await userService.registry({ username, password })
    },

    onSuccess(res) {
      props.setTabKey('1')
    },
  })

  return (
    <>
      <VStack space='lg' marginHorizontal='$10'>
        <HStack>
          <Pressable onPress={() => props.setTabKey('1')}>
            <Text>返回</Text>
          </Pressable>
        </HStack>

        <Input variant='outline' size='md'>
          <InputField placeholder='邮箱/手机号' value={username} onChange={(e) => setUsername(e.nativeEvent.text)} />
        </Input>

        <Input variant='outline' size='md'>
          <InputField
            placeholder='密码'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.nativeEvent.text)}
          />
        </Input>

        <Button onPress={() => onSubmit()}>
          <ButtonText>注册</ButtonText>
        </Button>
      </VStack>
    </>
  )
}
