// src/navigation/AppNavigator.js
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import NurseryDashboard from '../screens/roles/nursery-admin/NurseryDashboard';
import ManagePlantsScreen from '../screens/ManagePlantsScreen';
import ViewPlantsScreen from '../screens/roles/nursery-admin/ViewPlants';
import OrderDetailsScreen from '../screens/roles/nursery-admin/OrderDetails';
import ReviewsScreen from '../screens/roles/nursery-admin/Reviews';
import CustomersScreen from '../screens/CustomersScreen';
import ChatBot from '../screens/roles/customer/ChatScreen';

import {StatusBar} from 'react-native';
import LoginScreen from '../screens/auth/Login';
import SignupLanding from '../screens/auth/SignupLanding';
import Signup from '../screens/auth/Signup';
import AdminDashboard from '../screens/roles/super-admin/AdminDashboard';

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
        <Stack.Screen
          name="Login"
          component={LoginScreen}
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
        <Stack.Screen
          name="AdminDashboard"
          component={AdminDashboard}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NurseryDashboard"
          component={NurseryDashboard}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Manage Plants" component={ManagePlantsScreen} />
        <Stack.Screen name="View Plants" component={ViewPlantsScreen} />
        <Stack.Screen name="Order Details" component={OrderDetailsScreen} />
        <Stack.Screen name="Reviews" component={ReviewsScreen} />
        <Stack.Screen name="Customers" component={CustomersScreen} />
        <Stack.Screen name="Chat Bot" component={ChatBot} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
