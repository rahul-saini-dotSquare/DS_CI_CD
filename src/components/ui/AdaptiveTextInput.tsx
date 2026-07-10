import React, { forwardRef, memo, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { SvgProps } from 'react-native-svg';
import Style from '@constants/Style';
import Colors from '@theme/Colors';
import Spacer from '@components/layout/Spacer';
import SVG from '@assets/svg';

export interface AdaptiveTextInputProps extends TextInputProps {
  label?: string;
  error?: string;
  isPassword?: boolean;
  containerStyle?: ViewStyle;
  inputContainerStyle?: ViewStyle;
  iconSize?: number;
  iconSpacing?: number;
  LeftIcon?: React.FC<SvgProps>;
  leftIconColor?: string;
  onLeftIconPress?: () => void;
  RightIcon?: React.FC<SvgProps>;
  rightIconColor?: string;
  onRightIconPress?: () => void;
}

const AdaptiveTextInput = forwardRef<TextInput, AdaptiveTextInputProps>(
  (props, ref) => {
    const {
      label,
      error,
      isPassword = false,
      containerStyle,
      inputContainerStyle,
      iconSize = 18,
      iconSpacing = 8,
      LeftIcon,
      leftIconColor = Colors.textColor,
      onLeftIconPress,
      RightIcon,
      rightIconColor = Colors.textColor,
      onRightIconPress,
      style,
      onFocus,
      onBlur,
      secureTextEntry,
      ...rest
    } = props;

    const [focused, setFocused] = useState(false);
    const [secureVisible, setSecureVisible] = useState(false);

    const isSecure = isPassword ? !secureVisible : secureTextEntry;

    const renderLeftIcon = () => {
      if (!LeftIcon) {
        return null;
      }
      const icon = (
        <LeftIcon color={leftIconColor} width={iconSize} height={iconSize} />
      );
      return (
        <>
          {onLeftIconPress ? (
            <TouchableOpacity onPress={onLeftIconPress}>
              {icon}
            </TouchableOpacity>
          ) : (
            icon
          )}
          <Spacer width={iconSpacing} />
        </>
      );
    };

    const renderRightIcon = () => {
      if (isPassword) {
        const PasswordIcon = secureVisible ? SVG.EyeOff : SVG.Eye;
        return (
          <>
            <Spacer width={iconSpacing} />
            <TouchableOpacity
              onPress={() => setSecureVisible(prev => !prev)}
              accessibilityRole="button"
              accessibilityLabel={
                secureVisible ? 'Hide password' : 'Show password'
              }
            >
              <PasswordIcon
                color={rightIconColor}
                width={iconSize}
                height={iconSize}
              />
            </TouchableOpacity>
          </>
        );
      }
      if (!RightIcon) {
        return null;
      }
      const icon = (
        <RightIcon color={rightIconColor} width={iconSize} height={iconSize} />
      );
      return (
        <>
          <Spacer width={iconSpacing} />
          {onRightIconPress ? (
            <TouchableOpacity onPress={onRightIconPress}>
              {icon}
            </TouchableOpacity>
          ) : (
            icon
          )}
        </>
      );
    };

    return (
      <View style={containerStyle}>
        {label != null && <Text style={styles.label}>{label}</Text>}
        <View
          style={[
            styles.inputContainer,
            focused && styles.focused,
            error != null && styles.errorBorder,
            inputContainerStyle,
          ]}
        >
          {renderLeftIcon()}
          <TextInput
            ref={ref}
            style={[styles.input, style]}
            placeholderTextColor={Colors.placeholder}
            accessibilityLabel={label}
            secureTextEntry={isSecure}
            onFocus={e => {
              setFocused(true);
              onFocus?.(e);
            }}
            onBlur={e => {
              setFocused(false);
              onBlur?.(e);
            }}
            {...rest}
          />
          {renderRightIcon()}
        </View>
        {error != null && <Text style={styles.error}>{error}</Text>}
      </View>
    );
  },
);

AdaptiveTextInput.displayName = 'AdaptiveTextInput';

export default memo(AdaptiveTextInput);

const styles = StyleSheet.create({
  label: {
    ...Style.getTextStyle(Style.kTextInputFontSize, 'Medium', Colors.black),
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: Style.kTextInputHeight,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Style.kBorderRadius,
    paddingHorizontal: 14,
    backgroundColor: Colors.white,
  },
  focused: {
    borderColor: Colors.primary,
  },
  errorBorder: {
    borderColor: Colors.red,
  },
  input: {
    flex: 1,
    padding: 0,
    ...Style.getTextStyle(
      Style.kTextInputFontSize,
      Style.kTextInputFontFamily,
      Colors.black,
    ),
  },
  error: {
    ...Style.getTextStyle(12, 'Regular', Colors.red),
    marginTop: 4,
  },
});
