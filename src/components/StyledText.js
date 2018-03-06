import React from 'react';
import { Text, TextPropTypes } from 'react-native';

const MonoText = props => (
  <Text {...props} style={[props.style, { fontFamily: 'space-mono' }]} />
);

MonoText.propTypes = TextPropTypes;

export default MonoText;
