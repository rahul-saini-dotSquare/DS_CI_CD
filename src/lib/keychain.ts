import * as Keychain from 'react-native-keychain';
import Logger from '@utils/Logger';
import { AuthUser } from '@api/models/response';

export interface StoredCredentials {
  email: string;
  password: string;
}

export interface StoredSession {
  token: string;
  user: AuthUser | null;
}

const TOKEN_SERVICE = 'auth.session.token';
const USER_SERVICE = 'auth.session.user';

const keychain = {
  save: async (email: string, password: string): Promise<boolean> => {
    try {
      await Keychain.setGenericPassword(email, password);
      return true;
    } catch (error) {
      Logger.warn('keychain.save failed', error);
      return false;
    }
  },

  load: async (): Promise<StoredCredentials | null> => {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        return { email: credentials.username, password: credentials.password };
      }
      return null;
    } catch (error) {
      Logger.warn('keychain.load failed', error);
      return null;
    }
  },

  reset: async (): Promise<void> => {
    try {
      await Keychain.resetGenericPassword();
    } catch (error) {
      Logger.warn('keychain.reset failed', error);
    }
  },

  saveSession: async (session: StoredSession): Promise<boolean> => {
    try {
      await Keychain.setGenericPassword('token', session.token, {
        service: TOKEN_SERVICE,
      });
      await Keychain.setGenericPassword('user', JSON.stringify(session.user), {
        service: USER_SERVICE,
      });
      return true;
    } catch (error) {
      Logger.warn('keychain.saveSession failed', error);
      return false;
    }
  },

  loadSession: async (): Promise<StoredSession | null> => {
    try {
      const tokenEntry = await Keychain.getGenericPassword({
        service: TOKEN_SERVICE,
      });
      if (!tokenEntry) {
        return null;
      }
      const userEntry = await Keychain.getGenericPassword({
        service: USER_SERVICE,
      });
      const user = userEntry
        ? (JSON.parse(userEntry.password) as AuthUser)
        : null;
      return { token: tokenEntry.password, user };
    } catch (error) {
      Logger.warn('keychain.loadSession failed', error);
      return null;
    }
  },

  clearSession: async (): Promise<void> => {
    try {
      await Keychain.resetGenericPassword({ service: TOKEN_SERVICE });
      await Keychain.resetGenericPassword({ service: USER_SERVICE });
    } catch (error) {
      Logger.warn('keychain.clearSession failed', error);
    }
  },
};

export default keychain;
