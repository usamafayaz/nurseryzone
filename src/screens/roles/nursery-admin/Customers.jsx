// src/screens/CustomersScreen.js
import React from 'react';
import {View, FlatList, Text, StyleSheet} from 'react-native';
import {DUMMY_CUSTOMERS} from '../../../utils/dummyData';
import {appTheme} from '../../../config/constants';
import Card from '../../../components/Card';

const CustomersScreen = () => {
  const renderCustomer = ({item}) => (
    <Card style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.detail}>Email: {item.email}</Text>
      <Text style={styles.detail}>Phone: {item.phone}</Text>
      <Text style={styles.detail}>Join Date: {item.joinDate}</Text>
      <Text style={styles.detail}>Total Orders: {item.orderCount}</Text>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={DUMMY_CUSTOMERS}
        keyExtractor={item => item.id}
        renderItem={renderCustomer}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appTheme.colors.primaryBackground,
  },
  listContent: {
    paddingVertical: 10,
  },
  card: {
    marginHorizontal: 16,
    backgroundColor: appTheme.colors.secondaryBackground,
  },
  name: {
    fontSize: appTheme.fontSizes.medium,
    fontFamily: appTheme.fontFamilies.bold,
    color: appTheme.colors.primaryText,
    marginBottom: 8,
  },
  detail: {
    fontSize: appTheme.fontSizes.small,
    fontFamily: appTheme.fontFamilies.regular,
    color: appTheme.colors.secondaryText,
    marginBottom: 5,
  },
});

export default CustomersScreen;
