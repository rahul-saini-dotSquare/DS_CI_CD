import { Platform } from 'react-native';
import { getApp } from '@react-native-firebase/app';
import {
  getMessaging,
  requestPermission,
  getToken,
  onMessage,
  onTokenRefresh,
  AuthorizationStatus,
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';
import Logger from '@utils/Logger';

const DEFAULT_CHANNEL_ID = 'default';
const FCM_ENABLED = Platform.OS === 'android';

const noop = () => {};

export default class NotificationService {
  static messaging = () => getMessaging(getApp());

  static requestPermission = async (): Promise<boolean> => {
    await notifee.requestPermission();
    if (!FCM_ENABLED) {
      return true;
    }
    const status = await requestPermission(NotificationService.messaging());
    return (
      status === AuthorizationStatus.AUTHORIZED ||
      status === AuthorizationStatus.PROVISIONAL
    );
  };

  static getToken = async (): Promise<string | null> => {
    if (!FCM_ENABLED) {
      return null;
    }
    try {
      return await getToken(NotificationService.messaging());
    } catch (error) {
      Logger.warn('NotificationService.getToken failed', error);
      return null;
    }
  };

  static createDefaultChannel = async (): Promise<string> => {
    return notifee.createChannel({
      id: DEFAULT_CHANNEL_ID,
      name: 'Default',
      importance: AndroidImportance.HIGH,
    });
  };

  static displayNotification = async (
    message: FirebaseMessagingTypes.RemoteMessage,
  ): Promise<void> => {
    const notification = message.notification;
    if (!notification) {
      return;
    }
    await notifee.displayNotification({
      title: notification.title,
      body: notification.body,
      android: {
        channelId: DEFAULT_CHANNEL_ID,
        smallIcon: 'ic_launcher',
        pressAction: { id: 'default' },
      },
    });
  };

  static onForegroundMessage = () => {
    if (!FCM_ENABLED) {
      return noop;
    }
    return onMessage(NotificationService.messaging(), message =>
      NotificationService.displayNotification(message),
    );
  };

  static onTokenRefresh = (callback: (token: string) => void) => {
    if (!FCM_ENABLED) {
      return noop;
    }
    return onTokenRefresh(NotificationService.messaging(), callback);
  };

  static init = async (): Promise<string | null> => {
    await NotificationService.createDefaultChannel();
    await NotificationService.requestPermission();
    const token = await NotificationService.getToken();
    Logger.log('FCM Token:', token ? `${token.slice(0, 8)}…` : null);
    return token;
  };
}
