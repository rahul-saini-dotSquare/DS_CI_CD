import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '@theme/Colors';
import Style from '@constants/Style';

const NotificationScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>You have no new notifications</Text>
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Style.screenPadding,
  },
  subtitle: {
    ...Style.getTextStyle(15, 'Regular', Colors.textColor),
  },
});
