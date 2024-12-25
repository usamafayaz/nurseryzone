import AsyncStorage from '@react-native-async-storage/async-storage';
import {ToastAndroid} from 'react-native';

let API_BASE_URL = '';

const fetchIPAddress = async () => {
  try {
    const ipAddress = await AsyncStorage.getItem('IPAddress');
    if (ipAddress) {
      API_BASE_URL = `http://${ipAddress}/api`;
    }
  } catch (error) {
    ToastAndroid.show('Error fetching IP address:', ToastAndroid.SHORT);
  }
};

fetchIPAddress();

const updateAPIUrl = async () => {
  await fetchIPAddress();
};

export {API_BASE_URL, updateAPIUrl};
