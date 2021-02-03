import React, { useState } from 'react';
import { FlatList, TextInput, TouchableOpacity, View } from 'react-native';
import { useHistory } from 'react-router-native';

import ItemSeparator from './ItemSeparator';
import RepositoryItem from './RepositoryItem';
import SortPicker from './SortPicker';
import theme, { formStyles } from '../theme';

import useRepositories from '../hooks/useRepositories';
import { useDebounce } from 'use-debounce';

const RepositoryListItem = ({ item }) => {
  const history = useHistory();

  const handlePress = (item) => {
    history.push(`/${item.id}`);
  };

  return (
    <TouchableOpacity onPress={() => handlePress(item)}>
      <RepositoryItem item={item} />
    </TouchableOpacity>
  );
};

const RepositoryListHeader = ({ sortingPolicy, handleSortingPolicyChange, searchKeyword, setSearchKeyword }) => {
  return (
    <View style={{ ...formStyles.container, backgroundColor: theme.colors.backgroundGray }}>
      <TextInput value={searchKeyword} onChangeText={text => setSearchKeyword(text)} style={formStyles.element} />
      <SortPicker sortingPolicy={sortingPolicy} handleSortingPolicyChange={handleSortingPolicyChange} style={formStyles.element} />
    </View>
  );
};

export class RepositoryListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repositoryNodes: []
    };
  }

  renderHeader = () => {
    return (
      <RepositoryListHeader
        sortingPolicy={this.props.sortingPolicy}
        handleSortingPolicyChange={this.props.handleSortingPolicyChange}
        searchKeyword={this.props.searchKeyword}
        setSearchKeyword={this.props.setSearchKeyword}
      />
    );
  }

  static getDerivedStateFromProps = (newProps) => {
    return {
      repositoryNodes: newProps.repositories
        ? newProps.repositories.edges.map(edge => edge.node)
        : []
    };
  }

  render() {
    return (
      <FlatList
        data={this.state.repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={data => <RepositoryListItem {...data} />}
        keyExtractor={item => item.id}
        ListHeaderComponent={this.renderHeader}
        onEndReached={this.props.onEndReach}
        onEndReachedThreshold={.5}
      />
    );
  }
}

const RepositoryList = () => {
  const [sortingPolicy, setSortingPolicy] = useState('latest');
  const [orderBy, setOrderBy] = useState('CREATED_AT');
  const [orderDirection, setOrderDirection] = useState('DESC');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 300);

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