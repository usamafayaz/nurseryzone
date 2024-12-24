import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {appTheme} from '../../../config/constants';
import {API_BASE_URL} from '../../../utils/apiConfig';
import LogoutModal from '../../../components/LogoutModal';

const DeliveryManDashboard = ({navigation}) => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusOptions] = useState(['Choose Status', 'Delivered', 'Cancelled']);
  const [userData, setUserData] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    loadUserData();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userData');
    navigation.navigate('Login');
    setShowLogoutModal(false);
  };
  const loadUserData = async () => {
    const data = await AsyncStorage.getItem('userData');
    const parsed = JSON.parse(data);
    setUserData(parsed);
    fetchDeliveries(parsed.user_id);
  };

  const fetchDeliveries = async userId => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/delivery/schedule?user_id=${userId}`,
      );
      const result = await response.json();
      setDeliveries(result.reverse());
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    if (newStatus !== 'Choose Status') {
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
          fetchDeliveries(userData.user_id);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const renderDeliveryCard = ({item}) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.orderId}>Ord#{item.order_id}</Text>
          <View style={styles.dateContainer}>
            <Icon
              name="event"
              size={14}
              color={appTheme.colors.secondaryText}
            />
            <Text style={styles.dateText}>
              {new Date(item.schedule_date).toLocaleDateString()}
            </Text>
          </View>
        </View>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Icon name="person" size={16} color={appTheme.colors.secondaryText} />
        <Text style={styles.infoText}>{item.name}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Icon name="phone" size={16} color={appTheme.colors.secondaryText} />
        <Text style={styles.infoText}>{item.contact_number}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Icon name="home" size={16} color={appTheme.colors.secondaryText} />
        <Text style={styles.infoText}>{item.address}</Text>
      </View>

      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Change Status</Text>
        <Picker
          selectedValue={item.status}
          style={styles.picker}
          onValueChange={value => updateOrderStatus(item.order_id, value)}>
          {statusOptions.map(status => (
            <Picker.Item key={status} label={status} value={status} />
          ))}
        </Picker>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={appTheme.colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Icon name="local-shipping" size={32} color="white" />
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>Welcome, {userData?.name}</Text>
            <Text style={styles.headerSubtitle}>
              View and manage deliveries
            </Text>
          </View>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => {
              setShowLogoutModal(true);
            }}>
            <Icon name="logout" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {deliveries.length > 0 ? (
        <FlatList
          data={deliveries}
          renderItem={renderDeliveryCard}
          keyExtractor={item => item.order_id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Icon
            name="local-shipping"
            size={48}
            color={appTheme.colors.secondaryText}
          />
          <Text style={styles.emptyTitle}>No Deliveries assigned to you</Text>
          <Text style={styles.emptySubtitle}>
            New Deliveries will appear here when admin assign you!
          </Text>
        </View>
      )}
      <LogoutModal
        visible={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onLogout={handleLogout}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appTheme.colors.primaryBackground,
  },
  header: {
    backgroundColor: appTheme.colors.primary,
    padding: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    marginLeft: 16,
    flex: 1,
  },
  headerTitle: {
    color: 'white',
    fontSize: appTheme.fontSizes.large,
    fontFamily: appTheme.fontFamilies.bold,
  },
  headerSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: appTheme.fontSizes.small,
  },
  logoutButton: {
    padding: 8,
  },
  listContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
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
    marginTop: 4,
  },
  dateText: {
    marginLeft: 4,
    fontSize: appTheme.fontSizes.small,
    color: appTheme.colors.secondaryText,
  },
  statusBadge: {
    backgroundColor: appTheme.colors.secondaryBackground,
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: appTheme.colors.primary,
    fontSize: appTheme.fontSizes.small,
    fontFamily: appTheme.fontFamilies.bold,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: appTheme.colors.secondaryBackground,
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  infoText: {
    marginLeft: 8,
    fontSize: appTheme.fontSizes.small,
    color: appTheme.colors.primaryText,
  },
  pickerContainer: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: appTheme.colors.border,
    paddingTop: 16,
  },
  pickerLabel: {
    fontSize: appTheme.fontSizes.small,
    fontFamily: appTheme.fontFamilies.bold,
    color: appTheme.colors.primaryText,
    marginBottom: 8,
  },
  picker: {
    backgroundColor: appTheme.colors.secondaryBackground,
    color: appTheme.colors.primaryText,
    borderRadius: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyTitle: {
    fontSize: appTheme.fontSizes.large,
    fontFamily: appTheme.fontFamilies.bold,
    color: appTheme.colors.primaryText,
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: appTheme.fontSizes.medium,
    color: appTheme.colors.secondaryText,
    textAlign: 'center',
    marginTop: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DeliveryManDashboard;
