import React, { memo } from 'react';
import { SvgProps } from 'react-native-svg';
import Colors from '@theme/Colors';

interface TabIconProps {
  Icon: React.FC<SvgProps>;
  focused: boolean;
  size?: number;
}

const TabIcon: React.FC<TabIconProps> = ({ Icon, focused, size = 22 }) => {
  return (
    <Icon
      width={size}
      height={size}
      color={focused ? Colors.primary : Colors.lightBrown}
    />
  );
};

export default memo(TabIcon);
