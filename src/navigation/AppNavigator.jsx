import React from 'react';
import {StatusBar} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {appTheme} from '../config/constants';

import Login from '../screens/auth/Login';
import SignupLanding from '../screens/auth/SignupLanding';
import Signup from '../screens/auth/Signup';

import NurseryDashboard from '../screens/roles/nursery-admin/NurseryDashboard';
import AddPlant from '../screens/roles/nursery-admin/AddPlant';
import ManagePlants from '../screens/roles/nursery-admin/ManagePlants';
import ManageOrders from '../screens/roles/nursery-admin/ManageOrders';
import Reviews from '../screens/roles/nursery-admin/Reviews';
import ChatBot from '../screens/roles/customer/ChatScreen';
import NurseryPendingApproval from '../screens/roles/nursery-admin/PendingApproval';
import AddDeliveryBoy from '../screens/roles/nursery-admin/AddDeliveryBoy';

import AdminDashboard from '../screens/roles/super-admin/AdminDashboard';
import NurseryRequests from '../screens/roles/super-admin/NurseryRequests';
import RegisteredNurseries from '../screens/roles/super-admin/RegisteredNurseries';

import CustomerDashboard from '../screens/roles/customer/CustomerDashboard';
import DeliveryManDashboard from '../screens/roles/delivery-man/DeliveryManDashboard';
import ProductDetail from '../screens/roles/customer/ProductDetail';
import CartScreen from '../screens/roles/customer/CartScreen';
import CheckoutScreen from '../screens/roles/customer/Checkout';
import OrderSuccess from '../screens/roles/customer/OrderSuccess';
import TrackOrder from '../screens/roles/customer/TrackOrder';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor={appTheme.colors.primary}
        barStyle="dark-content"
      />
      <Stack.Navigator
        screenOptions={{
          headerStyle: {backgroundColor: '#16a34a'},
          headerTintColor: '#FFFFFF',
          headerShown: false,
        }}>
        {/* Auth Screens*/}

        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignupLanding" component={SignupLanding} />
        <Stack.Screen name="Signup" component={Signup} />

        {/* Nursery Admin */}

        <Stack.Screen name="NurseryDashboard" component={NurseryDashboard} />
        <Stack.Screen name="Add Plant" component={AddPlant} />
        <Stack.Screen name="Manage Plants" component={ManagePlants} />
        <Stack.Screen name="Manage Orders" component={ManageOrders} />
        <Stack.Screen name="Reviews" component={Reviews} />
        <Stack.Screen name="Chat Bot" component={ChatBot} />
        <Stack.Screen
          name="Pending Approval"
          component={NurseryPendingApproval}
        />
        <Stack.Screen name="AddDeliveryBoy" component={AddDeliveryBoy} />

        {/* Super Admin */}

        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
        <Stack.Screen name="NurseryRequests" component={NurseryRequests} />
        <Stack.Screen
          name="RegisteredNurseries"
          component={RegisteredNurseries}
        />

        {/* Customer */}
        <Stack.Screen name="CustomerDashboard" component={CustomerDashboard} />
        <Stack.Screen name="Product Detail" component={ProductDetail} />
        <Stack.Screen name="CartScreen" component={CartScreen} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
        <Stack.Screen name="OrderSuccess" component={OrderSuccess} />
        <Stack.Screen name="TrackOrder" component={TrackOrder} />

        {/* Delivery Man */}
        <Stack.Screen
          name="DeliveryManDashboard"
          component={DeliveryManDashboard}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
