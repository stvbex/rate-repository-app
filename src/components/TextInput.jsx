import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  textInput: {
    borderWidth: theme.borders.borderWidth,
    borderColor: 'lightgray',
    borderRadius: theme.borders.borderRadius,
    margin: theme.margins.commonMargin,
    padding: theme.padding.textInputPadding,
  },
  errorTextInput: {
    borderColor: theme.colors.error,
  },
});

const TextInput = ({ style, error, ...props}) => {
  const textInputStyle = [
    styles.textInput,
    error && styles.errorTextInput,
    style
  ];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;