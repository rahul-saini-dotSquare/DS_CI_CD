import React, { useState } from 'react';
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import DateTimePicker, {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { useField } from 'formik';
import Colors from '@theme/Colors';
import Style from '@constants/Style';

type PickerMode = 'date' | 'time';

interface FormDatePickerProps {
  name: string;
  label?: string;
  placeholder?: string;
  mode?: PickerMode;
  minimumDate?: Date;
  maximumDate?: Date;
  containerStyle?: ViewStyle;
  format?: (value: Date) => string;
}

const pad = (input: number) => String(input).padStart(2, '0');

const formatValue = (value: Date, mode: PickerMode) => {
  if (mode === 'time') {
    return `${pad(value.getHours())}:${pad(value.getMinutes())}`;
  }
  return `${pad(value.getDate())}/${pad(value.getMonth() + 1)}/${value.getFullYear()}`;
};

const FormDatePicker: React.FC<FormDatePickerProps> = ({
  name,
  label,
  placeholder = 'Select',
  mode = 'date',
  minimumDate,
  maximumDate,
  containerStyle,
  format,
}) => {
  const [field, meta, helpers] = useField(name);
  const [iosOpen, setIosOpen] = useState(false);
  const [iosTemp, setIosTemp] = useState(new Date());
  const value: Date | undefined = field.value
    ? new Date(field.value)
    : undefined;
  const showError = meta.touched && Boolean(meta.error);
  const displayText = value
    ? format
      ? format(value)
      : formatValue(value, mode)
    : placeholder;

  const openAndroid = () => {
    DateTimePickerAndroid.open({
      value: value ?? new Date(),
      mode,
      minimumDate,
      maximumDate,
      onChange: (event: DateTimePickerEvent, date?: Date) => {
        if (event.type === 'set' && date) {
          helpers.setValue(date);
        }
      },
    });
  };

  const open = () => {
    helpers.setTouched(true);
    if (Platform.OS === 'android') {
      openAndroid();
    } else {
      setIosTemp(value ?? new Date());
      setIosOpen(true);
    }
  };

  const confirmIos = () => {
    helpers.setValue(iosTemp);
    setIosOpen(false);
  };

  return (
    <View style={containerStyle}>
      {label != null && <Text style={styles.label}>{label}</Text>}
      <Pressable
        style={[styles.box, showError && styles.errorBorder]}
        onPress={open}
      >
        <Text style={value ? styles.value : styles.placeholder}>
          {displayText}
        </Text>
      </Pressable>
      {showError && <Text style={styles.error}>{meta.error}</Text>}
      {Platform.OS === 'ios' && (
        <Modal
          visible={iosOpen}
          transparent
          animationType="slide"
          onRequestClose={() => setIosOpen(false)}
        >
          <Pressable
            style={styles.backdrop}
            onPress={() => setIosOpen(false)}
          />
          <View style={styles.sheet}>
            <View style={styles.sheetHeader}>
              <Pressable onPress={() => setIosOpen(false)}>
                <Text style={styles.cancel}>Cancel</Text>
              </Pressable>
              <Pressable onPress={confirmIos}>
                <Text style={styles.done}>Done</Text>
              </Pressable>
            </View>
            <DateTimePicker
              value={iosTemp}
              mode={mode}
              style={styles.picker}
              display="spinner"
              minimumDate={minimumDate}
              maximumDate={maximumDate}
              onChange={(_e, date) => date && setIosTemp(date)}
            />
          </View>
        </Modal>
      )}
    </View>
  );
};

export default FormDatePicker;

const styles = StyleSheet.create({
  label: {
    ...Style.getTextStyle(Style.kTextInputFontSize, 'Medium', Colors.black),
    marginBottom: 6,
  },
  box: {
    height: Style.kTextInputHeight,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Style.kBorderRadius,
    paddingHorizontal: 14,
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  errorBorder: {
    borderColor: Colors.red,
  },
  value: {
    ...Style.getTextStyle(Style.kTextInputFontSize, 'Regular', Colors.black),
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
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
  sheet: {
    backgroundColor: Colors.white,
    paddingBottom: 24,
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  cancel: {
    ...Style.getTextStyle(15, 'Regular', Colors.textColor),
  },
  done: {
    ...Style.getTextStyle(15, 'SemiBold', Colors.primary),
  },
  picker: {
    alignSelf: 'center',
  },
});
