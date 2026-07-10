import Toast from 'react-native-toast-message';

const toast = {
  success: (message: string, title = 'Success') => {
    Toast.show({ type: 'success', text1: title, text2: message });
  },
  error: (message: string, title = 'Error') => {
    Toast.show({ type: 'error', text1: title, text2: message });
  },
  info: (message: string, title?: string) => {
    Toast.show({ type: 'info', text1: title, text2: message });
  },
};

export default toast;
