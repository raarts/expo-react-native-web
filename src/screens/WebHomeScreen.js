import React from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Dimensions from '../components/Dimensions';
import HomeScreen from "./AppHomeScreen";

export default class WebHomeScreen extends React.Component {
  render() {
    const { dimensions } = this.props.screenProps;

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.getStartedContainer}>
            <Text style={styles.getStartedText}>
              Welcome to our Website!
            </Text>
          </View>
          <Dimensions dimensions={dimensions} />
        </ScrollView>
      </View>
    );
  }
}

WebHomeScreen.defaultProps = {
  screenProps: PropTypes.shape({
    currentUser: null,
  }),
};

WebHomeScreen.propTypes = {
  screenProps: PropTypes.shape({
    currentUser: PropTypes.string.isRequired,
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
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
});
