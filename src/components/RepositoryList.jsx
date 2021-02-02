import React, { useState } from 'react';
import { FlatList, TextInput, TouchableOpacity, View } from 'react-native';
import { useHistory } from 'react-router-native';

import ItemSeparator from './ItemSeparator';
import RepositoryItem from './RepositoryItem';
import SortPicker from './SortPicker';

import useRepositories from '../hooks/useRepositories';
import { useDebounce } from 'use-debounce';

const RepositoryListItem = ({ item, handlePress }) => {

  return (
    <TouchableOpacity onPress={() => handlePress(item)}>
      <RepositoryItem item={item} />
    </TouchableOpacity>
  );
};

const RepositoryListHeader = ({ sortingPolicy, handleSortingPolicyChange, searchKeyword, setSearchKeyword }) => {
  return (
    <View>
      <TextInput value={searchKeyword} onChange={event => setSearchKeyword(event.target.value)} />
      <SortPicker sortingPolicy={sortingPolicy} handleSortingPolicyChange={handleSortingPolicyChange} />
    </View>
  );
};

export const RepositoryListContainer = ({
  repositories,
  onEndReach,
  sortingPolicy,
  handleSortingPolicyChange,
  searchKeyword,
  setSearchKeyword
}) => {
  const history = useHistory();

  const handlePress = (item) => {
    history.push(`/${item.id}`);
  };

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={data => <RepositoryListItem {...data} handlePress={handlePress} />}
      keyExtractor={item => item.id}
      ListHeaderComponent={() => <RepositoryListHeader 
        sortingPolicy={sortingPolicy}
        handleSortingPolicyChange={handleSortingPolicyChange}
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        />}
      onEndReached={onEndReach}
      onEndReachedThreshold={.5}
    />
  );
};

const RepositoryList = () => {
  const [sortingPolicy, setSortingPolicy] = useState('latest');
  const [orderBy, setOrderBy] = useState('CREATED_AT');
  const [orderDirection, setOrderDirection] = useState('DESC');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 1000);

  const handleSortingPolicyChange = (policy) => {
    setSortingPolicy(policy);

    switch (policy) {
      case 'latest':
        setOrderBy('CREATED_AT');
        setOrderDirection('DESC');
        break;
      case 'highestRated':
        setOrderBy('RATING_AVERAGE');
        setOrderDirection('DESC');
        break;
      case 'lowestRated':
        setOrderBy('RATING_AVERAGE');
        setOrderDirection('ASC');
        break;
    }
  };

  const { repositories, fetchMore } = useRepositories({
    first: 8,
    orderBy,
    orderDirection,
    searchKeyword: debouncedSearchKeyword,
  });

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      onEndReach={onEndReach}
      sortingPolicy={sortingPolicy}
      handleSortingPolicyChange={handleSortingPolicyChange}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
    />
  );
};

export default RepositoryList;