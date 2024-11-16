// src/components/Header.js
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const Header = ({title, onLogout}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      {onLogout && (
        <TouchableOpacity onPress={onLogout}>
          <Text style={styles.logout}>Logout</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#4CAF50',
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logout: {
    color: 'white',
    fontSize: 16,
  },
});

export default Header;
