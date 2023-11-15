/**
 * @name TabsLayout
 * @description
 * @author darcrand
 */

import { styled } from '@gluestack-style/react'
import { View } from '@gluestack-ui/themed'
import { Link, Slot } from 'expo-router'
import { StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function TabsLayout() {
  const safeAreaInsets = useSafeAreaInsets()

  return (
    <>
      <View
        style={{
          height: '100%',
          backgroundColor: 'red',
          paddingTop: safeAreaInsets.top,
          paddingBottom: safeAreaInsets.bottom,
        }}
      >
        <Slot />

        <View style={styles.bottomNavs}>
          <LinkText replace href='/'>
            Home
          </LinkText>

          <LinkText href='/create'>new</LinkText>

          <LinkText replace href='/mine'>
            Mine
          </LinkText>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  bottomNavs: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
})

const LinkText = styled(Link, {
  color: '$blue400',
  padding: 20,
})
