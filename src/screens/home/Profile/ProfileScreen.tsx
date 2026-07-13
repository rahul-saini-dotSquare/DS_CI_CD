import React from 'react';
import { StyleSheet, Text } from 'react-native';
import AdaptiveButton from '@components/ui/AdaptiveButton';
import ScreenContainer from '@components/layout/ScreenContainer';
import Spacer from '@components/layout/Spacer';
import Colors from '@theme/Colors';
import Style from '@constants/Style';
import AuthService from '@api/service/AuthService';
import { BottomTabScreenProps } from '@navigation/types';

const currentProfile = {
  name: 'John Doe',
  email: 'john@example.com',
  phone: '1234567890',
  photo: '',
  dob: '',
};

const ProfileScreen: React.FC<BottomTabScreenProps<'ProfileScreen'>> = ({
  navigation,
}) => {
  return (
    <ScreenContainer>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.subtitle}>Manage your account</Text>
      <Spacer height={24} />
      <AdaptiveButton
        variant="dark"
        title="Edit Profile"
        onPress={() =>
          navigation.navigate('EditProfileScreen', { profile: currentProfile })
        }
      />
      <Spacer height={12} />
      <AdaptiveButton
        variant="light"
        title="Add Profile"
        onPress={() => navigation.navigate('EditProfileScreen')}
      />
      <Spacer height={12} />
      <AdaptiveButton
        variant="text"
        title="Logout"
        onPress={() => AuthService.logout()}
      />
    </ScreenContainer>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  title: {
    ...Style.getTextStyle(26, 'Bold', Colors.black),
  },
  subtitle: {
    ...Style.getTextStyle(15, 'Regular', Colors.textColor),
    marginTop: 4,
  },
});
