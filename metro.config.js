const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts }
  } = await getDefaultConfig();

  return {
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'), // só se usar svg
    },
    resolver: {
      assetExts: assetExts.filter(ext => ext !== 'svg'), // remove svg dos assets
      sourceExts: [...sourceExts, 'svg'], // adiciona svg em sourceExts
    },
  };
})();
