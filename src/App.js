import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Constants, Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { version as reactNativeVersion } from 'react-native/package.json';
import RootNavigation from './navigation';

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    currentUser: null,
  };

  async componentWillMount() {
    console.log('Expo', Constants); // eslint-disable-line no-console
    console.log('React', React); // eslint-disable-line no-console
    console.log('React Native Version: ', reactNativeVersion); // eslint-disable-line no-console

    const [
      ignoredAssets, // eslint-disable-line no-unused-vars
      ignoredFonts, // eslint-disable-line no-unused-vars
    ] = await Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Ionicons.font,
        // We include SpaceMono because we use it in AppHomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
    this.setState({
      isLoadingComplete: true,
    });
  }

  doLogin = () => {
    console.log('doLogin()');
    this.setState({
      currentUser: 'yes',
    });
  };

  doLogout = () => {
    console.log('doLogout()');
    this.setState({
      currentUser: null,
    });
  };

  render() {
    if (!this.state.isLoadingComplete) {
      return (
        <AppLoading />
      );
    }
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
        <RootNavigation currentUser={this.state.currentUser} doLogin={this.doLogin} doLogout={this.doLogout} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});
