import React, { useEffect } from 'react';
import { StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { hideSplash } from 'react-native-splash-view';
import AppProviders from '@providers/AppProviders';
import RootNavigator from '@navigation/RootNavigator';
import ErrorBoundary from '@components/common/ErrorBoundary';
import OfflineBanner from '@components/common/OfflineBanner';
import AppToast from '@components/common/AppToast';
import SocialLogin from '@lib/SocialLogin';
import NotificationService from '@lib/NotificationService';
import AuthService from '@api/service/AuthService';
import { initNetwork } from '@lib/network';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    SocialLogin.configure();
    NotificationService.init();
    const bootstrap = async () => {
      await AuthService.restoreSession();
      console.log('App bootstrap completed');
      hideSplash();
    };
    bootstrap();
    const unsubscribeMessage = NotificationService.onForegroundMessage();
    const unsubscribeNetwork = initNetwork();
    return () => {
      unsubscribeMessage();
      unsubscribeNetwork();
    };
  }, []);

  return (
    <GestureHandlerRootView style={styles.root}>
      <ErrorBoundary>
        <AppProviders>
          <StatusBar barStyle={isDarkMode ? 'dark-content' : 'dark-content'} />
          <RootNavigator />
          <OfflineBanner />
          <AppToast />
        </AppProviders>
      </ErrorBoundary>
    </GestureHandlerRootView>
  );
}

export default App;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
