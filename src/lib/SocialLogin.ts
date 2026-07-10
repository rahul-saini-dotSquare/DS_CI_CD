import { getApp } from '@react-native-firebase/app';
import {
  getAuth,
  signInWithCredential,
  signOut,
  GoogleAuthProvider,
  AppleAuthProvider,
} from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import { env } from '@config';
import Logger from '@utils/Logger';

export interface SocialUser {
  uid: string;
  email: string | null;
  name: string | null;
  provider: 'google' | 'apple';
}

export class SocialLoginCancelledError extends Error {
  constructor() {
    super('Social login was cancelled');
    this.name = 'SocialLoginCancelledError';
  }
}

export default class SocialLogin {
  static configure = () => {
    GoogleSignin.configure({
      webClientId: env.googleWebClientId,
      iosClientId: env.googleIosClientId,
      offlineAccess: false,
    });
  };

  static loginWithGoogle = async (): Promise<SocialUser> => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const result = await GoogleSignin.signIn();
      if (result.type !== 'success') {
        throw new SocialLoginCancelledError();
      }
      const idToken = result.data.idToken;
      if (!idToken) {
        throw new Error('Google sign-in failed: missing token.');
      }
      const credential = GoogleAuthProvider.credential(idToken);
      const userCredential = await signInWithCredential(
        getAuth(getApp()),
        credential,
      );
      const user = userCredential.user;
      return {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        provider: 'google',
      };
    } catch (error) {
      if (
        error instanceof Error &&
        'code' in error &&
        error.code === statusCodes.SIGN_IN_CANCELLED
      ) {
        throw new SocialLoginCancelledError();
      }
      throw error;
    }
  };

  static loginWithApple = async (): Promise<SocialUser> => {
    if (!appleAuth.isSupported) {
      throw new Error('Apple sign-in is not supported on this device.');
    }
    const response = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });
    const { identityToken, nonce, fullName, email } = response;
    if (!identityToken) {
      throw new Error('Apple sign-in failed: missing token.');
    }
    const credential = AppleAuthProvider.credential(identityToken, nonce);
    const userCredential = await signInWithCredential(
      getAuth(getApp()),
      credential,
    );
    const user = userCredential.user;
    const composedName = fullName
      ? `${fullName.givenName ?? ''} ${fullName.familyName ?? ''}`.trim()
      : null;
    return {
      uid: user.uid,
      email: user.email ?? email ?? null,
      name: composedName || user.displayName,
      provider: 'apple',
    };
  };

  static signOut = async () => {
    try {
      await GoogleSignin.signOut();
    } catch (error) {
      Logger.warn('Google sign-out failed', error);
    }
    await signOut(getAuth(getApp()));
  };
}
