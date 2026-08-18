module.exports = {
  preset: '@react-native/jest-preset',
  setupFiles: ['./jest.setup.js'],
  moduleNameMapper: {
    '\\.svg$': '<rootDir>/__mocks__/svgMock.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(?:.pnpm/)?(' +
      '(jest-)?react-native' +
      '|@react-native(-community)?' +
      '|@react-navigation' +
      '|react-native-.*' +
      '|@reduxjs/toolkit' +
      '|immer' +
      '|redux-persist' +
      '|react-redux' +
      ')/)',
  ],
};
