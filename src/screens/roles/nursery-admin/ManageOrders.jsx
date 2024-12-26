import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  ToastAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Feather';
import {Picker} from '@react-native-picker/picker';
import {appTheme} from '../../../config/constants';
import {API_BASE_URL} from '../../../utils/apiConfig';
import {useNavigation} from '@react-navigation/native';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [deliveryBoys, setDeliveryBoys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const statusOptions = ['Pending', 'Processing', 'Shipped'];
  const navigation = useNavigation();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      const nursery = JSON.parse(userData);
      await Promise.all([
        fetchOrders(nursery.user_id),
        fetchDeliveryBoys(nursery.user_id),
      ]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async nurseryId => {
    const response = await fetch(
      `${API_BASE_URL}/order?nursery_id=${nurseryId}&skip=0&limit=20`,
    );
    if (response.ok) {
      const data = await response.json();
      setOrders(data.reverse());
    }
  };

  const fetchDeliveryBoys = async nurseryId => {
    const response = await fetch(
      `${API_BASE_URL}/delivery/boy?nursery_id=${nurseryId}`,
    );
    const result = await response.json();
    if (response.ok) {
      setDeliveryBoys([
        {delivery_boy_id: 90, name: 'Select Delivery Boy', user_id: 90},
        ...result,
      ]);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/order/status?order_id=${orderId}&status=${newStatus}`,
        {method: 'PUT'},
      );
      if (response.ok) {
        ToastAndroid.show(
          'Order status updated successfully!',
          ToastAndroid.SHORT,
        );
        setOrders(
          orders.map(order =>
            order.order_id === orderId ? {...order, Status: newStatus} : order,
          ),
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const scheduleDelivery = async (orderId, deliveryBoyID) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/delivery/schedule?delivery_boy_id=${deliveryBoyID}&order_id=${orderId}`,
        {method: 'POST'},
      );
      response.ok &&
        ToastAndroid.show(
          'Order Assigned to Delivery Boy!',
          ToastAndroid.SHORT,
        );

      if (!response.ok) {
        throw new Error('Failed to schedule delivery');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusStyle = status => {
    const styles = {
      Pending: {
        backgroundColor: appTheme.colors.warning + '20',
        color: appTheme.colors.warning,
      },
      Processing: {
        backgroundColor: appTheme.colors.secondary + '20',
        color: appTheme.colors.secondary,
      },
      Shipped: {
        backgroundColor: appTheme.colors.primary + '20',
        color: appTheme.colors.primary,
      },
    };
    return (
      styles[status] || {
        backgroundColor: appTheme.colors.border,
        color: appTheme.colors.secondaryText,
      }
    );
  };

  const renderOrderCard = ({item: order}) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.orderId}>Ord#{order.order_id}</Text>
          <View style={styles.dateContainer}>
            <Icon
              name="calendar"
              size={14}
              color={appTheme.colors.secondaryText}
            />
            <Text style={styles.date}>
              {new Date(order.Created_at).toLocaleDateString()}
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.statusBadge,
            {backgroundColor: getStatusStyle(order.Status).backgroundColor},
          ]}>
          <Text
            style={[
              styles.statusText,
              {color: getStatusStyle(order.Status).color},
            ]}>
            {order.Status}
          </Text>
        </View>
      </View>

      <View style={styles.customerSection}>
        <Icon name="user" size={16} color={appTheme.colors.secondaryText} />
        <Text style={styles.sectionTitle}>Customer</Text>
      </View>

      <View style={styles.productSection}>
        <View>
          <Text style={styles.productName}>{order['Plant name']}</Text>
          <Text style={styles.quantity}>Quantity: {order.qunatity}</Text>
        </View>
        <Text style={styles.amount}>Rs. {order['Total Amount']}</Text>
      </View>

      {order.Status !== 'Cancelled' && (
        <View style={styles.actionSection}>
          <Text style={styles.actionTitle}>Change Status</Text>
          <Picker
            selectedValue={order.Status}
            style={styles.picker}
            onValueChange={value => updateOrderStatus(order.order_id, value)}>
            {statusOptions.map(status => (
              <Picker.Item key={status} label={status} value={status} />
            ))}
          </Picker>
        </View>
      )}

      {order.Status === 'Shipped' && (
        <View style={styles.actionSection}>
          <Text style={styles.actionTitle}>Assign Delivery</Text>
          <Picker
            style={styles.picker}
            onValueChange={value => scheduleDelivery(order.order_id, value)}>
            {deliveryBoys.map(boy => (
              <Picker.Item
                key={boy.delivery_boy_id}
                label={boy.name}
                value={boy.delivery_boy_id}
              />
            ))}
          </Picker>
        </View>
      )}

      <View style={styles.totalSection}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalAmount}>Rs. {order['Total Amount']}</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={appTheme.colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Icon name="alert-circle" size={48} color={appTheme.colors.error} />
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Icon
          name="arrow-left"
          size={24}
          color={appTheme.colors.primaryBackground}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <View>
          <Text style={styles.headerTitle}>Manage Customer Orders</Text>
          <Text style={styles.headerSubtitle}>
            View and manage customer orders
          </Text>
        </View>
      </View>

      <FlatList
        data={orders}
        renderItem={renderOrderCard}
        keyExtractor={item => item.order_id.toString()}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon
              name="package"
              size={48}
              color={appTheme.colors.secondaryText}
            />
            <Text style={styles.emptyTitle}>No orders available</Text>
            <Text style={styles.emptySubtitle}>
              New orders will appear here when customers make purchases
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appTheme.colors.secondaryBackground,
  },
  header: {
    backgroundColor: appTheme.colors.primary,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    color: appTheme.colors.primaryBackground,
    fontSize: appTheme.fontSizes.large,
    fontFamily: appTheme.fontFamilies.bold,
  },
  headerSubtitle: {
    color: appTheme.colors.primaryBackground + '90',
    fontSize: appTheme.fontSizes.small,
  },
  listContainer: {
    padding: 16,
    gap: 16,
  },
  card: {
    backgroundColor: appTheme.colors.primaryBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  orderId: {
    fontSize: appTheme.fontSizes.medium,
    fontFamily: appTheme.fontFamilies.bold,
    color: appTheme.colors.primaryText,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  date: {
    fontSize: appTheme.fontSizes.small,
    color: appTheme.colors.secondaryText,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: appTheme.fontSizes.small,
    fontFamily: appTheme.fontFamilies.bold,
  },
  customerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    backgroundColor: appTheme.colors.secondaryBackground,
    borderRadius: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: appTheme.fontSizes.medium,
    color: appTheme.colors.primaryText,
    fontFamily: appTheme.fontFamilies.bold,
  },
  productSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: appTheme.colors.secondaryBackground,
    borderRadius: 8,
  },
  productName: {
    fontSize: appTheme.fontSizes.medium,
    color: appTheme.colors.primaryText,
    fontFamily: appTheme.fontFamilies.bold,
  },
  quantity: {
    fontSize: appTheme.fontSizes.small,
    color: appTheme.colors.secondaryText,
    marginTop: 4,
  },
  amount: {
    fontSize: appTheme.fontSizes.medium,
    color: appTheme.colors.primaryText,
    fontFamily: appTheme.fontFamilies.bold,
  },
  actionSection: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: appTheme.colors.border,
    paddingTop: 16,
  },
  actionTitle: {
    fontSize: appTheme.fontSizes.medium,
    color: appTheme.colors.primaryText,
    fontFamily: appTheme.fontFamilies.bold,
    marginBottom: 8,
  },
  picker: {
    backgroundColor: appTheme.colors.secondaryBackground,
    borderRadius: 8,
    color: appTheme.colors.primaryText,
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: appTheme.colors.border,
  },
  totalLabel: {
    fontSize: appTheme.fontSizes.medium,
    color: appTheme.colors.primaryText,
    fontFamily: appTheme.fontFamilies.bold,
  },
  totalAmount: {
    fontSize: appTheme.fontSizes.medium,
    color: appTheme.colors.primary,
    fontFamily: appTheme.fontFamilies.bold,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: appTheme.colors.error,
    fontSize: appTheme.fontSizes.medium,
    marginTop: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 24,
  },
  emptyTitle: {
    fontSize: appTheme.fontSizes.large,
    color: appTheme.colors.primaryText,
    fontFamily: appTheme.fontFamilies.bold,
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: appTheme.fontSizes.medium,
    color: appTheme.colors.secondaryText,
    textAlign: 'center',
    marginTop: 8,
  },
});

export default ManageOrders;
