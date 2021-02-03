import { useQuery } from '@apollo/react-hooks';
import React from 'react';
import { FlatList, View } from 'react-native';
import { useParams } from 'react-router-native';
import { REPOSITORY } from '../graphql/queries';

import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';

const RepositoryView = () => {
  const reviewsBatchSize = 2;
  const { id } = useParams();
  const { loading, data, fetchMore } = useQuery(REPOSITORY, {
    variables: { id, reviewsFirst: reviewsBatchSize },
    fetchPolicy: 'cache-and-network',
  });

  const repository = data ? data.repository : {};
  const reviews = data ? data.repository.reviews.edges.map(edge => edge.node) : undefined;

  const handleOnEndReached = () => {
    const canFetchMore = !loading && data && data.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return null;
    }

    fetchMore({
      query: REPOSITORY,
      variables: {
        id,
        reviewsFirst: reviewsBatchSize,
        reviewsAfter: data.repository.reviews.pageInfo.endCursor,
      },
      updateQuery: (previewsResult, { fetchMoreResult }) => {
        return {
          repository: {
            ...fetchMoreResult.repository,
            reviews: {
              ...fetchMoreResult.repository.reviews,
              edges: [
                ...previewsResult.repository.reviews.edges,
                ...fetchMoreResult.repository.reviews.edges,
              ],
            }
          },
        };
      }
    });
  };

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryItem item={repository} details />}
      onEndReached={handleOnEndReached}
      onEndReachedThreshold={.5}
    />
  );
};

export default RepositoryView;