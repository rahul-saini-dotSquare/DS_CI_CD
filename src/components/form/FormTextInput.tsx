import React from 'react';
import { useField } from 'formik';
import AdaptiveTextInput, {
  AdaptiveTextInputProps,
} from '@components/ui/AdaptiveTextInput';

interface FormTextInputProps
  extends Omit<AdaptiveTextInputProps, 'value' | 'onChangeText' | 'error'> {
  name: string;
}

const FormTextInput: React.FC<FormTextInputProps> = ({ name, ...rest }) => {
  const [field, meta, helpers] = useField(name);

  return (
    <AdaptiveTextInput
      value={field.value}
      onChangeText={helpers.setValue}
      onBlur={() => helpers.setTouched(true)}
      error={meta.touched ? meta.error : undefined}
      {...rest}
    />
  );
};

export default FormTextInput;
