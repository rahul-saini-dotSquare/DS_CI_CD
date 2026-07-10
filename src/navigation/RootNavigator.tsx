import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ExtendedTheme } from '@theme/NavigationTheme';
import { useAppSelector } from '@store/Hooks';
import { navigationRef } from '@navigation/navigationRef';
import AuthNavigator from '@navigation/auth/AuthNavigator';
import AppNavigator from '@navigation/home/AppNavigator';

const RootNavigator: React.FC = () => {
  const isAuthenticated = useAppSelector(state => state.auth.token != null);

  return (
    <NavigationContainer ref={navigationRef} theme={ExtendedTheme}>
      {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;
