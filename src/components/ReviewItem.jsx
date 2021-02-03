import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Alert, Platform } from 'react-native';
import { format } from 'date-fns';
import * as Linking from 'expo-linking';

import theme from '../theme';
import Text from './Text';
import { useMutation } from '@apollo/react-hooks';
import { DELETE_REVIEW } from '../graphql/mutations';
import { AUTHORIZED_USER } from '../graphql/queries';

const styles = StyleSheet.create({
  reviewContainer: {
    backgroundColor: theme.colors.backgroundWhite,
    marginTop: 10,
  },
  reviewDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  reviewContentContainer: {
    flex: 1,
    margin: 2 * theme.margins.commonMargin,
  },
  reviewButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
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

const ReviewItem = ({ review, myReviews }) => {
  const [delReview] = useMutation(DELETE_REVIEW, {
    refetchQueries: [{ query: AUTHORIZED_USER, variables: { includeReviews: true } }]
  });

  const handleGitHubPress = () => {
    Linking.openURL(review.repository.url);
  };

  const handleDeleteReview = () => {
    const alertTitle = 'Delete review';
    const alertText = 'Are you sure you want to delete this review?';

    if (Platform.OS === 'web') {
      const deleteConfirmed = window.confirm(`${alertTitle}\n${alertText}`);
      if (deleteConfirmed) {
        console.log('Deleting ...');
        delReview({ variables: { id: review.id } });
      }
    }
    else {
      Alert.alert(
        alertTitle,
        alertText,
        [
          {
            text: 'Cancel',
          },
          {
            text: 'Delete',
            onPress: () => delReview({ variables: { id: review.id } })
          }
        ],
        { cancelable: true }
      );
    }

  };

  return (
    <View style={styles.reviewContainer}>
      <View style={styles.reviewDetailsContainer}>
        <Text style={styles.rating}>{review.rating}</Text>
        <View style={styles.reviewContentContainer}>
          {!myReviews && <Text fontSize='heading' fontWeight='bold'>{review.user.username}</Text>}
          {myReviews && <Text fontSize='heading' fontWeight='bold'>{review.repository.fullName}</Text>}
          <Text fontSize='subheading' color='textSecondary'>{format(new Date(review.createdAt), 'dd.MM.yyyy')}</Text>
          <Text fontSize='subheading'>{review.text}</Text>
        </View>
      </View>
      {myReviews
        && <View style={styles.reviewButtonsContainer}>
          <TouchableWithoutFeedback onPress={handleGitHubPress}>
            <Text buttonTheme='primary'>View repository</Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={handleDeleteReview}>
            <Text buttonTheme='warning'>Delete review</Text>
          </TouchableWithoutFeedback>
        </View>}
    </View>
  );
};

export default ReviewItem;