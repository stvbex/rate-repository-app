import { useQuery } from '@apollo/react-hooks';
import React from 'react';
import { View, FlatList } from 'react-native';
import { useHistory } from 'react-router-native';

import { AUTHORIZED_USER } from '../graphql/queries';
import ReviewItem from './ReviewItem';

const MyReviews = () => {
  const history = useHistory();
  const { data, loading } = useQuery(AUTHORIZED_USER, {
    variables: { includeReviews: true }
  });

  const signedIn = data && data.authorizedUser;

  if (!loading && !signedIn) {
    history.push('/');
    return null;
  }

  const reviews = loading ? [] : data.authorizedUser.reviews.edges.map(edge => edge.node);

  return (
    <View>
      <FlatList
        data={reviews}
        renderItem={({ item }) => <ReviewItem review={item} myReviews={true} />}
        keyExtractor={({ id }) => id}
      />
    </View>
  );
};

export default MyReviews;