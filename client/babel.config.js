module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'expo-router/babel',

      // 文档中虽然只要求在 tsconfig 中配置
      // 但其实还需要在 babel.config.js 中配置
      ['module-resolver', { alias: { '@': './src' } }],
    ],
  }
}
