import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  ToastAndroid,
  Modal,
} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import InputField from '../../components/InputField';
import {appTheme} from '../../config/constants';
import {API_BASE_URL, updateAPIUrl} from '../../utils/apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingOverlay from '../../components/LoadingOverlay';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('sarmad@gmail.com');
  const [password, setPassword] = useState('userpassword');
  const [loading, setLoading] = useState(false);
  const [apiModalVisible, setApiModalVisible] = useState(false);
  const [apiAddress, setApiAddress] = useState('');
  const [currentIP, setCurrentIP] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    try {
      if (!email.trim() || !password.trim()) {
        ToastAndroid.show(
          'Please enter username and password.',
          ToastAndroid.SHORT,
        );
        return;
      }
      if (
        email.trim() === 'admin@gmail.com' &&
        password.trim() === 'admin123'
      ) {
        ToastAndroid.show('Login successful!', ToastAndroid.SHORT);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'AdminDashboard'}],
          }),
        );
        return;
      }

      const response = await fetch(
        `${API_BASE_URL}/login?email=${email}&password=${password}`,
      );

      if (!response.ok) {
        if (response.status === 403) {
          const errorData = await response.json();
          if (errorData.detail === 'Permission denied') {
            navigation.navigate('Pending Approval');
            return;
          }
        }
        ToastAndroid.show(
          'Invalid credentials. Please try again.',
          ToastAndroid.SHORT,
        );
        return;
      }

      const result = await response.json();

      AsyncStorage.setItem('userData', JSON.stringify(result));
      ToastAndroid.show('Login successful!', ToastAndroid.SHORT);

      const role = result.role.toLowerCase();
      if (role === 'nursery') {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'NurseryDashboard'}],
          }),
        );
      } else if (role === 'customer') {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'CustomerDashboard'}],
          }),
        );
      } else if (role === 'deliveryboy') {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'DeliveryManDashboard'}],
          }),
        );
      }
    } catch (error) {
      console.error('Error during login:', error);
      ToastAndroid.show(
        'Something went wrong. Please try again later.',
        ToastAndroid.SHORT,
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchIPAddress = async () => {
      try {
        const ipAddress = await AsyncStorage.getItem('IPAddress');
        if (ipAddress !== null) {
          setCurrentIP(ipAddress);
          setApiAddress(ipAddress);
        } else {
          setCurrentIP('Not Set');
        }
      } catch (error) {
        console.error('Error fetching IP address:', error);
      }
    };
    fetchIPAddress();
    updateAPIUrl();
  }, []);

  const saveApiAddress = async () => {
    try {
      if (!apiAddress) {
        ToastAndroid.show('Please enter an IP address.', ToastAndroid.SHORT);
        return;
      }
      await AsyncStorage.setItem('IPAddress', apiAddress);
      setApiModalVisible(false);
      setCurrentIP(apiAddress);
      updateAPIUrl();
      ToastAndroid.show('IP Address changed successfully.', ToastAndroid.SHORT);
    } catch (error) {
      console.error('Error saving API address to AsyncStorage:', error);
    }
  };

  return (
    <ScrollView
      style={[
        styles.container,
        {backgroundColor: appTheme.colors.primaryBackground},
      ]}>
      <TouchableOpacity
        style={styles.ipButton}
        onPress={() => setApiModalVisible(true)}>
        <Text style={styles.ipButtonText}>IP</Text>
      </TouchableOpacity>
      <View style={styles.content}>
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

        <View
          style={[
            styles.formContainer,
            {backgroundColor: appTheme.colors.secondaryBackground},
          ]}>
          <InputField
            label="Email"
            iconName="email"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
          />

          <InputField
            label="Password"
            iconName="lock"
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry
          />

          <TouchableOpacity
            style={[styles.button, {backgroundColor: appTheme.colors.primary}]}
            onPress={handleLogin}>
            <Text
              style={[
                styles.buttonText,
                {color: appTheme.colors.primaryBackground},
              ]}>
              Log In
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('SignupLanding')}>
            <Text
              style={[
                styles.footerText,
                {color: appTheme.colors.secondaryText},
              ]}>
              New to Nursery Zone?{' '}
              <Text
                style={[styles.footerLink, {color: appTheme.colors.primary}]}>
                Create Account
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <LoadingOverlay visible={loading} />
      <Modal
        visible={apiModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setApiModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalWrapper}>
            <Text style={styles.modalHeaderStyle}>Change IP Address</Text>
            <Text style={styles.hintText}>Current IP: {currentIP}</Text>
            <Text style={styles.hintText}>IP Address:</Text>

            <InputField
              placeholder="Enter IP Address"
              value={apiAddress}
              onChangeText={setApiAddress}
              iconName="lock"
            />
            <View style={styles.modalButtonWrapper}>
              <TouchableOpacity onPress={() => setApiModalVisible(false)}>
                <Text style={styles.cancelStyle}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={saveApiAddress}>
                <Text style={styles.OKStyle}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  ipButton: {
    backgroundColor: appTheme.colors.primary,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    position: 'absolute',
    right: 20,
    top: 20,
  },
  ipButtonText: {
    color: appTheme.colors.primaryBackground,
    fontSize: appTheme.fontSizes.small,
    fontFamily: appTheme.fontFamilies.bold,
  },
  modalWrapper: {
    backgroundColor: appTheme.colors.primaryBackground,
    borderRadius: 16,
    padding: 20,
    width: '90%',
    alignSelf: 'center',
  },
  modalHeaderStyle: {
    fontSize: appTheme.fontSizes.large,
    fontFamily: appTheme.fontFamilies.bold,
    color: appTheme.colors.primary,
    marginBottom: 20,
  },
  modalButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  cancelStyle: {
    color: appTheme.colors.secondaryText,
    marginRight: 20,
    fontSize: appTheme.fontSizes.medium,
    fontFamily: appTheme.fontFamilies.bold,
  },
  OKStyle: {
    color: appTheme.colors.primaryBackground,
    backgroundColor: appTheme.colors.primary,
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: appTheme.fontSizes.medium,
    fontFamily: appTheme.fontFamilies.bold,
  },
  hintText: {
    color: appTheme.colors.secondaryText,
    fontSize: appTheme.fontSizes.medium,
    fontFamily: appTheme.fontFamilies.regular,
    marginBottom: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalWrapper: {
    backgroundColor: appTheme.colors.primaryBackground,
    borderRadius: 16,
    padding: 20,
    width: '90%',
    elevation: 5,
  },
});

export default Login;
