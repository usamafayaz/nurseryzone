// src/components/Card.js
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {appTheme} from '../config/constants';

const Card = ({children, style}) => {
  return <View style={[styles.card, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: appTheme.colors.inputBackground,
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 16,
    shadowColor: appTheme.colors.primaryText,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
});

export default Card;
