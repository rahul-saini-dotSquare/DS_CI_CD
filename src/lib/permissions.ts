import { Alert, Platform } from 'react-native';
import {
  check,
  request,
  openSettings,
  PERMISSIONS,
  RESULTS,
  Permission,
} from 'react-native-permissions';

const isGranted = (status: string) =>
  status === RESULTS.GRANTED || status === RESULTS.LIMITED;

const ensure = async (permission: Permission): Promise<boolean> => {
  const status = await check(permission);
  if (isGranted(status)) {
    return true;
  }
  if (status === RESULTS.BLOCKED) {
    Alert.alert(
      'Permission required',
      'Please enable this permission in Settings to continue.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Open Settings', onPress: () => openSettings('application') },
      ],
    );
    return false;
  }
  const result = await request(permission);
  return isGranted(result);
};

const cameraPermission = Platform.select({
  ios: PERMISSIONS.IOS.CAMERA,
  android: PERMISSIONS.ANDROID.CAMERA,
});

const photoPermission = Platform.select({
  ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
  android:
    Number(Platform.Version) >= 33
      ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
      : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
});

const permissions = {
  ensure,
  camera: () =>
    cameraPermission ? ensure(cameraPermission) : Promise.resolve(true),
  photoLibrary: () =>
    photoPermission ? ensure(photoPermission) : Promise.resolve(true),
};

export default permissions;
