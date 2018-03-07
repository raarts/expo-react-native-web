/* eslint-disable react/no-multi-comp */
import React from 'react';
import PropTypes from 'prop-types';
import { TabNavigator, TabBarTop } from 'react-navigation';

import WebHomeScreen from '../../screens/phonesize/WebHomeScreen';
import AppHomeScreen from '../../screens/phonesize/AppHomeScreen';

import WebDocumentationScreen from '../../screens/WebDocumentationScreen';
import LinksScreen from '../../screens/LinksScreen';
import SettingsScreen from '../../screens/SettingsScreen';

const defaultProps = {
  screenProps: {
    currentUser: null,
  },
};

const propTypes = {
  screenProps: PropTypes.shape({
    currentUser: PropTypes.string,
  }),
};

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  render() {
    const { currentUser } = this.props.screenProps;

    if (currentUser) {
      return <AppHomeScreen {...this.props} />;
    }
    return <WebHomeScreen {...this.props} />;
  }
}

HomeScreen.defaultProps = defaultProps;
HomeScreen.propTypes = propTypes;

class SecondScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  render() {
    const { currentUser } = this.props.screenProps;

    if (currentUser) {
      return <LinksScreen {...this.props} />;
    }
    return <WebDocumentationScreen {...this.props} />;
  }
}

SecondScreen.defaultProps = defaultProps;
SecondScreen.propTypes = propTypes;

class ThirdScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  render() {
    const { currentUser } = this.props.screenProps;

    if (currentUser) {
      return <SettingsScreen {...this.props} />;
    }
    return <SettingsScreen {...this.props} />;
  }
}

ThirdScreen.defaultProps = defaultProps;
ThirdScreen.propTypes = propTypes;

const WebMainTabNavigator = TabNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Second: {
      screen: SecondScreen,
    },
    Third: {
      screen: ThirdScreen,
    },
  },
  {
    navigationOptions: (parm) => {
      const { screenProps, navigation } = parm;
      const { routeName } = navigation.state;
      let label = routeName;

      if (routeName === 'Home') {
        label = screenProps.currentUser ? 'Home' : 'Home';
      }
      if (routeName === 'Second') {
        label = screenProps.currentUser ? 'Links' : 'Documentation';
      }
      if (routeName === 'Third') {
        label = screenProps.currentUser ? 'Settings' : 'Login/Signup';
      }

      return ({
        tabBarLabel: label,
        tabBarOnPress: ({ /* previousScene, */ scene, jumpToIndex }) => {
          if (scene.route.routeName === 'Third' && !screenProps.currentUser) {
            // login();
          }
          jumpToIndex(scene.index);
        },
        header: null,
      });
    },
    tabBarComponent: TabBarTop,
    tabBarPosition: 'top',
    animationEnabled: true,
    swipeEnabled: false,
    tabBarOptions: {
      upperCaseLabel: false,
    },
  },
);

export default WebMainTabNavigator;
