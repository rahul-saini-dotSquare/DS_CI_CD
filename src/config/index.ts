import { env } from './env';

export const config = {
  env,
  app: {
    apiTimeout: env.apiTimeout,
    pageSize: 20,
  },
};

export { env };
