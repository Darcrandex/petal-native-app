/**
 * @name LoginModal
 * @description
 * @author darcrand
 */

import { Box, CloseIcon, Icon, Pressable, VStack, View } from '@gluestack-ui/themed'
import { useEffect, useRef, useState } from 'react'
import { Animated, Dimensions, Modal } from 'react-native'

import LoginForm from './LoginForm'
import RegistryForm from './RegistryForm'
import { useLoginModal } from './useLoginModal'

export function LoginModal() {
  const { isOpen, onClose } = useLoginModal()
  const [tabKey, setTabKey] = useState('1')
  const winSize = Dimensions.get('window')
  const animation = useRef(new Animated.Value(0)).current
  const duration = 250
  const contentHeight = 0.75 * winSize.height

  // onOpen
  useEffect(() => {
    const a = Animated.timing(animation, {
      toValue: 1,
      duration,
      useNativeDriver: false,
    })

    isOpen && a.start()

    return () => {
      a.stop()
    }
  }, [animation, isOpen])

  const beforeClose = () => {
    setTabKey('1')
    Animated.timing(animation, {
      toValue: 0,
      duration,
      useNativeDriver: false,
    }).start(() => onClose())
  }

  return (
    <>
      <Modal
        visible={isOpen}
        animationType='none'
        transparent
        style={{ position: 'relative' }}
        onRequestClose={beforeClose}
      >
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            opacity: animation,
          }}
        />

        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            transform: [
              {
                translateY: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [contentHeight, 0],
                }),
              },
            ],
          }}
        >
          <VStack h='$full'>
            <View flex={1} />

            <Box height={contentHeight} bgColor='$white' borderTopRightRadius='$lg' borderTopLeftRadius='$lg'>
              <Pressable ml='auto' mr='$4' my='$4' onPress={beforeClose}>
                <Icon as={CloseIcon} />
              </Pressable>

              {tabKey === '1' ? <LoginForm setTabKey={setTabKey} /> : <RegistryForm setTabKey={setTabKey} />}
            </Box>
          </VStack>
        </Animated.View>
      </Modal>
    </>
  )
}
