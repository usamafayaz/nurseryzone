import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  ToastAndroid,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {appTheme} from '../../../config/constants';
import customerSideApi from '../../../services/customerSideApi';

const {colors, fontSizes, fontFamilies} = appTheme;

const TrackOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [comment, setComment] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState({});
  const navigation = useNavigation();
  const {submitCustomerFeedback, fetchMyOrders} = customerSideApi;
  const statusStyles = {
    Pending: {bg: colors.warning + '20', text: colors.warning},
    Processing: {bg: colors.primary + '20', text: colors.primary},
    Shipped: {bg: colors.secondary + '20', text: colors.secondary},
    Delivered: {bg: colors.success + '20', text: colors.success},
    Cancelled: {bg: colors.error + '20', text: colors.error},
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) throw new Error('User data not found');
      const {user_id} = JSON.parse(userData);
      const data = await fetchMyOrders(user_id);
      setOrders(data.reverse());
    } catch (err) {
      ToastAndroid.show(err.message, ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  const handleFeedbackSubmit = async () => {
    try {
      const data = JSON.stringify({
        order_id: selectedOrder.order_id,
        comment: comment,
      });
      const response = await submitCustomerFeedback(data);
      if (response == true) {
        ToastAndroid.show(
          'Feedback Successfully Submitted!',
          ToastAndroid.SHORT,
        );
        setFeedbackSubmitted(prev => ({
          ...prev,
          [selectedOrder.order_id]: true,
        }));

        setShowModal(false);
        setComment('');
      }
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
  };

  const renderOrder = ({item: order}) => (
    <View key={order.order_id} style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <View>
          <Text style={styles.orderNumber}>
            Order #{`ORD-${String(order.order_id).padStart(4, '0')}`}
          </Text>
          <View style={styles.dateContainer}>
            <Icon name="calendar" size={14} color={colors.secondaryText} />
            <Text style={styles.dateText}>
              {new Date(order.Created_at).toLocaleDateString()}
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.statusBadge,
            {backgroundColor: statusStyles[order.Status].bg},
          ]}>
          <Text
            style={[
              styles.statusText,
              {color: statusStyles[order.Status].text},
            ]}>
            {order.Status}
          </Text>
        </View>
      </View>

      <View style={styles.customerInfo}>
        <Icon name="account" size={16} color={colors.placeholderText} />
        <Text style={styles.customerText}>Customer</Text>
      </View>

      <View style={styles.productInfo}>
        <View>
          <Text style={styles.productName}>{order['Plant name']}</Text>
          <Text style={styles.quantity}>Quantity: {order.qunatity}</Text>
        </View>
        <Text style={styles.amount}>
          Rs{order['Total Amount'].toLocaleString()}
        </Text>
      </View>

      {order.Status === 'Delivered' && !feedbackSubmitted[order.order_id] && (
        <TouchableOpacity
          style={styles.feedbackButton}
          onPress={() => {
            setSelectedOrder(order);
            setShowModal(true);
          }}>
          <Text style={styles.feedbackButtonText}>Write Feedback</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Icon name="package-variant" size={48} color={colors.placeholderText} />
      <Text style={styles.emptyTitle}>You haven't placed any orders yet</Text>
      <Text style={styles.emptySubtitle}>
        Browse plants to make your first purchase!
      </Text>
      <TouchableOpacity
        style={styles.browseButton}
        onPress={() => navigation.navigate('CustomerDashboard')}>
        <Text style={styles.browseButtonText}>Browse Plants</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator
          size="large"
          color={colors.primary}
          style={{flex: 1}}
        />
      ) : (
        <>
          <View style={styles.header}>
            <Icon
              name="arrow-left"
              size={28}
              color={colors.primary}
              onPress={() => {
                navigation.goBack();
              }}
            />
            <Text style={styles.headerText}>Track Orders</Text>
          </View>

          <FlatList
            data={orders}
            renderItem={renderOrder}
            keyExtractor={item => item.order_id.toString()}
            ListEmptyComponent={renderEmptyComponent}
            contentContainerStyle={styles.orderGrid}
          />

          <Modal visible={showModal} transparent animationType="fade">
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <View style={styles.modalTitle}>
                    <Icon
                      name="message-text"
                      size={24}
                      color={colors.primary}
                    />
                    <Text style={styles.modalTitleText}>Order Feedback</Text>
                  </View>
                  <TouchableOpacity onPress={() => setShowModal(false)}>
                    <Icon name="close" size={24} color={colors.secondaryText} />
                  </TouchableOpacity>
                </View>

                <Text style={styles.modalSubtitle}>
                  Provide feedback for Order #
                  {selectedOrder &&
                    `ORD-${String(selectedOrder.order_id).padStart(4, '0')}`}
                </Text>

                <TextInput
                  style={styles.feedbackInput}
                  placeholder="Share your experience..."
                  placeholderTextColor={colors.secondaryText}
                  multiline
                  numberOfLines={4}
                  value={comment}
                  onChangeText={setComment}
                />

                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => setShowModal(false)}>
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handleFeedbackSubmit}>
                    <Icon
                      name="send"
                      size={16}
                      color={colors.primaryBackground}
                    />
                    <Text style={styles.submitButtonText}>Submit Feedback</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondaryBackground,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  headerText: {
    fontSize: fontSizes.xlarge,
    fontFamily: fontFamilies.bold,
    fontWeight: 'bold',
    marginLeft: 16,
    color: colors.primaryText,
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 48,
  },
  emptyTitle: {
    fontSize: fontSizes.large,
    fontFamily: fontFamilies.bold,
    color: colors.primaryText,
    marginTop: 16,
  },
  emptySubtitle: {
    color: colors.secondaryText,
    marginTop: 8,
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.medium,
  },
  browseButton: {
    marginTop: 16,
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  browseButtonText: {
    color: colors.primaryBackground,
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.small,
  },
  orderGrid: {
    padding: 16,
  },
  orderCard: {
    backgroundColor: colors.primaryBackground,
    borderRadius: 12,
    padding: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  orderNumber: {
    fontSize: fontSizes.medium,
    fontFamily: fontFamilies.bold,
    color: colors.primaryText,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  dateText: {
    fontSize: fontSizes.small,
    color: colors.secondaryText,
    marginLeft: 8,
    fontFamily: fontFamilies.regular,
  },
  statusBadge: {
    height: 30,
    width: 80,
    paddingVertical: 2,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: {
    fontWeight: 'bold',
    fontSize: fontSizes.small,
    fontFamily: fontFamilies.bold,
  },
  customerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondaryBackground,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  customerText: {
    marginLeft: 8,
    fontSize: fontSizes.small,
    fontFamily: fontFamilies.bold,
    color: colors.primaryText,
  },
  productInfo: {
    backgroundColor: colors.secondaryBackground,
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productName: {
    fontSize: fontSizes.small,
    fontFamily: fontFamilies.bold,
    color: colors.primaryText,
  },
  quantity: {
    fontSize: fontSizes.small,
    color: colors.secondaryText,
    fontFamily: fontFamilies.regular,
  },
  amount: {
    fontSize: fontSizes.small,
    fontFamily: fontFamilies.bold,
    color: colors.primaryText,
  },
  feedbackButton: {
    marginTop: 16,
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  feedbackButtonText: {
    color: colors.primaryBackground,
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.small,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    padding: 16,
  },
  modalContent: {
    backgroundColor: colors.primaryBackground,
    borderRadius: 16,
    padding: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalTitleText: {
    fontSize: fontSizes.large,
    fontFamily: fontFamilies.bold,
    color: colors.primaryText,
    marginLeft: 8,
  },
  modalSubtitle: {
    fontSize: fontSizes.small,
    color: colors.secondaryText,
    marginBottom: 16,
    fontFamily: fontFamilies.regular,
  },
  feedbackInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 16,
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.small,
    color: colors.primaryText,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cancelButton: {
    backgroundColor: colors.secondaryBackground,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
  },
  cancelButtonText: {
    color: colors.primaryText,
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.small,
  },
  submitButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  submitButtonText: {
    color: colors.primaryBackground,
    marginLeft: 8,
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.small,
  },
});

export default TrackOrders;
