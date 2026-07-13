import React, { useEffect, useRef } from 'react';
import {
  ActionSheetIOS,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
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
  const shownRef = useRef(false);
  const containerStyle = [
    styles.container,
    { paddingBottom: insets.bottom + 12 },
  ];
  const handlePress = (option: ActionSheetOption) => {
    onClose();
    option.onPress();
  };
  useEffect(() => {
    if (Platform.OS !== 'ios') {
      return;
    }
    if (!visible) {
      shownRef.current = false;
      return;
    }
    if (shownRef.current) {
      return;
    }
    shownRef.current = true;
    const labels = options.map(option => option.label);
    const destructiveIndex = options.findIndex(option => option.destructive);
    ActionSheetIOS.showActionSheetWithOptions(
      {
        title,
        options: [...labels, cancelLabel],
        cancelButtonIndex: labels.length,
        destructiveButtonIndex:
          destructiveIndex >= 0 ? destructiveIndex : undefined,
      },
      buttonIndex => {
        onClose();
        if (buttonIndex < options.length) {
          options[buttonIndex].onPress();
        }
      },
    );
  }, [visible, options, title, cancelLabel, onClose]);
  if (Platform.OS === 'ios') {
    return null;
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={containerStyle}>
          <View style={styles.group}>
            {title != null && <Text style={styles.title}>{title}</Text>}
            {options.map((option, index) => (
              <AdaptiveButton
                key={option.label}
                variant="light"
                title={option.label}
                onPress={() => handlePress(option)}
                style={
                  index === options.length - 1 ? styles.rowLast : styles.row
                }
                textStyle={
                  option.destructive ? styles.destructive : styles.rowText
                }
              />
            ))}
          </View>
          <AdaptiveButton
            variant="light"
            title={cancelLabel}
            onPress={onClose}
            style={styles.cancel}
            textStyle={styles.cancelText}
          />
        </View>
      </Pressable>
    </Modal>
  );
};

export default ActionSheet;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  container: {
    width: '100%',
  },
  group: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    overflow: 'hidden',
  },
  title: {
    ...Style.getTextStyle(13, 'Regular', Colors.textColor),
    textAlign: 'center',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.border,
  },
  row: {
    backgroundColor: 'transparent',
    borderRadius: 0,
    height: 'auto',
    paddingVertical: 17,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.border,
  },
  rowLast: {
    backgroundColor: 'transparent',
    borderRadius: 0,
    height: 'auto',
    paddingVertical: 17,
  },
  rowText: {
    ...Style.getTextStyle(17, 'Regular', Colors.accent),
  },
  destructive: {
    ...Style.getTextStyle(17, 'Regular', Colors.red),
  },
  cancel: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    height: 'auto',
    paddingVertical: 17,
    marginTop: 8,
  },
  cancelText: {
    ...Style.getTextStyle(17, 'SemiBold', Colors.accent),
  },
});
