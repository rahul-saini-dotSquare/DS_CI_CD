import { ColorValue, TextStyle } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Fonts, { FontType } from '@theme/Fonts';
import { hp, wp } from '@utils/responsive/ScreenResponsive';

class Style {
  static screenPadding = wp(5);
  static screenBottomPadding = DeviceInfo.hasNotch() ? 0 : hp(3);
  static kBorderRadius = 44 / 2;
  static kButtonHeight = 44;
  static kTextInputHeight = 44;
  static kButtonFontSize = 15;
  static kTextInputFontSize = 14;
  static kButtonFontFamily: FontType = 'Medium';
  static kTextInputFontFamily: FontType = 'Regular';
  static kDateFormat = 'DD/MM/yyyy';

  static getTextStyle(
    fontSize: number,
    fontFamily: FontType,
    color: ColorValue,
  ): TextStyle {
    return {
      fontFamily: Fonts.getFontFamily(fontFamily),
      fontSize: Fonts.normalize(fontSize),
      color: color,
    };
  }
}

export default Style;
