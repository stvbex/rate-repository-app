import { useQuery } from '@apollo/react-hooks';
import React from 'react';
import { FlatList } from 'react-native';
import { useParams } from 'react-router-native';
import { REPOSITORY } from '../graphql/queries';

import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';

const RepositoryView = () => {
  const { id } = useParams();
  const { loading, data } = useQuery(REPOSITORY, {
    variables: { id },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) {
    return null;
  }
  
  const reviews = data.repository.reviews.edges.map(edge => edge.node);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryItem item={data.repository} details />}
    />
  );
};

export default RepositoryView;