import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import {appTheme} from '../../../config/constants';
import API_BASE_URL from '../../../utils/apiConfig';
import InputField from '../../../components/InputField';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddDeliveryBoy = ({navigation}) => {
  const [deliveryBoyInfo, setDeliveryBoyInfo] = useState({
    email: '',
    name: '',
    address: '',
    password_hash: '',
    contact_number: '',
  });

  const handleInputChange = (field, value) => {
    setDeliveryBoyInfo(prev => ({...prev, [field]: value}));
  };

  const addDeliveryBoy = async () => {
    const storedUserData = JSON.parse(await AsyncStorage.getItem('userData'));

    const data = {
      ...deliveryBoyInfo,
      nursery_id: storedUserData.user_id,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/delivery/boy`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        ToastAndroid.show(
          'Delivery Boy Successfully Added',
          ToastAndroid.SHORT,
        );
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'NurseryDashboard'}],
          }),
        );
      } else {
        ToastAndroid.show(
          'Error Occured while adding Delivery Boy',
          ToastAndroid.SHORT,
        );
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <ScrollView
      style={[
        styles.container,
        {backgroundColor: appTheme.colors.primaryBackground},
      ]}>
      <View style={styles.logoContainer}>
        <Text style={[styles.title, {color: appTheme.colors.primary}]}>
          Register Delivery Associate
        </Text>
      </View>

      <View
        style={[
          styles.formContainer,
          {backgroundColor: appTheme.colors.secondaryBackground},
        ]}>
        <InputField
          label="Full Name"
          iconName="person"
          value={deliveryBoyInfo.name}
          onChangeText={value => handleInputChange('name', value)}
          placeholder="Enter full name"
          keyboardType="text"
        />
        <InputField
          label="Email"
          iconName="email"
          value={deliveryBoyInfo.email}
          onChangeText={value => handleInputChange('email', value)}
          placeholder="Enter email address"
          keyboardType="email-address"
        />
        <InputField
          label="Password"
          iconName="lock"
          value={deliveryBoyInfo.password_hash}
          onChangeText={value => handleInputChange('password_hash', value)}
          placeholder="Enter password"
          keyboardType="password"
          secureTextEntry
        />
        <InputField
          label="Address"
          iconName="maps-home-work"
          value={deliveryBoyInfo.address}
          onChangeText={value => handleInputChange('address', value)}
          placeholder="Enter address"
          keyboardType="text"
        />
        <InputField
          label="Contact Number"
          iconName="phone"
          value={deliveryBoyInfo.contact_number}
          onChangeText={value => handleInputChange('contact_number', value)}
          placeholder="Enter contact number"
          keyboardType="numeric"
        />

        <TouchableOpacity
          style={[styles.button, {backgroundColor: appTheme.colors.primary}]}
          onPress={addDeliveryBoy}>
          <Text
            style={[
              styles.buttonText,
              {color: appTheme.colors.primaryBackground},
            ]}>
            Add Delivery Boy
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('/')}>
          <Text
            style={[styles.footerText, {color: appTheme.colors.secondaryText}]}>
            Already have an account?{' '}
            <Text style={[styles.footerLink, {color: appTheme.colors.primary}]}>
              Sign in
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appTheme.colors.primaryBackground,
    padding: 15,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: appTheme.screen.height * 0.05,
    marginBottom: 20,
  },
  title: {
    fontSize: appTheme.fontSizes.xlarge,
    fontFamily: appTheme.fontFamilies.bold,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: appTheme.fontSizes.medium,
    fontFamily: appTheme.fontFamilies.regular,
  },
  formContainer: {
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  button: {
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: appTheme.colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontSize: appTheme.fontSizes.medium,
    fontFamily: appTheme.fontFamilies.bold,
  },
  footerText: {
    fontSize: appTheme.fontSizes.small,
    fontFamily: appTheme.fontFamilies.regular,
    textAlign: 'center',
    marginTop: 20,
  },
  footerLink: {
    fontFamily: appTheme.fontFamilies.bold,
  },
});

export default AddDeliveryBoy;
