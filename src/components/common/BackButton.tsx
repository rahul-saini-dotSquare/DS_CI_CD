import React, { memo } from 'react';
import { useNavigation } from '@react-navigation/native';
import HeaderButton from '@components/common/HeaderButton';
import SVG from '@assets/svg';

const BackButton: React.FC = () => {
  const navigation = useNavigation();
  if (!navigation.canGoBack()) {
    return null;
  }
  return (
    <HeaderButton
      Icon={SVG.Back}
      onPress={() => navigation.goBack()}
      accessibilityLabel="Go back"
    />
  );
};

export default memo(BackButton);
