import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import Colors from '@theme/Colors';
import Style from '@constants/Style';

interface AuthLabeledContentProps {
  title: string;
  subtitle?: string;
  containerStyle?: ViewStyle;
}

const AuthLabeledContent: React.FC<AuthLabeledContentProps> = ({
  title,
  subtitle,
  containerStyle,
}) => {
  return (
    <View style={containerStyle}>
      <Text style={styles.title} accessibilityRole="header">
        {title}
      </Text>
      {subtitle != null && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
};

export default AuthLabeledContent;

const styles = StyleSheet.create({
  title: {
    ...Style.getTextStyle(26, 'Bold', Colors.black),
  },
  subtitle: {
    ...Style.getTextStyle(15, 'Regular', Colors.textColor),
    marginTop: 4,
  },
});
