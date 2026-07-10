import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Formik } from 'formik';
import { FormTextInput, FormSubmitButton } from '@components/form';
import AdaptiveButton from '@components/ui/AdaptiveButton';
import AdaptiveCheckbox from '@components/ui/AdaptiveCheckbox';
import AuthContainer from '@components/layout/AuthContainer';
import Spacer from '@components/layout/Spacer';
import Colors from '@theme/Colors';
import Style from '@constants/Style';
import { loginSchema } from '@utils/validation/schemas';
import AuthService from '@api/service/AuthService';
import keychain from '@lib/keychain';
import { AuthStackScreenProps } from '@navigation/types';

interface LoginFormValues {
  email: string;
  password: string;
}

const emptyValues: LoginFormValues = { email: '', password: '' };

const LoginScreen: React.FC<AuthStackScreenProps<'LoginScreen'>> = ({
  navigation,
}) => {
  const [initialValues, setInitialValues] =
    useState<LoginFormValues>(emptyValues);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    keychain.load().then(credentials => {
      if (credentials) {
        setInitialValues(credentials);
        setRememberMe(true);
      }
    });
  }, []);

  const handleLogin = async (values: LoginFormValues) => {
    await AuthService.storeSession('demo-token', {
      id: '1',
      name: 'Demo User',
      email: values.email,
    });
    if (rememberMe) {
      await keychain.save(values.email, values.password);
    } else {
      await keychain.reset();
    }
  };

  return (
    <AuthContainer centered={false}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Sign in to continue</Text>
      <Spacer height={32} />
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={handleLogin}
      >
        <>
          <FormTextInput
            name="email"
            label="Email"
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Spacer height={16} />
          <FormTextInput
            name="password"
            label="Password"
            placeholder="Enter your password"
            isPassword
          />
          <Spacer height={16} />
          <View style={styles.row}>
            <AdaptiveCheckbox
              checked={rememberMe}
              onChange={setRememberMe}
              label="Remember Me"
            />
            <AdaptiveButton
              variant="text"
              title="Forgot Password?"
              style={styles.forgot}
              onPress={() => navigation.navigate('ForgotPasswordScreen')}
            />
          </View>
          <Spacer height={16} />
          <FormSubmitButton variant="dark" title="Login" />
        </>
      </Formik>
      <Spacer height={16} />
      <AdaptiveButton
        variant="text"
        title="Don't have an account? Sign Up"
        onPress={() => navigation.navigate('SignUpScreen')}
      />
    </AuthContainer>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  title: {
    ...Style.getTextStyle(26, 'Bold', Colors.black),
  },
  subtitle: {
    ...Style.getTextStyle(15, 'Regular', Colors.textColor),
    marginTop: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  forgot: {
    height: undefined,
    paddingHorizontal: 0,
  },
});
