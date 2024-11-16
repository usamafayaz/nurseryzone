// src/screens/OrderDetailsScreen.js
import React from 'react';
import {View, FlatList, Text, StyleSheet} from 'react-native';
import Card from '../components/Card';
import {DUMMY_ORDERS} from '../utils/dummyData';
import {appTheme} from '../config/constants';

const OrderDetailsScreen = () => {
  const renderOrder = ({item}) => (
    <Card>
      <Text style={styles.orderId}>Order #{item.id}</Text>
      <Text style={styles.customerName}>Customer: {item.customerName}</Text>
      <Text style={styles.date}>Date: {item.date}</Text>
      <Text style={styles.status}>Status: {item.status}</Text>
      <Text style={styles.itemsHeader}>Items:</Text>
      {item.items.map((orderItem, index) => (
        <View key={index} style={styles.orderItem}>
          <Text style={styles.itemText}>Plant ID: {orderItem.plantId}</Text>
          <Text style={styles.itemText}>Quantity: {orderItem.quantity}</Text>
          <Text style={styles.itemText}>Price: ${orderItem.price}</Text>
        </View>
      ))}
      <Text style={styles.total}>Total: ${item.total}</Text>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={DUMMY_ORDERS}
        keyExtractor={item => item.id.toString()}
        renderItem={renderOrder}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appTheme.colors.primaryBackground,
    paddingVertical: 10,
  },
  list: {
    paddingBottom: 20,
  },
  orderId: {
    fontSize: appTheme.fontSizes.medium,
    fontFamily: appTheme.fontFamilies.bold,
    color: appTheme.colors.primaryText,
    marginBottom: 8,
  },
  customerName: {
    fontSize: appTheme.fontSizes.small,
    fontFamily: appTheme.fontFamilies.regular,
    color: appTheme.colors.secondaryText,
    marginBottom: 5,
  },
  date: {
    fontSize: appTheme.fontSizes.small,
    fontFamily: appTheme.fontFamilies.regular,
    color: appTheme.colors.secondaryText,
    marginBottom: 5,
  },
  status: {
    fontSize: appTheme.fontSizes.small,
    fontFamily: appTheme.fontFamilies.regular,
    color: appTheme.colors.accent,
    marginBottom: 10,
  },
  itemsHeader: {
    fontSize: appTheme.fontSizes.medium,
    fontFamily: appTheme.fontFamilies.bold,
    color: appTheme.colors.primaryText,
    marginBottom: 5,
  },
  orderItem: {
    marginLeft: 10,
    marginBottom: 5,
  },
  itemText: {
    fontSize: appTheme.fontSizes.small,
    fontFamily: appTheme.fontFamilies.regular,
    color: appTheme.colors.secondaryText,
  },
  total: {
    fontSize: appTheme.fontSizes.medium,
    fontFamily: appTheme.fontFamilies.bold,
    color: appTheme.colors.success,
    marginTop: 10,
    textAlign: 'right',
  },
});

export default OrderDetailsScreen;
