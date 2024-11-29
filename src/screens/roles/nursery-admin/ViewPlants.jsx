// src/screens/ViewPlantsScreen.js
import React, {useState} from 'react';
import {View, FlatList, StyleSheet, Text} from 'react-native';
import PlantCard from '../../../components/PlantCard';
import {DUMMY_PLANTS} from '../../../utils/dummyData';
import {appTheme} from '../../../config/constants';

const ViewPlantsScreen = ({navigation}) => {
  const [plants, setPlants] = useState(DUMMY_PLANTS);

  const handleEdit = plant => {
    navigation.navigate('ManagePlants', {plant});
  };

  const handleDelete = plantId => {
    setPlants(plants.filter(plant => plant.id !== plantId));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Plants</Text>
      {plants.length > 0 ? (
        <FlatList
          data={plants}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <PlantCard
              plant={item}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
          contentContainerStyle={styles.list}
        />
      ) : (
        <Text style={styles.noPlantsText}>No plants available. Add some!</Text>
      )}
    </View>
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
  list: {
    paddingBottom: 20,
  },
  noPlantsText: {
    textAlign: 'center',
    fontSize: appTheme.fontSizes.medium,
    color: appTheme.colors.secondaryText,
    marginTop: 50,
  },
});

export default ViewPlantsScreen;
