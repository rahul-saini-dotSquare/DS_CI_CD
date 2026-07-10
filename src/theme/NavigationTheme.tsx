import React from 'react';
import { DefaultTheme, Theme } from '@react-navigation/native';
import { StackNavigationOptions } from '@react-navigation/stack';
import BackButton from '@components/common/BackButton';
import Colors from './Colors';
import Fonts from './Fonts';
import Style from '@constants/Style';

export const ExtendedTheme: Theme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.primary,
    background: Colors.background,
    card: Colors.white,
    text: Colors.black,
    border: Colors.border,
  },
};

const renderHeaderLeft = () => <BackButton />;

export const stackScreenOptions: StackNavigationOptions = {
  headerShadowVisible: false,
  headerStyle: { backgroundColor: Colors.background },
  headerTitleAlign: 'center',
  headerTintColor: Colors.accent,
  headerLeftContainerStyle: {
    paddingLeft: Style.screenPadding / 2,
  },
  headerRightContainerStyle: {
    paddingRight: Style.screenPadding / 2,
  },
  headerTitleStyle: {
    fontFamily: Fonts.semiBold,
    fontSize: Fonts.normalize(18),
    color: Colors.black,
  },
  headerLeft: renderHeaderLeft,
  cardStyle: { backgroundColor: Colors.background },
};
