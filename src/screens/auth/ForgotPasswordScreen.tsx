import React from 'react';
import { Formik } from 'formik';
import { FormTextInput, FormSubmitButton } from '@components/form';
import AuthContainer from '@components/layout/AuthContainer';
import AuthLabeledContent from '@components/common/AuthLabeledContent';
import Spacer from '@components/layout/Spacer';
import { forgotPasswordSchema } from '@utils/validation/schemas';
import { AuthStackScreenProps } from '@navigation/types';

const ForgotPasswordScreen: React.FC<
  AuthStackScreenProps<'ForgotPasswordScreen'>
> = ({ navigation }) => {
  return (
    <AuthContainer centered={false}>
      <AuthLabeledContent
        title="Forgot Password"
        subtitle="Enter your email and we will send you a reset link"
      />
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
