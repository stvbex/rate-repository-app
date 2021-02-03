import React from 'react';
import { Text as NativeText, StyleSheet } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
    margin: theme.margins.commonMargin,
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorPrimary: {
    backgroundColor: theme.colors.primary,
  },
  colorSecondary: {
    backgroundColor: theme.colors.secondary,
  },
  fontSizeHeading: {
    fontSize: theme.fontSizes.heading
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
  buttonThemePrimary: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.buttonTextPrimary,
    padding: theme.padding.buttonPadding,
    borderRadius: theme.borders.borderRadius,
    textAlign: 'center',
  },
  buttonThemeSecondary: {
    backgroundColor: theme.colors.secondary,
    color: theme.colors.buttonTextSecondary,
    padding: theme.padding.buttonPadding,
    borderRadius: theme.borders.borderRadius,
    textAlign: 'center',
  },
  buttonThemeNavigation: {
    fontSize: theme.fontSizes.heading,
    color: theme.colors.buttonTextPrimary,
    padding: theme.padding.buttonPadding,
    textAlign: 'center',
  },
  buttonThemeWarning: {
    backgroundColor: theme.colors.warning,
    color: theme.colors.buttonTextPrimary,
    padding: theme.padding.buttonPadding,
    borderRadius: theme.borders.borderRadius,
    textAlign: 'center',
  },
});

const Text =({ color, buttonTheme, fontSize, fontWeight, style, ...props }) => {
  const textStyle = [
    styles.text,
    color === 'textSecondary' && styles.colorTextSecondary,
    fontSize === 'heading' && styles.fontSizeHeading,
    fontSize === 'subheading' && styles.fontSizeSubheading,
    fontWeight === 'bold' && styles.fontWeightBold,
    buttonTheme === 'primary' && styles.buttonThemePrimary,
    buttonTheme === 'secondary' && styles.buttonThemeSecondary,
    buttonTheme === 'navigation' && styles.buttonThemeNavigation,
    buttonTheme === 'warning' && styles.buttonThemeWarning,
    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export default Text;