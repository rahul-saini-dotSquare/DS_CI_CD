import { Platform } from 'react-native';
import APIManager from '@api/APIManager';
import Endpoints from '@api/Endpoints';
import { getErrorMessage } from '@api/errorHandler';
import { LoginRequest } from '@api/models/request';
import { AuthUser, LoginResponse } from '@api/models/response';
import { store } from '@store/Store';
import { setToken, setUser, logout } from '@store/slices/AuthSlice';
import toast from '@lib/toast';
import keychain from '@lib/keychain';

interface LoginCredentials {
  email: string;
  password: string;
}

export default class AuthService {
  static storeSession = async (
    token: string,
    user: AuthUser,
  ): Promise<void> => {
    store.dispatch(setToken(token));
    store.dispatch(setUser(user));
    await keychain.saveSession({ token, user });
  };

  static restoreSession = async (): Promise<boolean> => {
    const session = await keychain.loadSession();
    if (!session) {
      return false;
    }
    store.dispatch(setToken(session.token));
    store.dispatch(setUser(session.user));
    return true;
  };

  static logout = async (): Promise<void> => {
    store.dispatch(logout());
    await keychain.clearSession();
  };

  static loginUser = async (
    credentials: LoginCredentials,
  ): Promise<LoginResponse | null> => {
    try {
      const body: LoginRequest = {
        ...credentials,
        deviceType: Platform.OS,
      };
      const response = await APIManager.makeRequest<LoginResponse>({
        url: Endpoints.login,
        method: 'POST',
        body,
      });
      if (!response.data) {
        throw new Error(response.message);
      }
      await AuthService.storeSession(response.data.token, response.data.user);
      toast.success(response.message);
      return response.data;
    } catch (error) {
      toast.error(getErrorMessage(error));
      return null;
    }
  };
}
