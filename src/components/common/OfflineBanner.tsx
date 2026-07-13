import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '@theme/Colors';
import Style from '@constants/Style';
import useIsOnline from '@hooks/useIsOnline';

const OfflineBanner: React.FC = () => {
  const online = useIsOnline();
  const insets = useSafeAreaInsets();
  const bannerStyle = [styles.banner, { paddingTop: insets.top + 8 }];
  if (online) {
    return null;
  }
  return (
    <View style={bannerStyle} pointerEvents="none">
      <Text style={styles.text}>No internet connection</Text>
    </View>
  );
};

export default OfflineBanner;

const styles = StyleSheet.create({
  banner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingBottom: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    backgroundColor: Colors.red,
    zIndex: 1000,
  },
  text: {
    ...Style.getTextStyle(13, 'Medium', Colors.white),
  },
});
