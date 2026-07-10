import React from 'react';
import { StyleSheet, ViewStyle, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import Colors from '@theme/Colors';
import Style from '@constants/Style';

interface AuthContainerProps {
  children: React.ReactNode;
  contentContainerStyle?: ViewStyle;
  centered?: boolean;
}

const AuthContainer: React.FC<AuthContainerProps> = ({
  children,
  contentContainerStyle,
  centered = true,
}) => {
  return (
    <View style={styles.safeArea}>
      <KeyboardAwareScrollView
        bottomOffset={24}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          centered && styles.centered,
          contentContainerStyle,
        ]}
      >
        {children}
      </KeyboardAwareScrollView>
    </View>
  );
};

export default AuthContainer;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: 20,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: Style.screenPadding,
  },
  centered: {
    justifyContent: 'center',
  },
});
