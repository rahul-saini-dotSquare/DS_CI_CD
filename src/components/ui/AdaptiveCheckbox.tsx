import React, { memo } from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '@theme/Colors';
import Style from '@constants/Style';
import SVG from '@assets/svg';

interface AdaptiveCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  size?: number;
  disabled?: boolean;
  labelStyle?: TextStyle;
}

const AdaptiveCheckbox: React.FC<AdaptiveCheckboxProps> = ({
  checked,
  onChange,
  label,
  size = 20,
  disabled = false,
  labelStyle,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      disabled={disabled}
      onPress={() => onChange(!checked)}
      accessibilityRole="checkbox"
      accessibilityLabel={label}
      accessibilityState={{ checked, disabled }}
    >
      <View
        style={[
          styles.box,
          { width: size, height: size },
          checked && styles.boxChecked,
        ]}
      >
        {checked && (
          <SVG.Check
            width={size * 0.7}
            height={size * 0.7}
            color={Colors.white}
          />
        )}
      </View>
      {label != null && <Text style={[styles.label, labelStyle]}>{label}</Text>}
    </TouchableOpacity>
  );
};

export default memo(AdaptiveCheckbox);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  box: {
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  boxChecked: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  label: {
    ...Style.getTextStyle(14, 'Regular', Colors.black),
    marginLeft: 8,
  },
});
