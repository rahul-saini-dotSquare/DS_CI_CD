declare module 'react-native-config' {
  export interface NativeConfig {
    ENV?: string;
    APP_NAME?: string;
    API_URL?: string;
    API_TIMEOUT?: string;
    GOOGLE_WEB_CLIENT_ID?: string;
    GOOGLE_IOS_CLIENT_ID?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
