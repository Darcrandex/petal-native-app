/**
 * @name LoginModal
 * @description
 * @author darcrand
 */

import { Pressable, Text, View } from '@gluestack-ui/themed'
import { useState } from 'react'
import { Modal } from 'react-native'

import LoginForm from './LoginForm'
import RegistryForm from './RegistryForm'

import { useLoginModal } from '@/stores/login-modal'

export default function LoginModal() {
  const { isOpen, onClose } = useLoginModal()
  const [tabKey, setTabKey] = useState('1')

  const beforeClose = () => {
    setTabKey('1')
    onClose()
  }

  return (
    <>
      <Modal visible={isOpen} animationType='slide' transparent onRequestClose={beforeClose}>
        <View marginTop={100} height='$full' bgColor='white'>
          <Pressable marginLeft='auto' onPress={beforeClose}>
            <Text padding='$2'>close</Text>
          </Pressable>

          {tabKey === '1' ? <LoginForm setTabKey={setTabKey} /> : <RegistryForm setTabKey={setTabKey} />}
        </View>
      </Modal>
    </>
  )
}
