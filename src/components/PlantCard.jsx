// src/components/PlantCard.js
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {appTheme} from '../config/constants';

const PlantCard = ({plant, onEdit, onDelete}) => {
  return (
    <View style={styles.card}>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{plant.name}</Text>
        <Text style={styles.details}>Season: {plant.season}</Text>
        <Text style={styles.details}>Type: {plant.type}</Text>
        <Text style={styles.details}>Price: ${plant.price}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => onEdit(plant)}>
          <Icon name="edit" size={24} color={appTheme.colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(plant.id)}>
          <Icon name="delete" size={24} color={appTheme.colors.error} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: appTheme.colors.inputBackground,
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: appTheme.colors.primaryText,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: appTheme.fontSizes.medium,
    fontFamily: appTheme.fontFamilies.bold,
    color: appTheme.colors.primaryText,
    marginBottom: 5,
  },
  details: {
    fontSize: appTheme.fontSizes.small,
    fontFamily: appTheme.fontFamilies.regular,
    color: appTheme.colors.secondaryText,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
});

export default PlantCard;
