import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {API_BASE_URL} from '../../../utils/apiConfig';
import {appTheme} from '../../../config/constants';
import {removeItem} from '../../../redux/cartSlice';

const CheckoutScreen = ({navigation}) => {
  const [userData, setUserData] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const cartItems = useSelector(state => state.cart.items);

  useEffect(() => {
    loadUserData();
  }, []);
  const dispatch = useDispatch();
  const loadUserData = async () => {
    try {
      const data = await AsyncStorage.getItem('userData');
      setUserData(JSON.parse(data));
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  const handleSubmitOrder = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userData.user_id,
          plant_id: cartItems[0].plant_id,
          quantity: cartItems[0].quantity,
        }),
      });

      if (response.ok) {
        dispatch(removeItem(cartItems[0].plant_id));
        navigation.navigate('OrderSuccess');
      }
    } catch (error) {
      console.error('Order submission error:', error);
    }
  };

  if (cartItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Icon
          name="shopping-cart"
          size={48}
          color={appTheme.colors.secondary}
        />
        <Text style={styles.emptyText}>Your cart is empty</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('CustomerDashboard')}
          style={styles.shopButton}>
          <Text style={styles.shopButtonText}>Continue Shopping</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} bounces={false}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <Icon name="chevron-left" size={24} color={appTheme.colors.primary} />
        <Text style={styles.textStyle}>Back to Cart</Text>
      </TouchableOpacity>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Icon name="person" size={24} color={appTheme.colors.primary} />
          <Text style={styles.sectionTitle}>Personal Information</Text>
        </View>

        {userData && (
          <View style={styles.userInfo}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>{userData.name}</Text>

            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{userData.email}</Text>

            <Text style={styles.label}>Contact Number</Text>
            <Text style={styles.value}>{userData.contact_number}</Text>

            <Text style={styles.label}>Address</Text>
            <Text style={styles.value}>{userData.address}</Text>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Icon name="payment" size={24} color={appTheme.colors.primary} />
          <Text style={styles.sectionTitle}>Payment Method</Text>
        </View>

        <TouchableOpacity
          style={styles.paymentOption}
          onPress={() => setPaymentMethod('COD')}>
          <Icon
            name={
              paymentMethod === 'COD'
                ? 'radio-button-checked'
                : 'radio-button-unchecked'
            }
            size={24}
            color={appTheme.colors.primary}
          />
          <Text style={[styles.value, {marginBottom: 0, marginLeft: 10}]}>
            Cash on Delivery (COD)
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Icon
            name="shopping-cart"
            size={24}
            color={appTheme.colors.primary}
          />
          <Text style={styles.sectionTitle}>Order Summary</Text>
        </View>

        {cartItems.map(item => (
          <View key={item.plant_id} style={styles.orderItem}>
            <Image
              source={{uri: `${API_BASE_URL}${item.image_url}`}}
              style={styles.itemImage}
            />
            <View style={styles.itemDetails}>
              <Text style={styles.value}>{item.name}</Text>
              <Text style={styles.value}>Quantity: {item.quantity}</Text>
              <Text style={styles.value}>
                Rs. {(item.price * item.quantity).toFixed(2)}
              </Text>
            </View>
          </View>
        ))}

        <View style={styles.totalContainer}>
          <Text style={styles.value}>Total</Text>
          <Text style={styles.value}>Rs. {getTotalPrice().toFixed(2)}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmitOrder}>
        <Text style={styles.submitButtonText}>Complete Order</Text>
        <Icon name="chevron-right" size={24} color="white" />
      </TouchableOpacity>
      <View style={{backgroundColor: 'white', height: 30}}></View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appTheme.colors.primaryBackground,
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    color: appTheme.colors.primaryText,
    fontSize: appTheme.fontSizes.medium,
    fontFamily: appTheme.fontFamilies.bold,
    marginLeft: 8,
  },
  userInfo: {
    gap: 8,
  },
  textStyle: {
    marginLeft: 8,
    color: appTheme.colors.primary,
    fontSize: appTheme.fontSizes.medium,
    fontFamily: appTheme.fontFamilies.medium,
  },
  label: {
    color: appTheme.colors.secondaryText,
    fontSize: appTheme.fontSizes.small,
  },
  value: {
    color: appTheme.colors.primaryText,
    fontSize: appTheme.fontSizes.medium,
    marginBottom: 8,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  orderItem: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: appTheme.colors.border,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: appTheme.colors.border,
  },
  submitButton: {
    backgroundColor: appTheme.colors.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginVertical: 16,
    marginBottom: 16,
  },
  submitButtonText: {
    color: 'white',
    fontSize: appTheme.fontSizes.medium,
    fontFamily: appTheme.fontFamilies.bold,
    marginRight: 8,
  },
});

export default CheckoutScreen;
