import React, {memo} from 'react';
import {View, StyleSheet} from 'react-native';

const THUMB_RADIUS_LOW = 12;
const THUMB_RADIUS_HIGH = 12;

const Thumb = ({name}) => {
  return <View style={name === 'high' ? styles.rootHigh : styles.rootLow} />;
};

const styles = StyleSheet.create({
  rootLow: {
    width: 0,
    height: 0,
    borderRadius: THUMB_RADIUS_LOW,
    borderWidth: 3,
    borderColor: '#00A651',
    backgroundColor: '#00A651',
  },
  rootHigh: {
    width: 0,
    height: 0,
    borderRadius: THUMB_RADIUS_HIGH,
    borderWidth: 3,
    borderColor: '#00A651',
    backgroundColor: '#00A651',
  },
});

export default memo(Thumb);
