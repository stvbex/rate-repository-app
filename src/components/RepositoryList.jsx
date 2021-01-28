import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';

import useRepositories from '../hooks/useRepositories';

import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { data, loading } = useRepositories();

  const repositoryNodes = loading
    ? []
    : data.repositories.edges.map(edge => edge.node);
    

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={RepositoryItem}
      keyExtractor={item => item.id}
    />
  );
};

export default RepositoryList;