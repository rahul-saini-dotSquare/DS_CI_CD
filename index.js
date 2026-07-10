/**
 * @format
 */

import 'react-native-gesture-handler';
import { AppRegistry, Platform } from 'react-native';
import { getApp } from '@react-native-firebase/app';
import {
  getMessaging,
  setBackgroundMessageHandler,
} from '@react-native-firebase/messaging';
import App from './App';
import NotificationService from '@lib/NotificationService';
import { name as appName } from './app.json';

if (Platform.OS === 'android') {
  setBackgroundMessageHandler(getMessaging(getApp()), async message => {
    await NotificationService.displayNotification(message);
  });
}

AppRegistry.registerComponent(appName, () => App);
