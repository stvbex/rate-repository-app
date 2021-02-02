import React from 'react';
import { View, Picker } from 'react-native';

const SortPicker = ({ sortingPolicy, handleSortingPolicyChange }) => {

  return (
    <View>
      <Picker
        selectedValue={sortingPolicy}
        onValueChange={handleSortingPolicyChange}
      >
        <Picker.Item label='Latest repositories' value='latest' />
        <Picker.Item label='Highest rated repositories' value='highestRated' />
        <Picker.Item label='Lowest rated repositories' value='lowestRated' />
      </Picker>
    </View>
  );
};

export default SortPicker;