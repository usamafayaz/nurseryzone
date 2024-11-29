// src/navigation/AppNavigator.js
import React from 'react';
import {StatusBar} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import Login from '../screens/auth/Login';
import SignupLanding from '../screens/auth/SignupLanding';
import Signup from '../screens/auth/Signup';

import NurseryDashboard from '../screens/roles/nursery-admin/NurseryDashboard';
import ManagePlants from '../screens/roles/nursery-admin/ManagePlants';
import ViewPlants from '../screens/roles/nursery-admin/ViewPlants';
import OrderDetails from '../screens/roles/nursery-admin/OrderDetails';
import Reviews from '../screens/roles/nursery-admin/Reviews';
import Customers from '../screens/roles/nursery-admin/Customers';

import ChatBot from '../screens/roles/customer/ChatScreen';

import AdminDashboard from '../screens/roles/super-admin/AdminDashboard';
import NurseryRequests from '../screens/roles/super-admin/NurseryRequests';
import RegisteredNurseries from '../screens/roles/super-admin/RegisteredNurseries';

import CustomerDashboard from '../screens/roles/customer/CustomerDashboard';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <Stack.Navigator
        initialRouteName="Signup"
        screenOptions={{
          headerStyle: {backgroundColor: '#16a34a'},
          headerTintColor: '#FFFFFF',
        }}>
        {/* Auth Screens*/}

        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignupLanding"
          component={SignupLanding}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{headerShown: false}}
        />

        {/* Nursery Admin */}

        <Stack.Screen
          name="NurseryDashboard"
          component={NurseryDashboard}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Manage Plants" component={ManagePlants} />
        <Stack.Screen name="View Plants" component={ViewPlants} />
        <Stack.Screen name="Order Details" component={OrderDetails} />
        <Stack.Screen name="Reviews" component={Reviews} />
        <Stack.Screen name="Customers" component={Customers} />
        <Stack.Screen name="Chat Bot" component={ChatBot} />

        {/* Super Admin */}

        <Stack.Screen
          name="AdminDashboard"
          component={AdminDashboard}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NurseryRequests"
          component={NurseryRequests}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RegisteredNurseries"
          component={RegisteredNurseries}
          options={{headerShown: false}}
        />

        {/* Customer */}
        <Stack.Screen
          name="CustomerDashboard"
          component={CustomerDashboard}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
