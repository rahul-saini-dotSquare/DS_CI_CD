import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { BottomTabScreenProps as RNBottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { ProfileFormValues } from '@app-types/profile';

export type AuthStackParamList = {
  LoginScreen: undefined;
  SignUpScreen: undefined;
  ForgotPasswordScreen: undefined;
};

export type BottomTabParamList = {
  DashboardScreen: undefined;
  ProfileScreen: undefined;
};

export type AppStackParamList = {
  BottomTabs: NavigatorScreenParams<BottomTabParamList>;
  NotificationScreen: undefined;
  EditProfileScreen: { profile?: ProfileFormValues } | undefined;
};

export type AuthStackScreenProps<T extends keyof AuthStackParamList> =
  StackScreenProps<AuthStackParamList, T>;

export type AppStackScreenProps<T extends keyof AppStackParamList> =
  StackScreenProps<AppStackParamList, T>;

export type BottomTabScreenProps<T extends keyof BottomTabParamList> =
  CompositeScreenProps<
    RNBottomTabScreenProps<BottomTabParamList, T>,
    AppStackScreenProps<keyof AppStackParamList>
  >;

export type RootStackParamList = AppStackParamList & AuthStackParamList;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
