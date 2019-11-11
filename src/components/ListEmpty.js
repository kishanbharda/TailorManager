/**
 * Display message when List is empty.
 */

import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import CText from './CText';

const ListEmpty = props => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <CText
        style={[
          {
            fontSize: 24,
            textAlign: 'center',
            color: '#bdbdbd'
          },
          {
            ...props.textStyle
          }
        ]}>
        {props.message}
      </CText>
    </View>
  );
};

ListEmpty.propTypes = {
  message: PropTypes.string.isRequired,
  textStyle: PropTypes.objectOf(PropTypes.object).isRequired
};

export default ListEmpty;
