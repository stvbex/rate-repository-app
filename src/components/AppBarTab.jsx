import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';

import Text from './Text';

const AppBarTab = (txt, handlePress) => {
  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View>
        <Text buttonTheme='navigation'>{txt}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AppBarTab;