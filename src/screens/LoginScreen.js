import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import WebHomeScreen from "./WebHomeScreen";

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  _handleLoginPress = () => {
    this.props.screenProps.doLogin();
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/robot-dev.png')
                  : require('../assets/images/robot-prod.png')
              }
              style={styles.welcomeImage}
            />
          </View>

          <View style={styles.helpContainer}>
            <TouchableOpacity onPress={this._handleLoginPress} style={styles.helpLink}>
              <Text style={styles.helpLinkText}>Web Login!</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

LoginScreen.defaultProps = {
  screenProps: {
    currentUser: 'yes',
    doLogin: () => {},
    doLogout: () => {},
    dimensions: {
      size: {
        width: 0,
        height: 0,
      },
      screenFormFactor: 'phone',
      orientation: 'landscape',
      scale: 1.0,
    },
  },
};

LoginScreen.propTypes = {
  screenProps: PropTypes.shape({
    currentUser: PropTypes.string,
    doLogin: PropTypes.func.isRequired,
    doLogout: PropTypes.func.isRequired,
    dimensions: PropTypes.shape({
      size: PropTypes.shape({
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
      }),
      screenFormFactor: PropTypes.string.isRequired,
      orientation: PropTypes.string.isRequired,
      scale: PropTypes.number.isRequired,
    }),
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
