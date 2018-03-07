import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions, Platform } from 'react-native';
import { Notifications } from 'expo';

import { AppPhoneRootNavigator } from './AppPhone/index';
import { AppTabletRootNavigator } from './AppTablet/index';
import MenuPhoneRootNavigator from './WebPhone/index';
import MenuTabletRootNavigator from './WebTablet/index';
import MenuMonitorRootNavigator from './WebMonitor/index';

import AppPhoneLoginNavigator from './AppLogin'; // eslint-disable-line import/no-duplicates
import AppTabletLoginNavigator from './AppLogin'; // eslint-disable-line import/no-duplicates

import registerForPushNotificationsAsync from '../infrastructure/registerForPushNotificationsAsync';

const IPHONE7_WIDTH = 375;
const IPHONE7_HEIGHT = 667;
const IPAD_WIDTH = 768;
const IPAD_HEIGHT = 1024;
const IPAD_PRO_WIDTH = 1024;
const IPAD_PRO_HEIGHT = 1366; // eslint-disable-line no-unused-vars

const defaultProps = {
  currentUser: null,
};

const propTypes = {
  currentUser: PropTypes.string,
};

class RootNavigator extends React.Component {
  constructor(s, c) {
    super(s, c);
    this.state = this.setNewDimensions({ screen: Dimensions.get('screen'), window: Dimensions.get('window') });
  }

  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications();
    Dimensions.addEventListener('change', this.onDimensionChange);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.onDimensionChange);
    if (this._notificationSubscription) {
      this._notificationSubscription.remove();
    }
  }

  onDimensionChange = (dim) => {
    this.setState(this.setNewDimensions(dim));
  };

  setNewDimensions = (dim) => {
    let orientation;
    let screenFormFactor = 'phonesize';
    let scale;

    let { width, height } = dim.screen;
    if (Platform.OS === 'web') {
      ({ width, height } = dim.window);
    }
    if (width > height) { // LANDSCAPE MODE
      orientation = 'landscape';
      scale = width / IPHONE7_HEIGHT;
      if (width > IPHONE7_HEIGHT) {
        screenFormFactor = 'tabletsize';
        scale = width / IPAD_HEIGHT;
      }
      if (width > IPAD_HEIGHT) {
        screenFormFactor = 'monitorsize';
        scale = width / IPAD_PRO_HEIGHT;
      }
    } else {
      orientation = 'portrait'; // PORTRAIT MODE
      scale = width / IPHONE7_WIDTH;
      // if (width > IPHONE7_WIDTH) {
      //   screenFormFactor = 'tabletsize';
      //   scale = width / IPAD_WIDTH;
      // }
      if (width > IPAD_WIDTH) {
        screenFormFactor = 'monitorsize';
        scale = width / IPAD_PRO_WIDTH;
      }
    }
    const state = {
      size: { width, height }, screenFormFactor, orientation, scale,
    };
    // console.log(width, height, state.screenFormFactor, state.orientation, state.scale);
    return (state);
  };

  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in infrastructure/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync();

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = ({ origin, data }) => {
    console.log(`Push notification ${origin} with data: ${JSON.stringify(data)}`);
  };

  // decide on which RootNavigator is going to be used. This depends on the environment as follows:
  // - resizable (browser, osx/windows): use one of three menu-based layout (depending on the size)
  // - small/medium fixed size (phonesize/tabletsize): use one of two app-based layouts
  // - big fixed size: use the big menu-based layout
  render() {
    let Root;
    const { props } = this;

    const screenProps = {
      currentUser: props.currentUser,
      doLogin: props.doLogin,
      doLogout: props.doLogout,
      dimensions: this.state,
    };

    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      switch (this.state.screenFormFactor) { // eslint-disable-line default-case
        case 'phonesize':
          Root = this.props.currentUser ? AppPhoneRootNavigator : AppPhoneLoginNavigator;
          break;
        case 'tabletsize':
          Root = this.props.currentUser ? AppTabletRootNavigator : AppTabletLoginNavigator;
          break;
      }
    }
    if (Platform.OS === 'web') {
      switch (this.state.screenFormFactor) { // eslint-disable-line default-case
        case 'phonesize':
          Root = MenuPhoneRootNavigator;
          break;
        case 'tabletsize':
          Root = MenuTabletRootNavigator;
          break;
        case 'monitorsize':
          Root = MenuMonitorRootNavigator;
          break;
      }
    }
    return (<Root screenProps={screenProps} {...props} />);
  }
}

RootNavigator.propTypes = propTypes;
RootNavigator.defaultProps = defaultProps;

export default RootNavigator;
