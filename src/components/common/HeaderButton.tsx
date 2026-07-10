import React, { memo } from 'react';
import { SvgProps } from 'react-native-svg';
import AdaptiveButton from '@components/ui/AdaptiveButton';
import Colors from '@theme/Colors';

interface HeaderButtonProps {
  Icon: React.FC<SvgProps>;
  onPress: () => void;
  accessibilityLabel: string;
  color?: string;
  size?: number;
}

const HeaderButton: React.FC<HeaderButtonProps> = ({
  Icon,
  onPress,
  accessibilityLabel,
  color = Colors.accent,
  size = 24,
}) => {
  return (
    <AdaptiveButton
      variant="text"
      LeftIcon={Icon}
      leftIconSize={size}
      leftIconColor={color}
      onPress={onPress}
      accessibilityLabel={accessibilityLabel}
    />
  );
};

export default memo(HeaderButton);
