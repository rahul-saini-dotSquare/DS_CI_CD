import React from 'react';
import {
  BottomTabBarButtonProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomTabParamList } from '@navigation/types';
import Colors from '@theme/Colors';
import Fonts from '@theme/Fonts';
import TabIcon from '@components/common/TabIcon';
import SVG from '@assets/svg';
import DashboardScreen from '@screens/home/Dashboard/DashboardScreen';
import ProfileScreen from '@screens/home/Profile/ProfileScreen';
import Style from '@constants/Style';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BASE_TAB_HEIGHT = 56;

const renderDashboardIcon = ({ focused }: { focused: boolean }) => (
  <TabIcon Icon={SVG.Home} focused={focused} />
);

const renderProfileIcon = ({ focused }: { focused: boolean }) => (
  <TabIcon Icon={SVG.User} focused={focused} />
);

const renderTabBarButton = (props: BottomTabBarButtonProps) => (
  <PlatformPressable
    {...props}
    pressColor="transparent"
    pressOpacity={1}
    android_ripple={{ color: 'transparent', borderless: false }}
  />
);

const BottomTabNavigator: React.FC = () => {
  const insets = useSafeAreaInsets();
  const bottomInset = insets.bottom;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.lightBrown,
        tabBarButton: renderTabBarButton,
        headerShadowVisible: false,
        headerTransparent: true,
        headerRightContainerStyle: {
          paddingRight: Style.screenPadding - 5,
        },
        headerLeftContainerStyle: {
          paddingLeft: Style.screenPadding - 5,
        },
        tabBarStyle: {
          height: BASE_TAB_HEIGHT + bottomInset,
          paddingBottom: bottomInset > 0 ? bottomInset : 8,
          paddingTop: 8,
          backgroundColor: Colors.white,
          borderTopColor: Colors.border,
        },
        tabBarLabelStyle: {
          fontFamily: Fonts.regular,
          fontSize: 11,
        },
      }}
    >
      <Tab.Screen
        name="DashboardScreen"
        component={DashboardScreen}
        options={{
          title: 'Dashboard',
          tabBarIcon: renderDashboardIcon,
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: renderProfileIcon,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
