import React from 'react';
import { View, StyleSheet } from 'react-native';
import { format } from 'date-fns';

import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  reviewContainer: {
    backgroundColor: theme.colors.backgroundWhite,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 10,
  },
  reviewContentContainer: {
    flex: 1,
    margin: 2 * theme.margins.commonMargin,
  },
  rating: {
    color: theme.colors.primary,
    fontSize: theme.fontSizes.heading,
    fontWeight: theme.fontWeights.bold,
    textAlign: 'center',
    lineHeight: 75,
    borderWidth: 3,
    borderColor: theme.colors.primary,
    borderRadius: 80 / 2,
    width: 80,
    height: 80,
    margin: 2 * theme.margins.commonMargin,
  }
});

const ReviewItem = ({ review }) => {
  
  return (
    <View style={styles.reviewContainer}>
      <Text style={styles.rating}>{review.rating}</Text>
      <View style={styles.reviewContentContainer}>
        <Text fontSize='heading' fontWeight='bold'>{review.user.username}</Text>
        <Text fontSize='subheading' color='textSecondary'>{format(new Date(review.createdAt), 'dd.MM.yyyy')}</Text>
        <Text fontSize='subheading'>{review.text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;