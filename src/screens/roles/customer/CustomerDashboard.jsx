// Dashboard.js
import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Image,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {appTheme} from '../../../config/constants';
import API_BASE_URL from '../../../utils/apiConfig';
import {useNavigation} from '@react-navigation/native';
import ProductCard from '../../../components/ProductCard';
import CustomerHeader from './Header';
import LogoutModal from '../../../components/LogoutModal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomerDashboard = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [logoutModal, setLogoutModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await AsyncStorage.getItem('userData');
      setUserData(JSON.parse(data));
      fetchPlants();
    };
    fetchData();
  }, []);

  const navigation = useNavigation();
  const fetchPlants = async () => {
    data = await AsyncStorage.getItem('userData');
    data = JSON.parse(data);

    // data = data.json();
    console.log(data);
    try {
      const response = await fetch(
        `${API_BASE_URL}/nursery/plants?skip=0&limit=20`,
      );
      const data = await response.json();
      setPlants(data.reverse());
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPlants = plants.filter(plant =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const handleShowLogoutModal = () => {
    setLogoutModal(true);
  };

  const handleLogout = () => {
    navigation.navigate('Login');
    setLogoutModal(false);
  };
  if (!userData) {
    return null; // Wait for userData to load
  }
  return (
    <View style={styles.container}>
      <CustomerHeader
        cartItemCount={0}
        onLogout={handleShowLogoutModal}
        title={`Welcome, ${userData.name}`}
      />
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Icon
            name="search"
            size={20}
            color={appTheme.colors.secondaryText}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholderTextColor={appTheme.colors.iconInactive}
            placeholder="Search plants by name..."
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Icon name="filter-list" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color={appTheme.colors.primary}
          style={styles.loader}
        />
      ) : (
        <FlatList
          data={filteredPlants}
          renderItem={({item}) => <ProductCard plant={item} />}
          keyExtractor={item => item.plant_id.toString()}
          numColumns={2}
          contentContainerStyle={styles.productGrid}
        />
      )}
      <LogoutModal
        visible={logoutModal}
        onLogout={handleLogout}
        onClose={() => setLogoutModal(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  // Dashboard styles
  container: {
    flex: 1,
    backgroundColor: appTheme.colors.secondaryBackground,
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: appTheme.colors.border,
  },
  searchInput: {
    flex: 1,
    padding: 12,
    fontSize: appTheme.fontSizes.medium,
    color: appTheme.colors.primaryText,
  },
  searchIcon: {
    paddingLeft: 12,
  },
  filterButton: {
    backgroundColor: appTheme.colors.primary,
    padding: 12,
    borderRadius: 12,
    justifyContent: 'center',
  },
  productGrid: {
    padding: 8,
  },
  loader: {
    flex: 1,
  },
});

export default CustomerDashboard;
