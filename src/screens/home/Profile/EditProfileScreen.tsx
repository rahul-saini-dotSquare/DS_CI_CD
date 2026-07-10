import React from 'react';
import { StyleSheet } from 'react-native';
import { Formik } from 'formik';
import {
  FormTextInput,
  FormSubmitButton,
  FormImagePicker,
} from '@components/form';
import AuthContainer from '@components/layout/AuthContainer';
import Spacer from '@components/layout/Spacer';
import { profileSchema } from '@utils/validation/schemas';
import { ProfileFormValues } from '@app-types/profile';
import { AppStackScreenProps } from '@navigation/types';

const emptyProfile: ProfileFormValues = {
  name: '',
  email: '',
  phone: '',
  photo: '',
};

const EditProfileScreen: React.FC<AppStackScreenProps<'EditProfileScreen'>> = ({
  route,
  navigation,
}) => {
  const existingProfile = route.params?.profile;
  const isEdit = existingProfile != null;

  return (
    <AuthContainer centered={false} contentContainerStyle={styles.content}>
      <Formik
        enableReinitialize
        initialValues={existingProfile ?? emptyProfile}
        validationSchema={profileSchema}
        onSubmit={() => {
          navigation.goBack();
        }}
      >
        <>
          <FormImagePicker name="photo" label="Photo" />
          <Spacer height={16} />
          <FormTextInput
            name="name"
            label="Full Name"
            placeholder="Enter your name"
          />
          <Spacer height={16} />
          <FormTextInput
            name="email"
            label="Email"
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Spacer height={16} />
          <FormTextInput
            name="phone"
            label="Phone"
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
          />
          <Spacer height={24} />
          <FormSubmitButton
            variant="dark"
            title={isEdit ? 'Save Changes' : 'Add Profile'}
          />
        </>
      </Formik>
    </AuthContainer>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  content: {
    paddingTop: 24,
  },
});
