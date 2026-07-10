import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AppStackParamList } from '@navigation/types';
import { stackScreenOptions } from '@theme/NavigationTheme';
import BottomTabNavigator from './BottomTabNavigator';
import NotificationScreen from '@screens/home/NotificationScreen';
import EditProfileScreen from '@screens/home/Profile/EditProfileScreen';

const Stack = createStackNavigator<AppStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen
        name="BottomTabs"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{ title: 'Notifications' }}
      />
      <Stack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={({ route }) => ({
          title: route.params?.profile ? 'Edit Profile' : 'Add Profile',
        })}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
