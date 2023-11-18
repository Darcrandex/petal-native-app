/**
 * @name LoginModal
 * @description
 * @author darcrand
 */

import { userService } from '@/services/user'
import { useLoginModal } from '@/stores/login-modal'
import { Button, ButtonText, Input, InputField, Pressable, Text, VStack, View } from '@gluestack-ui/themed'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { Modal } from 'react-native'

export default function LoginModal() {
  const { isOpen, onClose } = useLoginModal()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { mutate: onSubmit } = useMutation({
    mutationFn: async () => {
      if (!username || !password) return
      await userService.login({
        username,
        password,
      })
    },
  })

  return (
    <>
      <Modal visible={isOpen} animationType='slide' transparent onRequestClose={onClose}>
        <View marginTop={100} height='$full' bgColor='white'>
          <Pressable onPress={onClose}>
            <Text>close</Text>
          </Pressable>

          <View margin='$10'>
            <Text>登陆表单</Text>
          </View>

          <VStack space='lg' marginHorizontal='$10'>
            <Input variant='outline' size='md'>
              <InputField
                placeholder='邮箱/手机号'
                value={username}
                onChange={(e) => setUsername(e.nativeEvent.text)}
              />
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
          </VStack>
        </View>
      </Modal>
    </>
  )
}
