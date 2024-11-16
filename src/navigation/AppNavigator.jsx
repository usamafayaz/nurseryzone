// src/navigation/AppNavigator.js
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import ManagePlantsScreen from '../screens/ManagePlantsScreen';
import ViewPlantsScreen from '../screens/ViewPlantsScreen';
import OrderDetailsScreen from '../screens/OrderDetailsScreen';
import ReviewsScreen from '../screens/ReviewsScreen';
import CustomersScreen from '../screens/CustomersScreen';
import ChatScreen from '../screens/ChatScreen';

import {StatusBar} from 'react-native';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Manage Plants" component={ManagePlantsScreen} />
        <Stack.Screen name="View Plants" component={ViewPlantsScreen} />
        <Stack.Screen name="Order Details" component={OrderDetailsScreen} />
        <Stack.Screen name="Reviews" component={ReviewsScreen} />
        <Stack.Screen name="Customers" component={CustomersScreen} />
        <Stack.Screen name="Chat Bot" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
