import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const scale = Math.min(SCREEN_WIDTH, SCREEN_HEIGHT) / 420;

export type FontType =
  | 'Light'
  | 'Regular'
  | 'Medium'
  | 'SemiBold'
  | 'Bold'
  | 'ExtraBold';

class Fonts {
  static light: string = 'Inter-Light';
  static regular: string = 'Inter-Regular';
  static medium: string = 'Inter-Medium';
  static semiBold: string = 'Inter-SemiBold';
  static bold: string = 'Inter-Bold';
  static extraBold: string = 'Inter-ExtraBold';

  static normalize = (size: number) => {
    const newSize = size * scale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  };

  static getFontFamily(type: FontType): string {
    switch (type) {
      case 'Light':
        return Fonts.light;
      case 'Regular':
        return Fonts.regular;
      case 'Medium':
        return Fonts.medium;
      case 'SemiBold':
        return Fonts.semiBold;
      case 'Bold':
        return Fonts.bold;
      case 'ExtraBold':
        return Fonts.extraBold;
    }
  }
}

export default Fonts;
