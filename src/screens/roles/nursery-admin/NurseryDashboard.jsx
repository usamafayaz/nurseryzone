import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  useWindowDimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LogoutModal from '../../../components/LogoutModal';
import {appTheme} from '../../../config/constants';

const NurseryDashboard = ({navigation}) => {
  const {width} = useWindowDimensions();
  const numColumns = 2;

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    navigation.navigate('Login');
    setShowLogoutModal(false);
  };
  const menuItems = [
    {
      title: 'Add Plant',
      description: 'Add new plants to your inventory',
      screen: 'Add Plant',
    },
    {
      title: 'Manage Plants',
      description: 'Edit, delete and manage your plants inventory',
      screen: 'Manage Plants',
    },
    {
      title: 'Orders',
      description: 'Track and manage customer orders',
      screen: 'Order Details',
    },
    {
      title: 'Reviews',
      description: 'Monitor customer feedback and ratings',
      screen: 'Reviews',
    },
    {
      title: 'Add Delivery Boy',
      description: 'Add and manage delivery boy',
      screen: 'AddDeliveryBoy',
    },
    {
      title: 'Chat with Gemini',
      description: 'Get AI assistance for your queries',
      screen: 'Chat Bot',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <Icon name="local-florist" size={24} color="white" />
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerTitle}>Nursery Zone Dashboard</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => setShowLogoutModal(true)}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
            style={styles.logoutButton}>
            <View style={styles.logoutButtonInner}>
              <Icon name="logout" size={22} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView bounces={false}>
        <View style={styles.mainContent}>
          <View
            style={[
              styles.cardsContainer,
              {
                width: width - 32,
              },
            ]}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.card,
                  {
                    width: (width - 32 - (numColumns - 1) * 16) / numColumns,
                  },
                ]}
                onPress={() => navigation.navigate(item.screen)}>
                <View style={styles.cardGreenLine} />
                <View style={styles.cardContent}>
                  <View style={styles.cardTextContainer}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.cardDescription}>
                      {item.description}
                    </Text>
                  </View>
                  <Icon
                    name="arrow-forward"
                    size={20}
                    color="#9ca3af"
                    style={styles.arrowIcon}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <LogoutModal
          visible={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
          onLogout={handleLogout}
        />
        <View style={[styles.decorativeCircle, styles.bottomLeftCircle]} />
        <View style={[styles.decorativeCircle, styles.bottomLeftCircleInner]} />
        <View style={[styles.decorativeCircle, styles.topRightCircle]} />
        <View style={[styles.decorativeCircle, styles.topRightCircleInner]} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0fdf4',
  },
  headerContainer: {
    backgroundColor: appTheme.colors.primary,
    padding: 24,
    zIndex: 1,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#bbf7d0',
    marginTop: 4,
  },
  logoutButton: {
    marginLeft: 16,
    zIndex: 2,
  },
  logoutButtonInner: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  mainContent: {
    padding: 16,
    alignItems: 'center',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  cardGreenLine: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: '#16a34a',
  },
  cardContent: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 12,
    color: '#4b5563',
  },
  arrowIcon: {
    marginLeft: 'auto',
  },
  decorativeCircle: {
    position: 'absolute',
    width: 128,
    height: 128,
    borderWidth: 4,
    borderColor: 'rgba(22, 163, 74, 0.1)',
    borderRadius: 64,
  },
  bottomLeftCircle: {
    bottom: -64,
    left: -64,
  },
  bottomLeftCircleInner: {
    bottom: -56,
    left: -56,
    width: 112,
    height: 112,
    borderRadius: 56,
  },
  topRightCircle: {
    top: -64,
    right: -64,
  },
  topRightCircleInner: {
    top: -56,
    right: -56,
    width: 112,
    height: 112,
    borderRadius: 56,
  },
});

export default NurseryDashboard;
