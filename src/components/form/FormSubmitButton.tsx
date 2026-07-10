import React from 'react';
import { useFormikContext } from 'formik';
import AdaptiveButton, {
  AdaptiveButtonProps,
} from '@components/ui/AdaptiveButton';

interface FormSubmitButtonProps
  extends Omit<AdaptiveButtonProps, 'onPress' | 'loading'> {
  title: string;
}

const FormSubmitButton: React.FC<FormSubmitButtonProps> = props => {
  const { handleSubmit, isSubmitting } = useFormikContext();

  return (
    <AdaptiveButton
      {...props}
      loading={isSubmitting}
      disabled={props.disabled || isSubmitting}
      onPress={() => handleSubmit()}
    />
  );
};

export default FormSubmitButton;
