import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {appTheme} from '../config/constants';
import {API_BASE_URL} from '../utils/apiConfig';

const ProductCard = ({plant}) => {
  const navigation = useNavigation();

  const handleViewDetails = () => {
    navigation.navigate('Product Detail', {plant});
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={handleViewDetails}
      activeOpacity={0.9}>
      <Image
        source={{uri: `${API_BASE_URL}${plant.image_url}`}}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={1}>
            {plant.name}
          </Text>
          <Text style={styles.price}>
            Rs. {parseFloat(plant.price).toFixed(2)}
          </Text>
        </View>
        <Text style={styles.description} numberOfLines={2}>
          {plant.description}
        </Text>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.detailsButton}
            onPress={handleViewDetails}>
            <Text style={styles.detailsText}>View Details</Text>
            <Icon
              name="chevron-right"
              size={16}
              color={appTheme.colors.primary}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 140,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  content: {
    padding: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  title: {
    flex: 1,
    fontSize: appTheme.fontSizes.medium,
    fontFamily: appTheme.fontFamilies.bold,
    color: appTheme.colors.primaryText,
  },
  price: {
    fontSize: appTheme.fontSizes.medium,
    fontFamily: appTheme.fontFamilies.bold,
    color: appTheme.colors.primary,
  },
  description: {
    fontSize: appTheme.fontSizes.small,
    color: appTheme.colors.secondaryText,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailsText: {
    color: appTheme.colors.primary,
    marginRight: 4,
  },
  cartButton: {
    backgroundColor: appTheme.colors.secondaryBackground,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  cartButtonText: {
    color: appTheme.colors.primary,
  },
  disabledButton: {
    opacity: 0.5,
  },
});

export default ProductCard;
