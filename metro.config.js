/**
 * metro.config.js
 * Configuração básica para Metro bundler
 */

module.exports = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'), // só se usar svg
  },
  resolver: {
    assetExts: ['txt', 'png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'svg'], // ajuste conforme suas necessidades
    sourceExts: ['js', 'jsx', 'ts', 'tsx', 'json'], // suas extensões de código
  },
};
