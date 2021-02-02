import React from 'react';
import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import SignUp from './SignUp';
import RepositoryView from './RepositoryView';
import ReviewFormContainer from './ReviewForm';

import { Redirect, Route, Switch } from 'react-router-native';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.backgroundGray,
    flexGrow: 1,
    flexShrink: 1,
  }
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route path='/' exact>
          <RepositoryList />
        </Route>
        <Route path='/reviewsform'>
          <ReviewFormContainer />
        </Route>
        <Route path='/signin'>
          <SignIn />
        </Route>
        <Route path='/signup'>
          <SignUp />
        </Route>
        <Route path='/:id'>
          <RepositoryView />
        </Route>
        <Redirect to='/' />
      </Switch>
    </View>
  );
};

export default Main;