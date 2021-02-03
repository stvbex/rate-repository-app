import React, { useContext } from 'react';
import { useApolloClient } from '@apollo/client';
import Constants from 'expo-constants';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Link } from 'react-router-native';

import AuthStorageContext from '../contexts/AuthStorageContext';
import AppBarTab from './AppBarTab';
import theme from '../theme';
import { useQuery } from '@apollo/react-hooks';
import { AUTHORIZED_USER } from '../graphql/queries';

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    // display: 'flex',
    // flexDirection: 'column',
    // flexWrap: 'wrap',
    backgroundColor: theme.colors.textPrimary,
    padding: theme.padding.appBar,
    paddingTop: theme.padding.appBarTop,
  },
  scrollView: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap'
  },
  linksContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1
  },
  link: {
    flex: 1,
  },
});

const AppBar = () => {
  const { data: authorizedUserData } = useQuery(AUTHORIZED_USER);

  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();

  const signedIn = authorizedUserData && authorizedUserData.authorizedUser;

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scrollView}>
        <Link to='/' component={(onPressEvent) => AppBarTab('Repositories', onPressEvent.onPress)} style={styles.link} />
        {signedIn && <Link to='/reviewsform' component={(onPressEvent) => AppBarTab('Create a review', onPressEvent.onPress)} style={styles.link} />}
        {signedIn && <Link to='/myreviews' component={(onPressEvent) => AppBarTab('My reviews', onPressEvent.onPress)} style={styles.link} />}
        {signedIn && <Link to='/' component={() => AppBarTab('Sign Out', signOut)} style={styles.link} />}

        {!signedIn && <Link to='/signin' component={(onPressEvent) => AppBarTab('Sign In', onPressEvent.onPress)} style={styles.link} />}
        {!signedIn && <Link to='/signup' component={(onPressEvent) => AppBarTab('Sign Up', onPressEvent.onPress)} style={styles.link} />}
      </ScrollView>
    </View>
  );
};

export default AppBar;