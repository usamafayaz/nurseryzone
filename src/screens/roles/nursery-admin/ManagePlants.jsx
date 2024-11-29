// src/screens/ManagePlants.js
import React, {useState} from 'react';
import {View, ScrollView, StyleSheet, Alert, Text} from 'react-native';
import {appTheme} from '../../../config/constants';
import Button from '../../../components/Button';
import InputField from '../../../components/InputField';

const ManagePlants = () => {
  const [plantData, setPlantData] = useState({
    name: '',
    season: '',
    type: '',
    price: '',
  });

  const [error, setError] = useState('');

  const handleAddPlant = () => {
    // Validation logic (optional)
    if (
      !plantData.name ||
      !plantData.season ||
      !plantData.type ||
      !plantData.price
    ) {
      setError('All fields are required.');
      return;
    }
    setError('');
    Alert.alert('Success', 'Plant added successfully');
    setPlantData({name: '', season: '', type: '', price: ''});
  };

  return (
    <ScrollView style={styles.container}>
      <InputField
        label="Plant Name"
        iconName="spa"
        placeholder="Enter plant name"
        value={plantData.name}
        onChangeText={text => setPlantData({...plantData, name: text})}
        error={error && !plantData.name ? 'This field is required' : ''}
      />
      <InputField
        label="Season"
        iconName="calendar-today"
        placeholder="Enter season"
        value={plantData.season}
        onChangeText={text => setPlantData({...plantData, season: text})}
        error={error && !plantData.season ? 'This field is required' : ''}
      />
      <InputField
        label="Type"
        iconName="category"
        placeholder="Enter type"
        value={plantData.type}
        onChangeText={text => setPlantData({...plantData, type: text})}
        error={error && !plantData.type ? 'This field is required' : ''}
      />
      <InputField
        label="Price"
        iconName="attach-money"
        placeholder="Enter price"
        value={plantData.price}
        onChangeText={text => setPlantData({...plantData, price: text})}
        keyboardType="numeric"
        error={error && !plantData.price ? 'This field is required' : ''}
      />
      <Button
        title="Add Plant"
        onPress={handleAddPlant}
        style={styles.button}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: appTheme.colors.primaryBackground,
  },
  header: {
    fontSize: appTheme.fontSizes.large,
    fontFamily: appTheme.fontFamilies.bold,
    color: appTheme.colors.primaryText,
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    backgroundColor: appTheme.colors.primary,
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ManagePlants;
