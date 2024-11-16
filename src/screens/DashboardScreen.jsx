// src/screens/DashboardScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {appTheme} from '../config/constants';

const DashboardScreen = ({navigation}) => {
  const menuItems = [
    {
      title: 'Manage Plants',
      icon: 'local-florist',
      screen: 'ManagePlants',
      color: '#4CAF50',
    },
    {
      title: 'View Plants',
      icon: 'visibility',
      screen: 'ViewPlants',
      color: '#2196F3',
    },
    {
      title: 'Orders',
      icon: 'shopping-cart',
      screen: 'OrderDetails',
      color: '#FF9800',
    },
    {
      title: 'Reviews',
      icon: 'star',
      screen: 'Reviews',
      color: '#FFC107',
    },
    {
      title: 'Customers',
      icon: 'people',
      screen: 'Customers',
      color: '#9C27B0',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Dashboard</Text>
      <View style={styles.cardsContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.card, {backgroundColor: item.color}]}
            onPress={() => navigation.navigate(item.screen)}>
            <Icon name={item.icon} size={40} color="white" />
            <Text style={styles.cardText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appTheme.colors.primaryBackground,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
    color: '#333',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    justifyContent: 'space-between',
  },
  card: {
    width: Dimensions.get('window').width / 2 - 20,
    height: 150,
    borderRadius: 10,
    padding: 20,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardText: {
    color: 'white',
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default DashboardScreen;
