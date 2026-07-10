import React, { useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import {
  launchCamera,
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';
import { useField } from 'formik';
import Colors from '@theme/Colors';
import Style from '@constants/Style';
import Logger from '@utils/Logger';
import ActionSheet from '@components/common/ActionSheet';

interface FormImagePickerProps {
  name: string;
  label?: string;
  placeholder?: string;
  containerStyle?: ViewStyle;
}

const FormImagePicker: React.FC<FormImagePickerProps> = ({
  name,
  label,
  placeholder = 'Select image',
  containerStyle,
}) => {
  const [field, meta, helpers] = useField(name);
  const [sheetVisible, setSheetVisible] = useState(false);
  const uri: string | undefined = field.value;
  const showError = meta.touched && Boolean(meta.error);

  const handleResult = (response: ImagePickerResponse) => {
    if (response.didCancel) {
      return;
    }
    if (response.errorCode) {
      Logger.warn('FormImagePicker error', response.errorMessage);
      return;
    }
    const asset = response.assets?.[0];
    if (asset?.uri) {
      helpers.setValue(asset.uri);
    }
  };

  const pick = async (source: 'camera' | 'library') => {
    helpers.setTouched(true);
    const options = { mediaType: 'photo' as const, quality: 0.8 as const };
    const launcher = source === 'camera' ? launchCamera : launchImageLibrary;
    const response = await launcher(options);
    handleResult(response);
  };

  const openSheet = () => setSheetVisible(true);

  const closeSheet = () => setSheetVisible(false);

  return (
    <View style={containerStyle}>
      {label != null && <Text style={styles.label}>{label}</Text>}
      <Pressable
        style={[styles.box, showError && styles.errorBorder]}
        onPress={openSheet}
      >
        {uri ? (
          <Image source={{ uri }} style={styles.preview} resizeMode="cover" />
        ) : (
          <Text style={styles.placeholder}>{placeholder}</Text>
        )}
      </Pressable>
      {showError && <Text style={styles.error}>{meta.error}</Text>}
      <ActionSheet
        visible={sheetVisible}
        onClose={closeSheet}
        options={[
          { label: 'Camera', onPress: () => pick('camera') },
          { label: 'Gallery', onPress: () => pick('library') },
        ]}
      />
    </View>
  );
};

export default FormImagePicker;

const styles = StyleSheet.create({
  label: {
    ...Style.getTextStyle(Style.kTextInputFontSize, 'Medium', Colors.black),
    marginBottom: 6,
  },
  box: {
    height: 120,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Style.kBorderRadius,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    overflow: 'hidden',
  },
  errorBorder: {
    borderColor: Colors.red,
  },
  preview: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    ...Style.getTextStyle(
      Style.kTextInputFontSize,
      'Regular',
      Colors.placeholder,
    ),
  },
  error: {
    ...Style.getTextStyle(12, 'Regular', Colors.red),
    marginTop: 4,
  },
});
