import Toast from 'react-native-toast-message';

const hide = () => Toast.hide();

const toast = {
  success: (message: string, title = 'Success') => {
    Toast.show({
      type: 'success',
      text1: title,
      text2: message,
      onPress: hide,
    });
  },
  error: (message: string, title = 'Error') => {
    Toast.show({ type: 'error', text1: title, text2: message, onPress: hide });
  },
  info: (message: string, title?: string) => {
    Toast.show({ type: 'info', text1: title, text2: message, onPress: hide });
  },
  hide,
};

export default toast;
