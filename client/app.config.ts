import { ConfigContext, ExpoConfig } from 'expo/config'

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,

  // expo-router 需要
  scheme: 'petal-app',

  name: 'petal-app',
  slug: 'petal-app',
  version: '1.0.0',

  orientation: 'portrait',
  icon: './src/assets/icon.png',
  userInterfaceStyle: 'light',
  splash: { image: './src/assets/splash.png', resizeMode: 'contain', backgroundColor: '#ffffff' },
  assetBundlePatterns: ['**/*'],
  ios: { supportsTablet: true },
  android: { adaptiveIcon: { foregroundImage: './src/assets/adaptive-icon.png', backgroundColor: '#ffffff' } },

  // 开发阶段
  // pc端的配置
  web: {
    favicon: './src/assets/favicon.png',
    // 使用 metro 打包
    bundler: 'metro',
  },

  //SDK49需要添加//获取tsconfig中的alias配置
  experiments: { tsconfigPaths: true },
  plugins: [
    'expo-router',
    ['expo-camera', { cameraPermission: 'Allow $(PRODUCT_NAME) to access your camera.' }],
    [
      'expo-image-picker',
      {
        photosPermission: 'The app accesses your photos to let you share them with your friends.',
        cameraPermission: 'Allow $(PRODUCT_NAME) to access your camera.',
      },
    ],
  ],
})
