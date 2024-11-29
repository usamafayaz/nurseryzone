import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {appTheme} from '../../config/constants';

const SignupLanding = () => {
  const navigation = useNavigation();

  const handleRoleSelection = role => {
    navigation.navigate('Signup', {role});
  };

  return (
    <ScrollView
      style={[
        styles.container,
        {backgroundColor: appTheme.colors.primaryBackground},
      ]}>
      <View style={styles.content}>
        {/* Header Section with Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/logo/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={[styles.title, {color: appTheme.colors.primary}]}>
            Nursery Zone
          </Text>
          <Text
            style={[styles.subtitle, {color: appTheme.colors.secondaryText}]}>
            Your Personal Plant Paradise
          </Text>
        </View>

        {/* Role Selection Cards */}
        <View
          style={[
            styles.formContainer,
            {backgroundColor: appTheme.colors.secondaryBackground},
          ]}>
          {/* Customer Role Card */}
          <TouchableOpacity
            style={[styles.button, {backgroundColor: appTheme.colors.primary}]}
            onPress={() => handleRoleSelection('Customer')}>
            <View style={styles.buttonContent}>
              <Icon
                name="shopping-basket"
                size={24}
                color={appTheme.colors.primaryBackground}
              />
              <Text
                style={[
                  styles.buttonText,
                  {color: appTheme.colors.primaryBackground},
                ]}>
                Sign up as Customer
              </Text>
            </View>
          </TouchableOpacity>

          {/* Nursery Admin Role Card */}
          <TouchableOpacity
            style={[styles.button, {backgroundColor: appTheme.colors.primary}]}
            onPress={() => handleRoleSelection('Nursery Admin')}>
            <View style={styles.buttonContent}>
              <Icon
                name="people"
                size={24}
                color={appTheme.colors.primaryBackground}
              />
              <Text
                style={[
                  styles.buttonText,
                  {color: appTheme.colors.primaryBackground},
                ]}>
                Sign up as Nursery Admin
              </Text>
            </View>
          </TouchableOpacity>

          {/* Footer Section */}
          <TouchableOpacity
            style={styles.loginLink}
            onPress={() => navigation.navigate('Login')}>
            <Text
              style={[
                styles.footerText,
                {color: appTheme.colors.secondaryText},
              ]}>
              Already have an account?{' '}
              <Text
                style={[styles.footerLink, {color: appTheme.colors.primary}]}>
                Sign in
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: appTheme.screen.height * 0.1,
    marginBottom: 40,
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
    marginTop: 16,
    shadowColor: appTheme.colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: appTheme.fontSizes.medium,
    fontFamily: appTheme.fontFamilies.bold,
    marginLeft: 10,
  },
  loginLink: {
    marginTop: 20,
  },
  footerText: {
    fontSize: appTheme.fontSizes.small,
    fontFamily: appTheme.fontFamilies.regular,
    textAlign: 'center',
  },
  footerLink: {
    fontFamily: appTheme.fontFamilies.bold,
  },
});

export default SignupLanding;
