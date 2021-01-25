import React from 'react';
import Constants from 'expo-constants';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Link } from 'react-router-native';

import AppBarTab from './AppBarTab';
import theme from '../theme';

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
  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scrollView}>
        <Link to='/' component={(onPressEvent) => AppBarTab('Repositories', onPressEvent.onPress)} style={styles.link} />
        <Link to='/signin' component={(onPressEvent) => AppBarTab('SignIn', onPressEvent.onPress)} style={styles.link} />
      </ScrollView>
    </View>
  );
};

export default AppBar;