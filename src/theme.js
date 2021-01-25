import { Platform } from 'react-native';

const theme = {
  colors: {
    textPrimary: '#24292e', // blackish
    textSecondary: '#586069', // darkgray
    primary: '#0366d6', // button blue
    secondary: '#a9a9b0', // gray
    buttonTextPrimary: 'white',
    buttonTextSecondary: 'black',
    backgroundGray: 'lightgray',
    backgroundWhite: 'white',
    error: '#d73a4a', // red
  },
  fontSizes: {
    heading: 18,
    subheading: 16,
    body: 14,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System',
    }),
  },
  fontWeights: {
    normal: '400',
    bold: '700'
  },
  padding: {
    buttonPadding: 5,
    textInputPadding: 5,
    formContainerPadding: 10,
    appBar: 10,
    appBarTop: 20,
  },
  margins: {
    commonMargin: 2,
  },
  borders: {
    borderWidth: 1,
    borderRadius: 5,
  },
};

export default theme;