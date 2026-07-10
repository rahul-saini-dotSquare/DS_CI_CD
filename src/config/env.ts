import Config from 'react-native-config';

type Environment = 'development' | 'staging' | 'production';

const environment = (Config.ENV as Environment) ?? 'development';

export const env = {
  environment,
  isDevelopment: environment === 'development',
  isStaging: environment === 'staging',
  isProduction: environment === 'production',
  appName: Config.APP_NAME ?? 'RNTemplate',
  apiUrl: Config.API_URL ?? 'http://localhost:3000',
  apiTimeout: Number(Config.API_TIMEOUT ?? 30000),
  googleWebClientId: Config.GOOGLE_WEB_CLIENT_ID ?? '',
  googleIosClientId: Config.GOOGLE_IOS_CLIENT_ID ?? '',
};
