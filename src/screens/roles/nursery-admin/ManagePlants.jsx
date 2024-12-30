import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {appTheme} from '../../../config/constants';
import * as ImagePicker from 'react-native-image-picker';
import customerSideApi from '../../../services/customerSideApi';
import nurserySideApi from '../../../services/nurserySideApi';
import InputField from '../../../components/InputField';

const ManagePlants = ({navigation}) => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageSelected, setImageSelected] = useState(false);
  const [modalPlant, setModalPlant] = useState(null);
  const {fetchNurseryPlants, deletePlant, editPlant} = nurserySideApi;
  useEffect(() => {
    fetchPlants();
  }, []);

  const handleImagePick = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.8,
      },
      response => {
        if (!response.didCancel && !response.error) {
          setModalPlant({...modalPlant, image: response.assets[0]});
          setImageSelected(true);
        }
      },
    );
  };

  const fetchPlants = async () => {
    try {
      const nurseryData = await AsyncStorage.getItem('userData');
      const nursery = JSON.parse(nurseryData);
      const data = await fetchNurseryPlants(nursery.user_id);
      setPlants(data);
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = plant =>
    setModalPlant({...plant, currentImage: plant.image_url});
  const handleModalClose = () => setModalPlant(null);

  const handleDelete = async plantId => {
    try {
      const response = await deletePlant(plantId);

      if (response == true) {
        ToastAndroid.show('Plant deleted successfully', ToastAndroid.SHORT);
        setPlants(plants.filter(plant => plant.plant_id !== plantId));
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const validateFields = () => {
    const requiredFields = {
      name: 'Plant Name',
      description: 'Description',
      price: 'Price',
      stock: 'Stock',
    };

    for (const [field, label] of Object.entries(requiredFields)) {
      if (!modalPlant[field]) {
        ToastAndroid.show(`Please fill in ${label}`, ToastAndroid.SHORT);
        return false;
      }
    }
    if (!modalPlant.image || !modalPlant.currentImage) {
      ToastAndroid.show('Please select an image', ToastAndroid.SHORT);
      return false;
    }

    return true;
  };

  const handleModalSave = async () => {
    if (!validateFields()) return;

    try {
      const response = await editPlant(modalPlant);

      if (response == true) {
        ToastAndroid.show('Plant updated successfully', ToastAndroid.SHORT);
        handleModalClose();
        await fetchPlants();
      }
    } catch (error) {
      console.error('Error updating plant:', error);
      ToastAndroid.show(
        error.message || 'Failed to update plant',
        ToastAndroid.SHORT,
      );
    }
  };

  const renderPlantCard = ({item}) => (
    <View style={styles.card}>
      <Image
        source={{uri: customerSideApi.getImageUrl(item.image_url)}}
        style={styles.plantImage}
      />
      <View style={styles.cardActions}>
        <TouchableOpacity
          onPress={() => handleEdit(item)}
          style={styles.actionButton}>
          <Icon name="edit" size={20} color={appTheme.colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDelete(item.plant_id)}
          style={styles.actionButton}>
          <Icon name="delete" size={20} color={appTheme.colors.error} />
        </TouchableOpacity>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.plantName}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <View style={styles.detailsRow}>
          <Text style={styles.price}>Rs. {item.price}</Text>
          <Text style={styles.stock}>Stock: {item.stock}</Text>
        </View>
      </View>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <Icon
          name="keyboard-arrow-left"
          size={30}
          color="white"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={styles.headerTitle}>Plant Inventory</Text>
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.replace('Add Plant')}>
        <Icon name="add" size={24} color={appTheme.colors.primary} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}

      {loading ? (
        <View style={styles.centerContainer}>
          <Icon name="eco" size={48} color={appTheme.colors.secondaryText} />
          <Text style={styles.loadingText}>Loading plants...</Text>
        </View>
      ) : plants.length === 0 ? (
        <View style={styles.centerContainer}>
          <Icon name="warning" size={48} color={appTheme.colors.warning} />
          <Text style={styles.emptyTitle}>No Plants Found</Text>
          <Text style={styles.emptyText}>Start by adding your first plant</Text>
          <TouchableOpacity
            style={styles.emptyAddButton}
            onPress={() => navigation.replace('Add Plant')}>
            <Text style={styles.emptyAddButtonText}>Add First Plant</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={plants}
          renderItem={renderPlantCard}
          // keyExtractor={item => item.plant_id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      )}

      <Modal visible={!!modalPlant} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Plant Details</Text>
            <InputField
              label="Plant Name"
              iconName="eco"
              value={modalPlant?.name}
              onChangeText={text => setModalPlant({...modalPlant, name: text})}
              placeholder="Plant Name"
              placeholderTextColor={appTheme.colors.secondaryText}
            />
            <InputField
              label="Plant Description"
              iconName="description"
              value={modalPlant?.description}
              onChangeText={text =>
                setModalPlant({...modalPlant, description: text})
              }
              placeholder="Plant Description"
              placeholderTextColor={appTheme.colors.secondaryText}
              customStyle={styles.textArea}
              multiline
            />

            <View style={styles.inputRow}>
              <View style={{flex: 1}}>
                <InputField
                  label="Price"
                  iconName="attach-money"
                  value={modalPlant?.price?.toString()}
                  onChangeText={text =>
                    setModalPlant({...modalPlant, price: text})
                  }
                  placeholder="Price"
                  placeholderTextColor={appTheme.colors.secondaryText}
                  keyboardType="numeric"
                />
              </View>
              <View style={{flex: 1}}>
                <InputField
                  label="Stock"
                  iconName="inventory"
                  value={modalPlant?.stock?.toString()}
                  onChangeText={text =>
                    setModalPlant({...modalPlant, stock: text})
                  }
                  placeholder="Stock"
                  placeholderTextColor={appTheme.colors.secondaryText}
                  keyboardType="numeric"
                />
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text
                style={[styles.label, {color: appTheme.colors.secondaryText}]}>
                Plant Image
              </Text>
              <TouchableOpacity
                onPress={handleImagePick}
                style={[
                  styles.inputWrapper,
                  {backgroundColor: appTheme.colors.inputBackground},
                ]}>
                <Icon
                  name="add-photo-alternate"
                  size={20}
                  color={appTheme.colors.secondaryText}
                  style={styles.inputIcon}
                />
                <Text
                  style={[
                    styles.imagePickerText,
                    {
                      color: imageSelected
                        ? appTheme.colors.primaryText
                        : appTheme.colors.placeholderText,
                    },
                  ]}>
                  {imageSelected ? 'Image Selected' : 'Choose an image'}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleModalClose}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleModalSave}>
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: appTheme.fontSizes.large,
    fontFamily: appTheme.fontFamilies.bold,
    marginLeft: 12,
  },
  addButton: {
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 8,
  },
  listContainer: {
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
  plantImage: {
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardActions: {
    position: 'absolute',
    top: 8,
    right: 8,
    flexDirection: 'row',
  },
  actionButton: {
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 20,
    marginLeft: 8,
  },
  cardContent: {
    padding: 16,
  },
  plantName: {
    fontSize: appTheme.fontSizes.large,
    fontFamily: appTheme.fontFamilies.bold,
    color: appTheme.colors.primaryText,
    marginBottom: 8,
  },
  description: {
    fontSize: appTheme.fontSizes.medium,
    color: appTheme.colors.secondaryText,
    marginBottom: 12,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: appTheme.fontSizes.medium,
    fontFamily: appTheme.fontFamilies.bold,
    color: appTheme.colors.primary,
  },
  stock: {
    fontSize: appTheme.fontSizes.medium,
    color: appTheme.colors.secondaryText,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  loadingText: {
    fontSize: appTheme.fontSizes.large,
    color: appTheme.colors.secondaryText,
    marginTop: 16,
  },
  emptyTitle: {
    fontSize: appTheme.fontSizes.large,
    fontFamily: appTheme.fontFamilies.bold,
    color: appTheme.colors.primaryText,
    marginTop: 16,
  },
  emptyText: {
    fontSize: appTheme.fontSizes.medium,
    color: appTheme.colors.secondaryText,
    marginTop: 8,
  },
  emptyAddButton: {
    backgroundColor: appTheme.colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 24,
  },
  emptyAddButtonText: {
    color: 'white',
    fontSize: appTheme.fontSizes.medium,
    fontFamily: appTheme.fontFamilies.bold,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 16,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
  },
  modalTitle: {
    color: appTheme.colors.primaryText,
    fontSize: appTheme.fontSizes.large,
    fontFamily: appTheme.fontFamilies.bold,
    marginBottom: 16,
  },
  textArea: {
    height: 90,
    textAlignVertical: 'top',
  },
  inputRow: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  cancelButton: {
    backgroundColor: appTheme.colors.border,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  saveButton: {
    backgroundColor: appTheme.colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  cancelButtonText: {
    color: appTheme.colors.primaryText,
    fontSize: appTheme.fontSizes.medium,
  },
  saveButtonText: {
    color: 'white',
    fontSize: appTheme.fontSizes.medium,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: appTheme.fontSizes.small,
    fontFamily: appTheme.fontFamilies.regular,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 50,
  },
  inputIcon: {
    marginRight: 10,
  },
  imagePickerText: {
    flex: 1,
    fontSize: appTheme.fontSizes.medium,
    fontFamily: appTheme.fontFamilies.regular,
  },
});

export default ManagePlants;
