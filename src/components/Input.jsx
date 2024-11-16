// src/components/Input.js
import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

const Input = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  ...props
}) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
    fontSize: 16,
  },
});

export default Input;
