import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import constants from '../config/constants';
import LottieView from 'lottie-react-native';

const LoadingIndicator = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prevDots => {
        if (prevDots.length >= 3) return '.';
        return prevDots + '.';
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text} allowFontScaling={false}></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
  },
  text: {
    color: constants.colors.loadingText,
    fontSize: constants.fontSizes.small,
  },
});

export default LoadingIndicator;
