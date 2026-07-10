import React, { memo } from 'react';
import { useNavigation } from '@react-navigation/native';
import HeaderButton from '@components/common/HeaderButton';
import SVG from '@assets/svg';
import { AppStackScreenProps } from '@navigation/types';

const DashboardHeaderButton: React.FC = () => {
  const navigation =
    useNavigation<AppStackScreenProps<'BottomTabs'>['navigation']>();
  return (
    <HeaderButton
      Icon={SVG.Bell}
      onPress={() => navigation.navigate('NotificationScreen')}
      accessibilityLabel="Notifications"
    />
  );
};

export default memo(DashboardHeaderButton);
