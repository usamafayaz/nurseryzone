// LoginScreen.jsx
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';

import {CommonActions} from '@react-navigation/native';
import InputField from '../../components/InputField';
import {appTheme} from '../../config/constants';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Login with:', {email, password});
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'AdminDashboard'}],
      }),
    );
  };

  return (
    <ScrollView
      style={[
        styles.container,
        {backgroundColor: appTheme.colors.primaryBackground},
      ]}>
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

          {/* <Button
        title="Add Plant"
        onPress={handleAddPlant}
        style={styles.button}
      /> */}

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
});

export default Login;

// const handleLoginPress = async () => {
//   try {
//     if (!usernameEmail.trim() || !password.trim()) {
//       ToastAndroid.show(
//         'Please provide necessary credentials.',
//         ToastAndroid.SHORT,
//       );
//       return;
//     }

//     const response = await fetch(
//       `${API_URL}/Employee/Login?username=${usernameEmail.trim()}&password=${password.trim()}`,
//     );
//     if (!response.ok) {
//       ToastAndroid.show(
//         'Incorrect credentials. Please try again.',
//         ToastAndroid.SHORT,
//       );
//       return;
//     }
//     const data = await response.json();
//     let role = data.user_role.toLowerCase();
//     console.log(data);
//     if (role === 'supervisor') {
//       navigation.dispatch(
//         CommonActions.reset({
//           index: 0,
//           routes: [{name: 'Supervisor Dashboard', params: {data: data}}],
//         }),
//       );
//     } else if (role === 'employee') {
//       navigation.dispatch(
//         CommonActions.reset({
//           index: 0,
//           routes: [{name: 'Employee Login', params: {data: data}}],
//         }),
//       );
//     } else if (role === 'admin') {
//       navigation.dispatch(
//         CommonActions.reset({
//           index: 0,
//           routes: [{name: 'Admin Dashboard', params: {name: data.name}}],
//         }),
//       );
//     } else {
//       ToastAndroid.show(
//         'Incorrect credentials. Please try again.',
//         ToastAndroid.SHORT,
//       );
//       return;
//     }
//     setUsernameEmail('');
//     setPassword('');
//   } catch (error) {
//     console.error('Error occurred during login:', error);
//   }
// };
