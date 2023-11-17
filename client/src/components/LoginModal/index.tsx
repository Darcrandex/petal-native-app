/**
 * @name LoginModal
 * @description
 * @author darcrand
 */

import { Pressable, Text, View } from '@gluestack-ui/themed'
import { Modal } from 'react-native'
import { useLoginModal } from './context'

export default function LoginModal() {
  const { isOpen, onClose } = useLoginModal()
  return (
    <>
      <Modal visible={isOpen} animationType='slide' transparent onRequestClose={onClose}>
        <View marginTop={100} height='$full' bgColor='$red400'>
          <Pressable onPress={onClose}>
            <Text>close</Text>
          </Pressable>

          <View margin='$10'>
            <Text>登陆表单</Text>
          </View>
        </View>
      </Modal>
    </>
  )
}
