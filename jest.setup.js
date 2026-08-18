/* eslint-env jest */
jest.mock('@react-native-async-storage/async-storage', () => ({
  __esModule: true,
  default: {
    getItem: jest.fn(() => Promise.resolve(null)),
    setItem: jest.fn(() => Promise.resolve()),
    removeItem: jest.fn(() => Promise.resolve()),
    clear: jest.fn(() => Promise.resolve()),
  },
}));

jest.mock('react-native-safe-area-context', () => {
  // v5.9's jest/mock puts everything on `default`; spread it so named
  // imports (SafeAreaProvider, useSafeAreaInsets, ...) resolve.
  const mock = require('react-native-safe-area-context/jest/mock');
  return { __esModule: true, ...(mock.default ?? mock) };
});

// Official mocks: the hand-rolled stub only exported GestureHandlerRootView,
// so everything else @react-navigation/stack imports resolved to undefined.
require('react-native-gesture-handler/jestSetup');

jest.mock('react-native-keyboard-controller', () => {
  const React = require('react');
  const { View } = require('react-native');
  const Passthrough = ({ children }) =>
    React.createElement(View, null, children);
  return {
    KeyboardProvider: Passthrough,
    KeyboardAwareScrollView: Passthrough,
  };
});

jest.mock('react-native-splash-view', () => ({
  hideSplash: jest.fn(),
  showSplash: jest.fn(),
}));

jest.mock('@react-native-community/netinfo', () => ({
  __esModule: true,
  default: {
    addEventListener: jest.fn(() => jest.fn()),
    fetch: jest.fn(() =>
      Promise.resolve({ isConnected: true, isInternetReachable: true }),
    ),
  },
}));

jest.mock('react-native-config', () => ({
  __esModule: true,
  default: {
    ENV: 'test',
    APP_NAME: 'ds_ci_cd',
    API_URL: 'http://localhost:3000',
    API_TIMEOUT: '30000',
    GOOGLE_WEB_CLIENT_ID: 'test-web-client-id',
    GOOGLE_IOS_CLIENT_ID: 'test-ios-client-id',
    GOOGLE_REVERSED_CLIENT_ID: 'test-reversed-client-id',
  },
}));

jest.mock('react-native-toast-message', () => {
  const Toast = () => null;
  Toast.show = jest.fn();
  Toast.hide = jest.fn();
  return { __esModule: true, default: Toast };
});

jest.mock('react-native-device-info', () => ({
  __esModule: true,
  default: {
    hasNotch: jest.fn(() => false),
    hasDynamicIsland: jest.fn(() => false),
    getUniqueId: jest.fn(() => Promise.resolve('test-device-id')),
    getVersion: jest.fn(() => '1.0.0'),
  },
}));

jest.mock('react-native-permissions', () => ({
  check: jest.fn(() => Promise.resolve('granted')),
  request: jest.fn(() => Promise.resolve('granted')),
  openSettings: jest.fn(() => Promise.resolve()),
  PERMISSIONS: { IOS: {}, ANDROID: {} },
  RESULTS: {
    GRANTED: 'granted',
    DENIED: 'denied',
    BLOCKED: 'blocked',
    LIMITED: 'limited',
    UNAVAILABLE: 'unavailable',
  },
}));

jest.mock('@react-native-firebase/app', () => ({
  getApp: jest.fn(() => ({})),
}));

jest.mock('@react-native-firebase/auth', () => ({
  getAuth: jest.fn(() => ({})),
  signInWithCredential: jest.fn(() => Promise.resolve({ user: null })),
  signOut: jest.fn(() => Promise.resolve()),
  GoogleAuthProvider: { credential: jest.fn() },
  AppleAuthProvider: { credential: jest.fn() },
}));

jest.mock('@react-native-firebase/messaging', () => ({
  getMessaging: jest.fn(() => ({})),
  requestPermission: jest.fn(() => Promise.resolve(1)),
  getToken: jest.fn(() => Promise.resolve('test-fcm-token')),
  onMessage: jest.fn(() => jest.fn()),
  onTokenRefresh: jest.fn(() => jest.fn()),
  setBackgroundMessageHandler: jest.fn(),
  AuthorizationStatus: { AUTHORIZED: 1, PROVISIONAL: 2 },
}));

jest.mock('@notifee/react-native', () => ({
  __esModule: true,
  default: {
    createChannel: jest.fn(() => Promise.resolve('default')),
    displayNotification: jest.fn(() => Promise.resolve()),
    requestPermission: jest.fn(() =>
      Promise.resolve({ authorizationStatus: 1 }),
    ),
    onForegroundEvent: jest.fn(() => jest.fn()),
  },
  AndroidImportance: { HIGH: 4, DEFAULT: 3 },
}));

jest.mock('@react-native-google-signin/google-signin', () => ({
  GoogleSignin: {
    configure: jest.fn(),
    hasPlayServices: jest.fn(() => Promise.resolve(true)),
    signIn: jest.fn(() => Promise.resolve({ idToken: 'test-id-token' })),
    signOut: jest.fn(() => Promise.resolve()),
  },
  statusCodes: {
    SIGN_IN_CANCELLED: 'SIGN_IN_CANCELLED',
    IN_PROGRESS: 'IN_PROGRESS',
    PLAY_SERVICES_NOT_AVAILABLE: 'PLAY_SERVICES_NOT_AVAILABLE',
  },
}));

jest.mock('@invertase/react-native-apple-authentication', () => ({
  appleAuth: {
    performRequest: jest.fn(() => Promise.resolve({})),
    Operation: { LOGIN: 1 },
    Scope: { EMAIL: 0, FULL_NAME: 1 },
  },
}));
