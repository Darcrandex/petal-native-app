/**
 * @name FadeImage
 * @description 渐隐的图片组件
 * @author darcrand
 */

import { useEffect, useRef, useState } from 'react'
import { Animated, ImageProps } from 'react-native'

export type FadeImageProps = Omit<ImageProps, 'source'> & {
  source?: string
}

export default function FadeImage(props: FadeImageProps) {
  const { source, style = {}, ...rest } = props
  const [imageLoaded, setImageLoaded] = useState(false)
  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (imageLoaded) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start()
    }
  }, [fadeAnim, imageLoaded])

  return (
    <Animated.Image
      {...rest}
      source={{ uri: typeof source === 'string' ? source : 'https://placehold.co/300' }}
      style={Object.assign({ opacity: fadeAnim }, style)}
      onLoadEnd={() => setImageLoaded(true)}
    />
  )
}
