import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { SvgProps } from 'react-native-svg';
import Colors from '@theme/Colors';
import Style from '@constants/Style';
import { hp, wp } from '@utils/responsive/ScreenResponsive';

interface ListEmptyComponentProps {
  message?: string;
  loading?: boolean;
  style?: ViewStyle;
  Icon?: React.FC<SvgProps>;
}

const ListEmptyComponent: React.FC<ListEmptyComponentProps> = ({
  message = 'No data found',
  loading = false,
  style,
  Icon,
}) => {
  return (
    <View style={[styles.main, style]}>
      {loading ? (
        <ActivityIndicator size="large" color={Colors.primary} />
      ) : (
        <>
          {Icon && <Icon width={60} height={60} color={Colors.lightBrown} />}
          <Text style={styles.text}>{message}</Text>
        </>
      )}
    </View>
  );
};

export default ListEmptyComponent;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
  },
  text: {
    ...Style.getTextStyle(16, 'Regular', Colors.textColor),
    textAlign: 'center',
    paddingHorizontal: wp(7),
    lineHeight: hp(2.5),
  },
});
