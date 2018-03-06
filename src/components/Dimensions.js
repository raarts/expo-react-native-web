import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';

const Dimensions = (props) => {
  const { dimensions } = props;
  return (
    <View style={styles.container}>
      <View style={styles.dimensionsContainer}>
        <Text style={styles.dimensionsText}>
          { dimensions.size.width } x { dimensions.size.height } ({ dimensions.orientation })
        </Text>
      </View>
      <View style={styles.dimensionsContainer}>
        <Text style={styles.dimensionsText}>
        { dimensions.screenFormFactor }
        </Text>
        <Text style={styles.dimensionsText}>
          scale: { dimensions.scale.toFixed(2) }
        </Text>
      </View>
    </View>
  )
};

Dimensions.propTypes = {
  dimensions: PropTypes.shape({
    size: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    }),
    screenFormFactor: PropTypes.string.isRequired,
    orientation: PropTypes.string.isRequired,
    scale: PropTypes.number.isRequired,
  }).isRequired,
};

export default Dimensions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  dimensionsContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  dimensionsText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
});
