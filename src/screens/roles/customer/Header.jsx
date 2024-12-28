import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {appTheme} from '../../../config/constants';
import {useSelector} from 'react-redux';

const CustomerHeader = ({title = 'Plant Store', onLogout}) => {
  const navigation = useNavigation();

  const cart = useSelector(state => state.cart.items);
  cartItemCount = cart.length;
  const handleCartPress = () => {
    navigation.navigate('CartScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.rightContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={handleCartPress}>
          <Icon
            name="shopping-cart"
            size={24}
            color={appTheme.colors.primaryBackground}
          />
          {cartItemCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {cartItemCount > 99 ? '99+' : cartItemCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => {
            navigation.navigate('Chat Bot');
          }}>
          <MaterialCommunityIcons
            name="robot"
            size={24}
            color={appTheme.colors.primaryBackground}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={onLogout}>
          <Icon
            name="logout"
            size={24}
            color={appTheme.colors.primaryBackground}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: appTheme.colors.primary,
    paddingHorizontal: 16,
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: appTheme.colors.border,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  title: {
    fontSize: appTheme.fontSizes.large,
    fontFamily: appTheme.fontFamilies.bold,
    color: appTheme.colors.primaryBackground,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconButton: {
    padding: 4,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: 0,
    backgroundColor: appTheme.colors.error,
    borderRadius: 12,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: appTheme.fontSizes.small,
    fontFamily: appTheme.fontFamilies.bold,
  },
});

export default CustomerHeader;
