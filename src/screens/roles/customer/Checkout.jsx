import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {useStripe} from '@stripe/stripe-react-native';
import {appTheme} from '../../../config/constants';
import {removeItem} from '../../../redux/cartSlice';
import customerSideApi from '../../../services/customerSideApi';
import paymentApi from '../../../services/paymentApi';

const CheckoutScreen = ({navigation}) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paymentSheetReady, setPaymentSheetReady] = useState(false);
  const cartItems = useSelector(state => state.cart.items);
  const [paymentMethod, setPaymentMethod] = useState('COD');

  const dispatch = useDispatch();

  // Initialize Stripe hooks
  const {initPaymentSheet, presentPaymentSheet} = useStripe();

  useEffect(() => {
    if (paymentMethod === 'CARD' && cartItems.length > 0) {
      initializePaymentSheet();
    }
  }, [paymentMethod]);

  useEffect(() => {
    loadUserData();
    if (cartItems.length > 0) {
      initializePaymentSheet();
    }
  }, []);

  const loadUserData = async () => {
    try {
      const data = await AsyncStorage.getItem('userData');
      setUserData(JSON.parse(data));
    } catch (error) {}
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  const fetchPaymentSheetParams = async () => {
    try {
      return await paymentApi.createPaymentIntent(getTotalPrice());
    } catch (error) {
      throw new Error('Failed to fetch payment details: ' + error.message);
    }
  };

  // Initialize the Payment Sheet
  const initializePaymentSheet = async () => {
    setLoading(true);
    try {
      const {clientSecret, publishableKey} = await fetchPaymentSheetParams();

      const {error} = await initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: 'Nurser Zone',
        customFlow: true, // Enable custom flow to show only card fields
        style: 'automatic',
        appearance: {
          colors: {
            primary: appTheme.colors.primary,
          },
        },
        defaultValues: {
          billingDetails: {
            name: userData?.name, // Only include name if you want it pre-filled
          },
        },
        // Specify which fields to collect
        paymentMethodTypes: ['card'],
        billingDetailsCollectionConfiguration: {
          name: 'never',
          phone: 'never',
          email: 'never',
          address: 'never',
        },
      });

      if (error) {
        ToastAndroid.show(`Error ${error.message}`, ToastAndroid.SHORT);
      } else {
        setPaymentSheetReady(true);
      }
    } catch (error) {
      ToastAndroid.show(`Error ${error.message}`, ToastAndroid.SHORT);
      // If there's an error, switch back to COD
      setPaymentMethod('COD');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitOrder = async () => {
    setLoading(true);
    try {
      // If payment method is card, handle Stripe payment first
      if (paymentMethod === 'CARD') {
        const {error} = await presentPaymentSheet();
        if (error) {
          ToastAndroid.show(`Error ${error.message}`, ToastAndroid.SHORT);
          return;
        }
      }

      // Proceed with order submission
      const orderData = JSON.stringify({
        user_id: userData.user_id,
        plant_id: cartItems[0].plant_id,
        quantity: cartItems[0].quantity,
      });

      const response = await customerSideApi.placeCustomerOrder(orderData);
      if (response === true) {
        dispatch(removeItem(cartItems[0].plant_id));
        navigation.replace('OrderSuccess');
      }
    } catch (error) {
      ToastAndroid.show(
        error.message || 'An error occurred',
        ToastAndroid.SHORT,
      );
    } finally {
      setLoading(false);
    }
  };

  const PaymentMethodSelection = () => (
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
        <Text style={styles.paymentOptionText}>Cash on Delivery (COD)</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.paymentOption}
        onPress={() => setPaymentMethod('CARD')}>
        <Icon
          name={
            paymentMethod === 'CARD'
              ? 'radio-button-checked'
              : 'radio-button-unchecked'
          }
          size={24}
          color={appTheme.colors.primary}
        />
        <Text style={styles.paymentOptionText}>Pay with Card</Text>
      </TouchableOpacity>
    </View>
  );

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

      {/* Personal Information Section */}
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

      <PaymentMethodSelection />

      {/* Order Summary Section */}
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
              source={{uri: customerSideApi.getImageUrl(item.image_url)}}
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

      <TouchableOpacity
        style={[
          styles.submitButton,
          (loading || (paymentMethod === 'CARD' && !paymentSheetReady)) &&
            styles.disabledButton,
        ]}
        onPress={handleSubmitOrder}
        disabled={loading || (paymentMethod === 'CARD' && !paymentSheetReady)}>
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <>
            <Text style={styles.submitButtonText}>
              {paymentMethod === 'COD' ? 'Place Order' : 'Pay Now'}
            </Text>
            <Icon name="chevron-right" size={24} color="white" />
          </>
        )}
      </TouchableOpacity>
      <View style={{backgroundColor: 'white', height: 30}} />
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
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginVertical: 4,
  },
  paymentOptionText: {
    marginLeft: 12,
    fontSize: appTheme.fontSizes.medium,
    color: appTheme.colors.primaryText,
    fontFamily: appTheme.fontFamilies.medium,
  },
});

export default CheckoutScreen;
