import React, { useState } from 'react';
import AdaptiveTextInput from '@components/ui/AdaptiveTextInput';
import AdaptiveButton from '@components/ui/AdaptiveButton';
import AuthContainer from '@components/layout/AuthContainer';
import AuthLabeledContent from '@components/common/AuthLabeledContent';
import Spacer from '@components/layout/Spacer';
import AuthService from '@api/service/AuthService';
import { AUTH_TOKEN } from '@constants/AppConstants';
import { AuthStackScreenProps } from '@navigation/types';

const SignUpScreen: React.FC<AuthStackScreenProps<'SignUpScreen'>> = ({
  navigation,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    await AuthService.storeSession(AUTH_TOKEN, { id: '1', name, email });
  };

  return (
    <AuthContainer centered={false}>
      <AuthLabeledContent
        title="Create Account"
        subtitle="Sign up to get started"
      />
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
        onPress={() => navigation.goBack()}
      />
    </AuthContainer>
  );
};

export default SignUpScreen;
