import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import AdaptiveTextInput from '@components/ui/AdaptiveTextInput';
import AdaptiveButton from '@components/ui/AdaptiveButton';
import AuthContainer from '@components/layout/AuthContainer';
import Spacer from '@components/layout/Spacer';
import Colors from '@theme/Colors';
import Style from '@constants/Style';
import AuthService from '@api/service/AuthService';
import { AuthStackScreenProps } from '@navigation/types';

const SignUpScreen: React.FC<AuthStackScreenProps<'SignUpScreen'>> = ({
  navigation,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    await AuthService.storeSession('demo-token', { id: '1', name, email });
  };

  return (
    <AuthContainer centered={false}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Sign up to get started</Text>
      <Spacer height={32} />
      <AdaptiveTextInput
        label="Full Name"
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />
      <Spacer height={16} />
      <AdaptiveTextInput
        label="Email"
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <Spacer height={16} />
      <AdaptiveTextInput
        label="Password"
        placeholder="Create a password"
        isPassword
        value={password}
        onChangeText={setPassword}
      />
      <Spacer height={24} />
      <AdaptiveButton variant="dark" title="Sign Up" onPress={handleSignUp} />
      <Spacer height={16} />
      <AdaptiveButton
        variant="text"
        title="Already have an account? Login"
        onPress={() => navigation.navigate('LoginScreen')}
      />
    </AuthContainer>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  title: {
    ...Style.getTextStyle(26, 'Bold', Colors.black),
  },
  subtitle: {
    ...Style.getTextStyle(15, 'Regular', Colors.textColor),
    marginTop: 4,
  },
});
