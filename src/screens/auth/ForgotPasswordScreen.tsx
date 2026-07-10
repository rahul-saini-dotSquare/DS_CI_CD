import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Formik } from 'formik';
import { FormTextInput, FormSubmitButton } from '@components/form';
import AuthContainer from '@components/layout/AuthContainer';
import Spacer from '@components/layout/Spacer';
import Colors from '@theme/Colors';
import Style from '@constants/Style';
import { forgotPasswordSchema } from '@utils/validation/schemas';
import { AuthStackScreenProps } from '@navigation/types';

const ForgotPasswordScreen: React.FC<
  AuthStackScreenProps<'ForgotPasswordScreen'>
> = ({ navigation }) => {
  return (
    <AuthContainer centered={false}>
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.subtitle}>
        Enter your email and we will send you a reset link
      </Text>
      <Spacer height={32} />
      <Formik
        initialValues={{ email: '' }}
        validationSchema={forgotPasswordSchema}
        onSubmit={() => {
          navigation.goBack();
        }}
      >
        <>
          <FormTextInput
            name="email"
            label="Email"
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Spacer height={24} />
          <FormSubmitButton variant="dark" title="Send Reset Link" />
        </>
      </Formik>
    </AuthContainer>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  title: {
    ...Style.getTextStyle(26, 'Bold', Colors.black),
  },
  subtitle: {
    ...Style.getTextStyle(15, 'Regular', Colors.textColor),
    marginTop: 4,
  },
});
