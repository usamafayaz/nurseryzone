import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Animated} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {appTheme} from '../../../config/constants';

const OrderSuccessScreen = ({navigation}) => {
  const scaleValue = new Animated.Value(0);

  useEffect(() => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 7,
      tension: 40,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.content, {transform: [{scale: scaleValue}]}]}>
        <View style={styles.iconContainer}>
          <Icon
            name="check-circle"
            size={100}
            color={appTheme.colors.success}
          />
        </View>

        <Text style={styles.title}>Order Successful!</Text>
        <Text style={styles.subtitle}>
          Your order has been placed successfully
        </Text>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.replace('CustomerDashboard')}>
            <Icon name="home" size={24} color="white" />
            <Text style={styles.buttonText}>Go to Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.replace('TrackOrder')}>
            <Icon name="local-shipping" size={24} color="white" />
            <Text style={styles.buttonText}>Track Order</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appTheme.colors.primaryBackground,
    justifyContent: 'center',
    padding: 20,
  },
  content: {
    alignItems: 'center',
    backgroundColor: appTheme.colors.secondaryBackground,
    borderRadius: 20,
    padding: 32,
    elevation: 4,
  },
  iconContainer: {
    backgroundColor: 'white',
    borderRadius: 60,
    marginBottom: 24,
    elevation: 2,
  },
  title: {
    fontSize: appTheme.fontSizes.xlarge,
    fontFamily: appTheme.fontFamilies.bold,
    color: appTheme.colors.primaryText,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: appTheme.fontSizes.medium,
    color: appTheme.colors.secondaryText,
    marginBottom: 32,
    textAlign: 'center',
  },
  buttonsContainer: {
    width: '100%',
    gap: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    backgroundColor: appTheme.colors.primary,
  },

  buttonText: {
    color: 'white',
    fontSize: appTheme.fontSizes.medium,
    fontFamily: appTheme.fontFamilies.bold,
    marginLeft: 8,
  },
});

export default OrderSuccessScreen;
