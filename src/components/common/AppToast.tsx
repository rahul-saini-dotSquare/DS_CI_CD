import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

const AppToast: React.FC = () => {
  const insets = useSafeAreaInsets();
  return <Toast topOffset={insets.top + 8} swipeable />;
};

export default AppToast;
