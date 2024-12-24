import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
  ToastAndroid,
  FlatList,
} from 'react-native';
import {appTheme} from '../../../config/constants';
import {API_BASE_URL} from '../../../utils/apiConfig';

const RegisteredNurseries = () => {
  const [registeredNurseries, setRegisteredNurseries] = useState([]);
  const [selectedNursery, setSelectedNursery] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNurseries();
  }, []);

  const getNurseries = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/nursery/request?pending_request=false&skip=0&limit=20`,
      );
      if (response.ok) {
        const data = await response.json();
        setRegisteredNurseries(data);
      } else {
        throw new Error('Failed to fetch nurseries');
      }
    } catch (error) {
      ToastAndroid.show(
        error.message || 'Failed to fetch nurseries',
        ToastAndroid.SHORT,
      );
    } finally {
      setLoading(false);
    }
  };

  const NurseryCard = ({nursery}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => setSelectedNursery(nursery)}
      activeOpacity={0.7}>
      <View style={styles.cardHeader}>
        <Text style={styles.nurseryName}>{nursery.name}</Text>
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.label}>Address</Text>
        <Text style={styles.value}>{nursery.address}</Text>

        <Text style={styles.label}>Contact</Text>
        <Text style={styles.value}>{nursery.contact_number}</Text>
      </View>
    </TouchableOpacity>
  );

  const NurseryDetailsModal = () => (
    <Modal
      visible={!!selectedNursery}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setSelectedNursery(null)}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Nursery Details</Text>
            <TouchableOpacity
              onPress={() => setSelectedNursery(null)}
              style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          {selectedNursery && (
            <ScrollView style={styles.modalBody} bounces={false}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Nursery Name</Text>
                <Text style={styles.detailValue}>{selectedNursery.name}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Contact Number</Text>
                <Text style={styles.detailValue}>
                  {selectedNursery.contact_number}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Email</Text>
                <Text style={styles.detailValue}>{selectedNursery.email}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Address</Text>
                <Text style={styles.detailValue}>
                  {selectedNursery.address}
                </Text>
              </View>
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Registered Nurseries</Text>
        <Text style={styles.headerSubtitle}>
          Manage and view all registered nurseries
        </Text>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={appTheme.colors.primary} />
        </View>
      ) : registeredNurseries.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No nurseries registered</Text>
        </View>
      ) : (
        <View style={styles.content} showsVerticalScrollIndicator={false}>
          <FlatList
            data={registeredNurseries}
            renderItem={({item}) => <NurseryCard nursery={item} />}
          />
        </View>
      )}

      <NurseryDetailsModal />
    </SafeAreaView>
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
    paddingTop: 20,
  },
  headerTitle: {
    color: 'white',
    fontSize: appTheme.fontSizes.large,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: appTheme.fontSizes.small,
    marginTop: 4,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: appTheme.colors.border,
  },
  nurseryName: {
    fontSize: appTheme.fontSizes.medium,
    fontWeight: 'bold',
    color: appTheme.colors.primaryText,
  },
  cardContent: {
    padding: 16,
  },
  label: {
    fontSize: appTheme.fontSizes.small,
    color: appTheme.colors.secondaryText,
    marginBottom: 4,
  },
  value: {
    fontSize: appTheme.fontSizes.medium,
    color: appTheme.colors.primaryText,
    marginBottom: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: appTheme.screen.height * 0.8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: appTheme.colors.border,
  },
  modalTitle: {
    fontSize: appTheme.fontSizes.large,
    fontWeight: 'bold',
    color: appTheme.colors.primaryText,
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: appTheme.fontSizes.large,
    color: appTheme.colors.secondaryText,
  },
  modalBody: {
    padding: 16,
  },
  detailRow: {
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: appTheme.fontSizes.small,
    color: appTheme.colors.secondaryText,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: appTheme.fontSizes.medium,
    color: appTheme.colors.primaryText,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: appTheme.fontSizes.medium,
    color: appTheme.colors.secondaryText,
  },
});

export default RegisteredNurseries;
