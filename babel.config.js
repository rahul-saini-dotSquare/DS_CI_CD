const path = require('path');

const fromSrc = name => path.resolve(__dirname, 'src', name);

module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: [path.resolve(__dirname, 'src')],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        alias: {
          '@api': fromSrc('api'),
          '@assets': fromSrc('assets'),
          '@components': fromSrc('components'),
          '@config': fromSrc('config'),
          '@constants': fromSrc('constants'),
          '@hooks': fromSrc('hooks'),
          '@i18n': fromSrc('i18n'),
          '@lib': fromSrc('lib'),
          '@navigation': fromSrc('navigation'),
          '@providers': fromSrc('providers'),
          '@screens': fromSrc('screens'),
          '@services': fromSrc('services'),
          '@store': fromSrc('store'),
          '@theme': fromSrc('theme'),
          '@app-types': fromSrc('types'),
          '@utils': fromSrc('utils'),
          '@test': fromSrc('test'),
        },
      },
    ],
    'react-native-worklets/plugin',
  ],
};
