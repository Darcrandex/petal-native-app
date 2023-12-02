/**
 * @name LoginForm
 * @description
 * @author darcrand
 */

import { userService } from '@/services/user'
import { useLoginModal } from '@/stores/login-modal'
import { Button, ButtonText, HStack, Input, InputField, Pressable, Text, VStack } from '@gluestack-ui/themed'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

export type LoginFormProps = { setTabKey: (key: string) => void }

export default function LoginForm(props: LoginFormProps) {
  const { onClose } = useLoginModal()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const queryClient = useQueryClient()

  const { mutate: onSubmit } = useMutation({
    mutationFn: async () => {
      if (!username || !password) return
      return await userService.login({ username, password })
    },

    async onSuccess(res) {
      await AsyncStorage.setItem('token', res?.data || '')
      queryClient.invalidateQueries({ queryKey: ['user', 'profile'] })
      onClose()
    },
  })

  return (
    <>
      <VStack space='lg' marginHorizontal='$10'>
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
          <ButtonText>登陆</ButtonText>
        </Button>

        <HStack>
          <Pressable onPress={() => props.setTabKey('2')}>
            <Text>注册</Text>
          </Pressable>
        </HStack>
      </VStack>
    </>
  )
}
