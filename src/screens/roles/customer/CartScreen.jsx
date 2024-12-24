import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {API_BASE_URL} from '../../../utils/apiConfig';
import {appTheme} from '../../../config/constants';

const CartScreen = ({navigation}) => {
  const [cart, setCart] = React.useState([]);

  const updateQuantity = (plantId, newQuantity) => {
    if (newQuantity < 1) return;

    setCart(prevCart =>
      prevCart.map(item =>
        item.plant_id === plantId ? {...item, quantity: newQuantity} : item,
      ),
    );
  };

  const removeFromCart = plantId => {
    setCart(prevCart => prevCart.filter(item => item.plant_id !== plantId));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const CartItem = ({item}) => (
    <View style={styles.cartItem}>
      <View style={styles.itemContent}>
        <Image
          source={{uri: `${API_BASE_URL}${item.image_url}`}}
          style={styles.itemImage}
        />
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>Rs. {item.price}</Text>
        </View>
      </View>

      <View style={styles.itemActions}>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={() => updateQuantity(item.plant_id, item.quantity - 1)}
            style={styles.quantityButton}
            disabled={item.quantity <= 1}>
            <Icon name="remove" size={16} color={appTheme.colors.primary} />
          </TouchableOpacity>

          <Text style={styles.quantityText}>{item.quantity}</Text>

          <TouchableOpacity
            onPress={() => updateQuantity(item.plant_id, item.quantity + 1)}
            style={styles.quantityButton}>
            <Icon name="add" size={16} color={appTheme.colors.primary} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => removeFromCart(item.plant_id)}
          style={styles.removeButton}>
          <Icon name="delete" size={20} color={appTheme.colors.error} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Icon name="chevron-left" size={24} color={appTheme.colors.primary} />
          <Text style={styles.backButtonText}>Continue Shopping</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cartContainer}>
        <View style={styles.cartHeader}>
          <Icon
            name="shopping-cart"
            size={24}
            color={appTheme.colors.primary}
          />
          <Text style={styles.cartTitle}>Your Cart</Text>
        </View>

        {cart.length === 0 ? (
          <View style={styles.emptyCart}>
            <Icon
              name="shopping-cart"
              size={48}
              color={appTheme.colors.secondary}
            />
            <Text style={styles.emptyCartText}>Your cart feels lonely</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('CustomerDashboard')}
              style={styles.shopNowButton}>
              <Text style={styles.shopNowButtonText}>Shop Now</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <ScrollView>
            {cart.map(item => (
              <CartItem key={item.plant_id} item={item} />
            ))}
          </ScrollView>
        )}
      </View>

      <View style={styles.summary}>
        <Text style={styles.summaryTitle}>Order Summary</Text>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>
            Rs. {getTotalPrice().toFixed(2)}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Shipping</Text>
          <Text style={styles.shippingText}>Free</Text>
        </View>

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>
            Rs. {getTotalPrice().toFixed(2)}
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.checkoutButton,
            cart.length === 0 && styles.disabledButton,
          ]}
          onPress={() =>
            navigation.navigate('Checkout', {
              cart,
              totalPrice: getTotalPrice(),
            })
          }
          disabled={cart.length === 0}>
          <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appTheme.colors.primaryBackground,
  },
  header: {
    padding: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    marginLeft: 8,
    color: appTheme.colors.primary,
    fontSize: appTheme.fontSizes.medium,
    fontFamily: appTheme.fontFamilies.medium,
  },
  cartContainer: {
    flex: 1,
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 16,
    padding: 16,
  },
  cartHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cartTitle: {
    fontSize: appTheme.fontSizes.xlarge,
    fontFamily: appTheme.fontFamilies.bold,
    color: appTheme.colors.primaryText,
    marginLeft: 12,
  },
  emptyCart: {
    alignItems: 'center',
    padding: 32,
    backgroundColor: appTheme.colors.secondaryBackground,
    borderRadius: 12,
  },
  emptyCartText: {
    fontSize: appTheme.fontSizes.large,
    color: appTheme.colors.secondaryText,
    marginTop: 16,
  },
  shopNowButton: {
    backgroundColor: appTheme.colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  shopNowButtonText: {
    color: 'white',
    fontSize: appTheme.fontSizes.medium,
    fontFamily: appTheme.fontFamilies.medium,
  },
  cartItem: {
    backgroundColor: appTheme.colors.secondaryBackground,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: appTheme.fontSizes.medium,
    fontFamily: appTheme.fontFamilies.bold,
    color: appTheme.colors.primaryText,
  },
  itemPrice: {
    fontSize: appTheme.fontSizes.medium,
    color: appTheme.colors.primary,
    marginTop: 4,
  },
  itemActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 4,
  },
  quantityButton: {
    padding: 8,
  },
  quantityText: {
    paddingHorizontal: 16,
    fontSize: appTheme.fontSizes.medium,
    fontFamily: appTheme.fontFamilies.medium,
  },
  removeButton: {
    padding: 8,
  },
  summary: {
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  summaryTitle: {
    fontSize: appTheme.fontSizes.large,
    fontFamily: appTheme.fontFamilies.bold,
    color: appTheme.colors.primaryText,
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    color: appTheme.colors.secondaryText,
    fontSize: appTheme.fontSizes.medium,
  },
  summaryValue: {
    fontFamily: appTheme.fontFamilies.medium,
    fontSize: appTheme.fontSizes.medium,
  },
  shippingText: {
    color: appTheme.colors.primary,
    fontFamily: appTheme.fontFamilies.medium,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: appTheme.colors.border,
    paddingTop: 16,
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: appTheme.fontSizes.large,
    fontFamily: appTheme.fontFamilies.bold,
  },
  totalValue: {
    fontSize: appTheme.fontSizes.large,
    fontFamily: appTheme.fontFamilies.bold,
    color: appTheme.colors.primary,
  },
  checkoutButton: {
    backgroundColor: appTheme.colors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: appTheme.colors.border,
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: appTheme.fontSizes.medium,
    fontFamily: appTheme.fontFamilies.bold,
  },
});

export default CartScreen;
