import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import * as ImagePicker from 'react-native-image-picker';
import {appTheme} from '../../../config/constants';
import InputField from '../../../components/InputField';
import nurserySideApi from '../../../services/nurserySideApi';

const AddPlant = () => {
  const [plantData, setPlantData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    image: null,
  });
  const [errors, setErrors] = useState({});
  const navigation = useNavigation();

  const handleImage = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.8,
      },
      response => {
        if (!response.didCancel && !response.error) {
          setPlantData({...plantData, image: response.assets[0]});
        }
      },
    );
  };

  const handleAddPlant = async () => {
    if (
      !plantData.name ||
      !plantData.price ||
      !plantData.image ||
      !plantData.description ||
      !plantData.stock ||
      !plantData.image
    ) {
      setErrors({
        name: !plantData.name ? 'Name is required' : null,
        description: !plantData.description ? 'Description is required' : null,
        price: !plantData.price ? 'Price is required' : null,
        stock: !plantData.stock ? 'Stock is required' : null,
        image: !plantData.image ? 'Image is required' : null,
      });
      return;
    }

    try {
      const nurseryData = await AsyncStorage.getItem('userData');
      const nursery = JSON.parse(nurseryData);
      const response = await nurserySideApi.addPlant(
        nursery.user_id,
        plantData,
      );

      if (response == true) {
        navigation.replace('Manage Plants');
      }
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
  };

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
        <Text style={styles.headerTitle}>Add Plants</Text>
      </View>

      <ScrollView style={styles.content} bounces={false}>
        <View style={styles.form}>
          <InputField
            label="Name *"
            iconName="person"
            value={plantData.name}
            onChangeText={text => {
              setPlantData({...plantData, name: text});
              setErrors({...errors, name: null});
            }}
            placeholder="Enter plant name"
            error={errors.name}
          />

          <InputField
            label="Description *"
            iconName="description"
            value={plantData.description}
            onChangeText={text => {
              setPlantData({...plantData, description: text});
              setErrors({...errors, description: null});
            }}
            placeholder="Enter description"
            error={errors.description}
          />

          <InputField
            label="Price *"
            iconName="attach-money"
            value={plantData.price}
            onChangeText={text => {
              setPlantData({...plantData, price: text});
              setErrors({...errors, price: null});
            }}
            placeholder="Enter price"
            keyboardType="numeric"
            error={errors.price}
          />

          <InputField
            label="Stock *"
            iconName="inventory"
            value={plantData.stock}
            onChangeText={text => {
              setPlantData({...plantData, stock: text});
              setErrors({...errors, stock: null});
            }}
            placeholder="Enter stock quantity"
            keyboardType="numeric"
            error={errors.stock}
          />
          <Text style={[styles.label, {color: appTheme.colors.secondaryText}]}>
            Select Image *
          </Text>
          <TouchableOpacity style={styles.imageButton} onPress={handleImage}>
            <Icon
              name="image"
              size={20}
              color={appTheme.colors.placeholderText}
            />
            <Text style={styles.imageButtonText}>
              {plantData.image ? 'Change Image' : 'Select Image *'}
            </Text>
          </TouchableOpacity>
          {errors.image && <Text style={styles.errorText}>{errors.image}</Text>}

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleAddPlant}>
            <Icon
              name="plus"
              size={20}
              color={appTheme.colors.primaryBackground}
            />
            <Text style={styles.submitButtonText}>Add Plant</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  content: {
    flex: 1,
    padding: 16,
  },
  form: {
    backgroundColor: appTheme.colors.primaryBackground,
    borderRadius: 12,
    padding: 16,
    gap: 16,
  },
  label: {
    fontSize: appTheme.fontSizes.small,
    color: appTheme.colors.secondaryText,
    fontFamily: appTheme.fontFamilies.regular,
  },
  imageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: appTheme.colors.inputBackground,
    borderRadius: 8,
    padding: 12,
    gap: 8,
  },
  imageButtonText: {
    color: appTheme.colors.secondaryText,
    fontSize: appTheme.fontSizes.medium,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: appTheme.colors.primary,
    borderRadius: 8,
    padding: 16,
    gap: 8,
  },
  submitButtonText: {
    color: appTheme.colors.primaryBackground,
    fontSize: appTheme.fontSizes.medium,
    fontFamily: appTheme.fontFamilies.bold,
  },
});

export default AddPlant;
