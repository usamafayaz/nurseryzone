import React from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';
import {appTheme} from '../config/constants';

const LoadingOverlay = ({visible, message = 'Logging in'}) => {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ActivityIndicator size="large" color={appTheme.colors.primary} />
        <View style={styles.messageContainer}>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.dots}>
            <Text style={styles.dot}>.</Text>
            <Text style={styles.dot}>.</Text>
            <Text style={styles.dot}>.</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  content: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  messageContainer: {
    flexDirection: 'row',
    marginTop: 16,
    alignItems: 'center',
  },
  message: {
    fontSize: appTheme.fontSizes.medium,
    color: appTheme.colors.primaryText,
    marginRight: 4,
  },
  dots: {
    flexDirection: 'row',
  },
  dot: {
    fontSize: appTheme.fontSizes.medium,
    color: appTheme.colors.primary,
    marginHorizontal: 2,
  },
});

export default LoadingOverlay;
