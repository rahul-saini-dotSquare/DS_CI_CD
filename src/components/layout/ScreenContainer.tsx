import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@theme/Colors';
import Style from '@constants/Style';

interface ScreenContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
  edges?: Edge[];
  padded?: boolean;
  backgroundColor?: string;
}

const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  style,
  edges = ['top'],
  padded = true,
  backgroundColor = Colors.background,
}) => {
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]} edges={edges}>
      <View style={[styles.content, padded && styles.padded, style]}>
        {children}
      </View>
    </SafeAreaView>
  );
};

export default ScreenContainer;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  padded: {
    paddingHorizontal: Style.screenPadding,
    paddingTop: 24,
  },
});
