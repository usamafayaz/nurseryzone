import {API_BASE_URL} from '../utils/apiConfig';
import {ToastAndroid} from 'react-native';

const fetchAssignedDeliveries = async userId => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/delivery/schedule?user_id=${userId}`,
    );
    if (!response.ok) {
      throw new Error('Failed to fetch assigned deliveries');
    }
    const result = await response.json();
    return result.reverse();
  } catch (error) {
    console.error('Error fetching deliveries:', error);
    throw error;
  }
};

const updateDeliveryStatus = async (orderId, newStatus, refreshCallback) => {
  if (newStatus === 'Choose Status') return;
  try {
    const response = await fetch(
      `${API_BASE_URL}/order/status?order_id=${orderId}&status=${newStatus}`,
      {method: 'PUT'},
    );

    if (response.ok) {
      ToastAndroid.show(
        'Order Status successfully updated!',
        ToastAndroid.SHORT,
      );
      if (refreshCallback) refreshCallback();
    } else {
      throw new Error('Failed to update order status');
    }
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};

export default {fetchAssignedDeliveries, updateDeliveryStatus};
