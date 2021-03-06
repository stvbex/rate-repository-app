import React from 'react';
import { View, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import * as Linking from 'expo-linking';
import Text from './Text';

import theme from '../theme';

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: theme.colors.backgroundWhite,
  },
  imageImageAndInfoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'nowrap',
  },
  infoContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    flex: 1
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  statContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: theme.borders.borderRadius,
    margin: 10
  },
});

const RepositoryItem = ({ item, details }) => {
  const numberFormat = num => {
    return num >= 1000
      ? (num / 1000).toFixed(1) + 'k'
      : num;
  };

  const handleGithubPress = () => {
    Linking.openURL(item.url);
  };

  return (
    <View style={styles.itemContainer}>
      <View style={styles.imageImageAndInfoContainer}>
        <Image source={{ uri: item.ownerAvatarUrl }} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text fontSize='heading' fontWeight='bold' testID='fullName'>{item.fullName}</Text>
          <Text fontSize='subheading' color='textSecondary' testID='description'>{item.description}</Text>
          <Text buttonTheme='primary' testID='language'>{item.language}</Text>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statContainer}>
          <Text fontSize='heading' fontWeight='bold' testID='starsCount'>{numberFormat(item.stargazersCount)}</Text>
          <Text fontSize='subheading' color='textSecondary'>Stars</Text>
        </View>
        <View style={styles.statContainer}>
          <Text fontSize='heading' fontWeight='bold' testID='forksCount'>{numberFormat(item.forksCount)}</Text>
          <Text fontSize='subheading' color='textSecondary'>Forks</Text>
        </View>
        <View style={styles.statContainer}>
          <Text fontSize='heading' fontWeight='bold' testID='reviewCount'>{item.reviewCount}</Text>
          <Text fontSize='subheading' color='textSecondary'>Reviews</Text>
        </View>
        <View style={styles.statContainer}>
          <Text fontSize='heading' fontWeight='bold' testID='ratingAverage'>{item.ratingAverage}</Text>
          <Text fontSize='subheading' color='textSecondary'>Rating</Text>
        </View>
      </View >

      {details
        ? <TouchableWithoutFeedback onPress={handleGithubPress}>
          <Text buttonTheme='primary'>Open in GitHub</Text>
        </TouchableWithoutFeedback>
        : null}
    </View >
  );
};

export default RepositoryItem;