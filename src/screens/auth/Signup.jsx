// Signup.jsx
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

import {CommonActions} from '@react-navigation/native';
import InputField from '../../components/InputField';
import {appTheme} from '../../config/constants';

const Signup = ({navigation, route}) => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password_hash: '',
    address: '',
    contact_number: '',
  });
  const role = route.params.role;
  const handleSignup = async () => {
    const data = {
      ...userInfo,
      is_nursery: role === 'Customer' ? false : true,
    };
    console.log('Data is ', data);

    // const response = await fetch('http://localhost:8000/api/user', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data),
    // });
    // const result = await response.json();
    // console.log(result);

    if (role === 'Customer')
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Dashboard'}],
        }),
      );
    else
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Dashboard'}],
        }),
      );
  };
  const handleInputChange = (field, value) => {
    setUserInfo(prev => ({...prev, [field]: value}));
  };

  return (
    <ScrollView
      style={[
        styles.container,
        {backgroundColor: appTheme.colors.primaryBackground},
      ]}>
      <View style={styles.logoContainer}>
        <Text style={[styles.title, {color: appTheme.colors.primary}]}>
          Nursery Zone
        </Text>
        <Text style={[styles.subtitle, {color: appTheme.colors.secondaryText}]}>
          Your Personal Plant Paradise
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
          value={userInfo.name}
          onChangeText={value => handleInputChange('name', value)}
          placeholder="Enter your name"
          keyboardType="text"
        />
        <InputField
          label="Email"
          iconName="email"
          value={userInfo.email}
          onChangeText={value => handleInputChange('email', value)}
          placeholder="Enter your email"
          keyboardType="email-address"
        />
        <InputField
          label="Password"
          iconName="lock"
          value={userInfo.password_hash}
          onChangeText={value => handleInputChange('password_hash', value)}
          placeholder="Enter your password"
          keyboardType="password"
          secureTextEntry
        />
        <InputField
          label="Address"
          iconName="maps-home-work"
          value={userInfo.address}
          onChangeText={value => handleInputChange('address', value)}
          placeholder="Enter your Address"
          keyboardType="text"
        />
        <InputField
          label="Contact Number"
          iconName="phone"
          value={userInfo.contact_number}
          onChangeText={value => handleInputChange('contact_number', value)}
          placeholder="Enter your contact number"
          keyboardType="numeric"
        />

        <TouchableOpacity
          style={[styles.button, {backgroundColor: appTheme.colors.primary}]}
          onPress={handleSignup}>
          <Text
            style={[
              styles.buttonText,
              {color: appTheme.colors.primaryBackground},
            ]}>
            Sign Up
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text
            style={[styles.footerText, {color: appTheme.colors.secondaryText}]}>
            Already have an account?{' '}
            <Text style={[styles.footerLink, {color: appTheme.colors.primary}]}>
              Sign In
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
  logo: {
    width: appTheme.screen.width * 0.3,
    height: appTheme.screen.width * 0.3,
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

export default Signup;
