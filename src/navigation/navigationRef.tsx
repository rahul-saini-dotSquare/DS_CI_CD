import {
  CommonActions,
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native';
import { RootStackParamList } from './types';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

class RootNavigation {
  private constructor() {}

  static navigate<T extends keyof RootStackParamList>(
    name: T,
    params?: RootStackParamList[T],
  ) {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(
        CommonActions.navigate({ name: name as string, params }),
      );
    }
  }

  static replace(name: keyof RootStackParamList, params?: object) {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(StackActions.replace(name as string, params));
    }
  }

  static goBack() {
    if (navigationRef.isReady() && navigationRef.canGoBack()) {
      navigationRef.goBack();
    }
  }

  static resetRoot(name: keyof RootStackParamList, params?: object) {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: name as string, params }],
        }),
      );
    }
  }
}

export default RootNavigation;
