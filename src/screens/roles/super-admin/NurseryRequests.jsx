import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {appTheme} from '../../../config/constants';
import API_BASE_URL from '../../../utils/apiConfig';

const NurseryRequests = ({navigation}) => {
  const [selectedNursery, setSelectedNursery] = useState(null);
  const [nurseryRequests, setNurseryRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNurseryRequests();
  }, []);

  const handleRequestAction = async (nurseryId, action) => {
    try {
      const is_accepted = action === 'accept';
      const response = await fetch(
        `${API_BASE_URL}/nursery/request?nursery_id=${nurseryId}&is_accepted=${is_accepted}`,
        {
          method: 'POST',
        },
      );
      const result = await response.json();

      if (response.ok) {
        setNurseryRequests(prev =>
          prev.filter(req => req.nursery_id !== nurseryId),
        );
        setSelectedNursery(null);
        ToastAndroid.show(
          `Nursery request ${
            is_accepted ? 'accepted' : 'rejected'
          } successfully`,
          ToastAndroid.SHORT,
        );
      } else {
        throw new Error(result.message || 'Something went wrong');
      }
    } catch (error) {
      ToastAndroid.show(
        error.message || 'Failed to process request',
        ToastAndroid.SHORT,
      );
    }
  };

  const getNurseryRequests = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/nursery/request?pending_request=true&skip=0&limit=20`,
      );
      if (response.ok) {
        const data = await response.json();
        setNurseryRequests(data);
      } else if (response.status == 404) {
      } else {
        throw new Error('Failed to fetch nursery requests');
      }
    } catch (error) {
      ToastAndroid.show(
        error.message || 'Failed to fetch nursery requests',
        ToastAndroid.SHORT,
      );
    } finally {
      setLoading(false);
    }
  };

  const NurseryCard = ({item: nursery}) => (
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

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.actionButton, styles.acceptButton]}
          onPress={() => handleRequestAction(nursery.nursery_id, 'accept')}>
          <MaterialIcons name="check-circle" size={20} color="white" />
          <Text style={styles.actionButtonText}>Accept</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.rejectButton]}
          onPress={() => handleRequestAction(nursery.nursery_id, 'reject')}>
          <MaterialIcons name="cancel" size={20} color="white" />
          <Text style={styles.actionButtonText}>Reject</Text>
        </TouchableOpacity>
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
              <MaterialIcons
                name="close"
                size={24}
                color={appTheme.colors.secondaryText}
              />
            </TouchableOpacity>
          </View>

          {selectedNursery && (
            <FlatList
              data={[
                {label: 'Nursery Name', value: selectedNursery.name},
                {
                  label: 'Contact Number',
                  value: selectedNursery.contact_number,
                },
                {label: 'Email', value: selectedNursery.email},
                {label: 'Address', value: selectedNursery.address},
              ]}
              keyExtractor={item => item.label}
              renderItem={({item}) => (
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>{item.label}</Text>
                  <Text style={styles.detailValue}>{item.value}</Text>
                </View>
              )}
              ListFooterComponent={() => (
                <View style={styles.modalActions}>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.acceptButton]}
                    onPress={() =>
                      handleRequestAction(selectedNursery.nursery_id, 'accept')
                    }>
                    <MaterialIcons
                      name="check-circle"
                      size={20}
                      color="white"
                    />
                    <Text style={styles.actionButtonText}>Accept</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.modalButton, styles.rejectButton]}
                    onPress={() =>
                      handleRequestAction(selectedNursery.nursery_id, 'reject')
                    }>
                    <MaterialIcons name="cancel" size={20} color="white" />
                    <Text style={styles.actionButtonText}>Reject</Text>
                  </TouchableOpacity>
                </View>
              )}
              style={styles.modalBody}
            />
          )}
        </View>
      </View>
    </Modal>
  );

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <MaterialIcons
        name="inbox"
        size={48}
        color={appTheme.colors.secondaryText}
      />
      <Text style={styles.emptyText}>No pending nursery requests</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nursery Requests</Text>
        <Text style={styles.headerSubtitle}>
          Review and manage nursery registrations
        </Text>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={appTheme.colors.primary} />
        </View>
      ) : (
        <FlatList
          data={nurseryRequests}
          renderItem={NurseryCard}
          keyExtractor={item => item.nursery_id.toString()}
          contentContainerStyle={styles.content}
          ListEmptyComponent={renderEmptyComponent}
        />
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
    padding: 16,
    flexGrow: 1,
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
  actionButtons: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: appTheme.colors.border,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  acceptButton: {
    backgroundColor: appTheme.colors.success,
  },
  rejectButton: {
    backgroundColor: appTheme.colors.error,
  },
  actionButtonText: {
    color: 'white',
    fontSize: appTheme.fontSizes.small,
    fontWeight: 'bold',
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
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
    marginBottom: 16,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
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
    marginTop: 12,
  },
});

export default NurseryRequests;
