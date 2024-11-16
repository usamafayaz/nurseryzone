import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {appTheme} from '../config/constants';

const InputField = ({
  label,
  iconName,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType = 'default',
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, {color: appTheme.colors.secondaryText}]}>
        {label}
      </Text>
      <View
        style={[
          styles.inputWrapper,
          {backgroundColor: appTheme.colors.inputBackground},
          error && [
            styles.inputWrapperError,
            {borderColor: appTheme.colors.error},
          ],
        ]}>
        <Icon
          name={iconName}
          size={20}
          color={appTheme.colors.secondaryText}
          style={styles.inputIcon}
        />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={appTheme.colors.placeholderText}
          secureTextEntry={secureTextEntry && !showPassword}
          keyboardType={keyboardType}
          style={[styles.input, {color: appTheme.colors.primaryText}]}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={togglePassword}>
            <Icon
              name={showPassword ? 'visibility-off' : 'visibility'}
              size={20}
              color={appTheme.colors.secondaryText}
              style={styles.statusIcon}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <Text style={[styles.errorText, {color: appTheme.colors.error}]}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: appTheme.fontSizes.small,
    fontFamily: appTheme.fontFamilies.regular,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  inputWrapperError: {
    borderWidth: 0.8,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: appTheme.fontSizes.medium,
    fontFamily: appTheme.fontFamilies.regular,
  },
  statusIcon: {
    marginLeft: 10,
  },
  errorText: {
    fontSize: appTheme.fontSizes.small,
    marginTop: 4,
  },
});

export default InputField;
