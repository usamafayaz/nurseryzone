import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {appTheme} from '../../../config/constants';

const AdminDashboard = () => {
  const navigation = useNavigation();

  const menuItems = [
    {
      title: 'Nursery Requests',
      description: 'Review and manage nursery registration requests',
      icon: 'group',
      screen: 'NurseryRequests',
    },
    {
      title: 'Registered Nurseries',
      description: 'View and manage all registered nurseries',
      icon: 'business',
      screen: 'RegisteredNurseries',
    },
  ];

  return (
    <ScrollView
      style={[
        styles.container,
        {backgroundColor: appTheme.colors.primaryBackground},
      ]}>
      {/* Header */}
      <View style={[styles.header, {backgroundColor: appTheme.colors.primary}]}>
        <View style={styles.headerContent}>
          <View style={styles.headerText}>
            <Text style={styles.title}>Super Admin Dashboard</Text>
            <Text style={styles.subtitle}>
              Manage and oversee nursery network
            </Text>
          </View>
        </View>
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => navigation.navigate(item.screen)}>
            <View style={styles.iconContainer}>
              <Icon
                name={item.icon}
                size={32}
                color={appTheme.colors.primary}
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDescription}>{item.description}</Text>
            </View>
            <Icon
              name="arrow-forward"
              size={24}
              color={appTheme.colors.secondaryText}
            />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    marginLeft: 16,
  },
  title: {
    fontSize: appTheme.fontSizes.xlarge,
    fontFamily: appTheme.fontFamilies.bold,
    color: appTheme.colors.primaryBackground,
  },
  subtitle: {
    fontSize: appTheme.fontSizes.medium,
    fontFamily: appTheme.fontFamilies.regular,
    color: appTheme.colors.secondaryText,
  },
  menuContainer: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: appTheme.colors.secondaryBackground,
    borderRadius: 25,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: appTheme.fontSizes.medium,
    fontFamily: appTheme.fontFamilies.bold,
    color: appTheme.colors.primaryText,
  },
  cardDescription: {
    fontSize: appTheme.fontSizes.small,
    fontFamily: appTheme.fontFamilies.regular,
    color: appTheme.colors.secondaryText,
    marginTop: 4,
  },
});

export default AdminDashboard;
