import React from 'react';
import { Text } from 'react-native';

const MonoText = props => (
  <Text {...props} style={[props.style, { fontFamily: 'space-mono' }]} />
);

MonoText.propTypes = Text.propTypes;

export default MonoText;
