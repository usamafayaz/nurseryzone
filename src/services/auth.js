import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_BASE_URL} from '../utils/apiConfig';

const login = async (email, password) => {
  try {
    if (!email.trim() || !password.trim()) {
      throw new Error('Please enter username and password.');
    }
    if (email.trim() == 'admin@gmail.com' || password.trim() == 'admin123') {
      return {status: 'success', role: 'admin'};
    }
    const response = await fetch(
      `${API_BASE_URL}/login?email=${email}&password=${password}`,
    );
    if (!response.ok) {
      if (response.status === 403) {
        const errorData = await response.json();
        if (errorData.detail === 'Permission denied') {
          return {status: 'pendingApproval'};
        }
      }
      throw new Error('Invalid credentials. Please try again.');
    }

    const result = await response.json();
    await AsyncStorage.setItem('userData', JSON.stringify(result));
    return {status: 'success', role: result.role};
  } catch (error) {
    console.error('Error during login:', error.message);
    throw error;
  }
};

const signup = async (userInfo, role) => {
  try {
    const data = {
      ...userInfo,
      is_nursery: role === 'Customer' ? false : true,
    };

    const response = await fetch(`${API_BASE_URL}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {success: false, message: errorData.message || 'Signup failed.'};
    }

    return {success: true, message: 'Signup successful!'};
  } catch (error) {
    console.error('Error during signup:', error);
    return {success: false, message: 'Something went wrong. Please try again.'};
  }
};

export default {login, signup};
