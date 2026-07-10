import React, { memo, useMemo } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Switch,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { SvgProps } from 'react-native-svg';
import Style from '@constants/Style';
import Colors from '@theme/Colors';
import Spacer from '@components/layout/Spacer';
import usePreventDoubleTap from '@hooks/usePreventDoubleTap';

const noop = () => {};

type ButtonVariant = 'dark' | 'light' | 'text';

export interface AdaptiveButtonProps {
  variant?: ButtonVariant;
  title?: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  LeftIcon?: React.FC<SvgProps>;
  leftIconColor?: string;
  leftIconSize?: number;
  onLeftIconPress?: () => void;
  RightIcon?: React.FC<SvgProps>;
  rightIconColor?: string;
  rightIconSize?: number;
  rightIconRotate?: boolean;
  onRightIconPress?: () => void;
  iconSpacing?: number;
  showSwitch?: boolean;
  switchValue?: boolean;
  onSwitchChange?: (value: boolean) => void;
  spamProtection?: boolean;
  cooldown?: number;
  accessibilityLabel?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

interface ResolvedButtonStyle {
  textStyle: TextStyle;
  buttonStyle: ViewStyle;
}

const AdaptiveButton: React.FC<AdaptiveButtonProps> = props => {
  const {
    variant = 'dark',
    title,
    onPress,
    disabled = false,
    loading = false,
    LeftIcon,
    leftIconColor,
    leftIconSize = 15,
    onLeftIconPress,
    RightIcon,
    rightIconColor,
    rightIconSize = 15,
    rightIconRotate = false,
    onRightIconPress,
    iconSpacing = 5,
    showSwitch = false,
    switchValue = false,
    onSwitchChange,
    spamProtection = true,
    cooldown = 800,
    accessibilityLabel,
    style,
    textStyle,
  } = props;

  const guardedPress = usePreventDoubleTap(onPress ?? noop, cooldown);
  const handlePress = spamProtection ? guardedPress : onPress;

  const resolvedStyle: ResolvedButtonStyle = useMemo(() => {
    let result: ResolvedButtonStyle = {
      textStyle: {},
      buttonStyle: {},
    };
    switch (variant) {
      case 'light':
        result.buttonStyle = { ...styles.btnLight, ...(style ?? {}) };
        result.textStyle = { ...styles.textLight, ...(textStyle ?? {}) };
        break;
      case 'text':
        result.buttonStyle = { ...styles.btnText, ...(style ?? {}) };
        result.textStyle = { ...styles.textText, ...(textStyle ?? {}) };
        break;
      default:
        result.buttonStyle = { ...styles.btnDark, ...(style ?? {}) };
        result.textStyle = { ...styles.textDark, ...(textStyle ?? {}) };
        break;
    }
    result.buttonStyle.opacity = disabled ? 0.5 : 1;
    return result;
  }, [variant, style, textStyle, disabled]);

  const renderLeftIcon = () => {
    if (!LeftIcon) {
      return null;
    }
    const icon = (
      <LeftIcon
        color={leftIconColor}
        width={leftIconSize}
        height={leftIconSize}
      />
    );
    return (
      <>
        {onLeftIconPress ? (
          <TouchableOpacity onPress={onLeftIconPress}>{icon}</TouchableOpacity>
        ) : (
          icon
        )}
        {title != null && <Spacer width={iconSpacing} />}
      </>
    );
  };

  const renderRightIcon = () => {
    if (!RightIcon) {
      return null;
    }
    const icon = (
      <RightIcon
        color={rightIconColor}
        width={rightIconSize}
        height={rightIconSize}
        style={{
          transform: [{ rotate: rightIconRotate ? '90deg' : '0deg' }],
        }}
      />
    );
    return (
      <>
        {title != null && <Spacer width={iconSpacing} />}
        {onRightIconPress ? (
          <TouchableOpacity onPress={onRightIconPress}>{icon}</TouchableOpacity>
        ) : (
          icon
        )}
      </>
    );
  };

  return (
    <TouchableOpacity
      style={resolvedStyle.buttonStyle}
      disabled={disabled}
      activeOpacity={0.8}
      onPress={handlePress}
      accessible
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityState={{ disabled, busy: loading }}
    >
      <View style={styles.container}>
        {renderLeftIcon()}
        {loading ? (
          <ActivityIndicator size={'small'} color={Colors.white} />
        ) : (
          <Text style={resolvedStyle.textStyle}>{title}</Text>
        )}
        {renderRightIcon()}
        {showSwitch && (
          <>
            {title != null && <Spacer width={iconSpacing} />}
            <Switch
              trackColor={{
                false: 'rgba(228, 228, 228, 1)',
                true: Colors.primary,
              }}
              thumbColor={'white'}
              ios_backgroundColor="rgba(228, 228, 228, 1)"
              onValueChange={onSwitchChange}
              value={switchValue}
              style={styles.switch}
            />
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default memo(AdaptiveButton);

const styles = StyleSheet.create({
  btnText: {
    backgroundColor: Colors.transparent,
    height: Style.kButtonHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnLight: {
    backgroundColor: Colors.white,
    height: Style.kButtonHeight,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: Style.kBorderRadius,
  },
  btnDark: {
    backgroundColor: Colors.primary,
    height: Style.kButtonHeight,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: Style.kBorderRadius,
  },
  textLight: {
    ...Style.getTextStyle(
      Style.kButtonFontSize,
      Style.kButtonFontFamily,
      Colors.accent,
    ),
  },
  textText: {
    ...Style.getTextStyle(
      Style.kButtonFontSize,
      Style.kButtonFontFamily,
      Colors.primary,
    ),
  },
  textDark: {
    ...Style.getTextStyle(
      Style.kButtonFontSize,
      Style.kButtonFontFamily,
      Colors.white,
    ),
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  switch: {
    transform: [{ scaleX: 1 }, { scaleY: 0.9 }],
  },
});
