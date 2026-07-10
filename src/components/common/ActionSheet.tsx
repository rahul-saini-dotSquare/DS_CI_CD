import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '@theme/Colors';
import Style from '@constants/Style';
import AdaptiveButton from '@components/ui/AdaptiveButton';

export interface ActionSheetOption {
  label: string;
  onPress: () => void;
  destructive?: boolean;
}

interface ActionSheetProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  options: ActionSheetOption[];
  cancelLabel?: string;
}

const ActionSheet: React.FC<ActionSheetProps> = ({
  visible,
  onClose,
  title,
  options,
  cancelLabel = 'Cancel',
}) => {
  const insets = useSafeAreaInsets();
  const containerStyle = [
    styles.container,
    { paddingBottom: insets.bottom + 12 },
  ];
  const handlePress = (option: ActionSheetOption) => {
    onClose();
    option.onPress();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={containerStyle}>
        {title != null && <Text style={styles.title}>{title}</Text>}
        {options.map(option => (
          <AdaptiveButton
            key={option.label}
            variant="light"
            title={option.label}
            onPress={() => handlePress(option)}
            style={styles.option}
            textStyle={option.destructive ? styles.destructive : undefined}
          />
        ))}
        <AdaptiveButton
          variant="light"
          title={cancelLabel}
          onPress={onClose}
          style={styles.cancel}
          textStyle={styles.cancelText}
        />
      </View>
    </Modal>
  );
};

export default ActionSheet;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
  container: {
    paddingHorizontal: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
  title: {
    ...Style.getTextStyle(13, 'Regular', Colors.textColor),
    textAlign: 'center',
    paddingVertical: 12,
  },
  option: {
    borderRadius: 100,
    marginBottom: 10,
    height: 'auto',
    paddingVertical: 14,
  },
  destructive: {
    color: Colors.red,
  },
  cancel: {
    borderRadius: 100,
    height: 'auto',
    paddingVertical: 14,
  },
  cancelText: {
    ...Style.getTextStyle(Style.kButtonFontSize, 'SemiBold', Colors.black),
  },
});
