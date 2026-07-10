module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./src/assets/fonts'],
  dependencies: {
    '@react-native-firebase/messaging': {
      platforms: {
        ios: null,
      },
    },
  },
};
