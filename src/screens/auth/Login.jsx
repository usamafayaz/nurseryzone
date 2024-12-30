import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import InputField from '../../components/InputField';
import {appTheme} from '../../config/constants';
import {updateAPIUrl} from '../../utils/apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingOverlay from '../../components/LoadingOverlay';
import IPAddressModal from '../../components/IpAddressModal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import auth from '../../services/auth';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('baghban@gmail.com');
  const [password, setPassword] = useState('userpassword');
  const [loading, setLoading] = useState(false);
  const [apiModalVisible, setApiModalVisible] = useState(false);
  const [apiAddress, setApiAddress] = useState('');
  const [currentIP, setCurrentIP] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    try {
      const result = await auth.login(email, password);
      if (result.status === 'pendingApproval') {
        navigation.navigate('Pending Approval');
        return;
      }
      ToastAndroid.show('Login successful!', ToastAndroid.SHORT);
      switch (result.role.toLowerCase()) {
        case 'admin':
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'AdminDashboard'}],
            }),
          );
          break;
        case 'customer':
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'CustomerDashboard'}],
            }),
          );
          break;
        case 'deliveryboy':
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'DeliveryManDashboard'}],
            }),
          );
          break;
        case 'nursery':
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'NurseryDashboard'}],
            }),
          );
          break;
        default:
          break;
      }
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
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
      ]}
      bounces={false}>
      <TouchableOpacity
        style={styles.ipButton}
        onPress={() => setApiModalVisible(true)}>
        <Icon
          name="settings"
          size={20}
          color={appTheme.colors.primaryBackground}
        />
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
      <IPAddressModal
        visible={apiModalVisible}
        onClose={() => setApiModalVisible(false)}
        onSave={saveApiAddress}
        currentIP={currentIP}
        apiAddress={apiAddress}
        onChangeApiAddress={setApiAddress}
      />
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: appTheme.colors.primary,
    height: 40,
    width: 40,
    borderRadius: 999,
    position: 'absolute',
    right: 20,
    top: 20,
    zIndex: 1,
  },
  ipButtonText: {
    color: appTheme.colors.primaryBackground,
    fontSize: appTheme.fontSizes.small,
    fontFamily: appTheme.fontFamilies.medium,
    marginLeft: 8,
  },
});

export default Login;
