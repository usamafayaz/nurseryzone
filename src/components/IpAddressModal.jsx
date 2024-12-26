import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Animated,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import InputField from './InputField';
import {appTheme} from '../config/constants';

const IPAddressModal = ({
  visible,
  onClose,
  onSave,
  currentIP,
  apiAddress,
  onChangeApiAddress,
}) => {
  const scaleValue = new Animated.Value(0);
  const opacityValue = new Animated.Value(0);

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scaleValue, {
          toValue: 1,
          friction: 7,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.timing(opacityValue, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(scaleValue, {
          toValue: 0,
          friction: 7,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.timing(opacityValue, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const dismissKeyboard = () => {
    onClose();
    Keyboard.dismiss();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="none"
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.modalOverlay}>
          <Animated.View
            style={[
              styles.modalWrapper,
              {
                transform: [{scale: scaleValue}],
                opacity: opacityValue,
              },
            ]}>
            <View style={styles.headerContainer}>
              <Icon name="settings" size={24} color={appTheme.colors.primary} />
              <Text style={styles.modalHeaderStyle}>Change IP Address</Text>
            </View>

            <View style={styles.currentIPContainer}>
              <Icon
                name="wifi"
                size={20}
                color={appTheme.colors.secondaryText}
              />
              <Text style={styles.currentIPLabel}>Current IP:</Text>
              <Text style={styles.currentIPValue}>{currentIP}</Text>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>New IP Address:Port</Text>
              <InputField
                placeholder="Enter IP Address (e.g., 192.168.1.1:8080)"
                value={apiAddress}
                onChangeText={onChangeApiAddress}
                iconName="router"
                containerStyle={styles.inputField}
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.modalButtonWrapper}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={onClose}
                activeOpacity={0.7}>
                <Text style={styles.cancelStyle}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={onSave}
                activeOpacity={0.7}>
                <Text style={styles.saveText}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalWrapper: {
    backgroundColor: appTheme.colors.primaryBackground,
    borderRadius: 20,
    padding: 24,
    width: width * 0.9,
    maxWidth: 400,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalHeaderStyle: {
    fontSize: appTheme.fontSizes.large,
    fontFamily: appTheme.fontFamilies.bold,
    color: appTheme.colors.primary,
    marginLeft: 12,
  },
  currentIPContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: appTheme.colors.primaryBackground,
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: appTheme.colors.primary + '20',
  },
  currentIPLabel: {
    color: appTheme.colors.secondaryText,
    fontSize: appTheme.fontSizes.medium,
    fontFamily: appTheme.fontFamilies.regular,
    marginLeft: 8,
  },
  currentIPValue: {
    color: appTheme.colors.primary,
    fontSize: appTheme.fontSizes.medium,
    fontFamily: appTheme.fontFamilies.bold,
    marginLeft: 8,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    color: appTheme.colors.secondaryText,
    fontSize: appTheme.fontSizes.medium,
    fontFamily: appTheme.fontFamilies.medium,
    marginBottom: 8,
  },
  inputField: {
    marginTop: 8,
  },
  divider: {
    height: 1,
    backgroundColor: appTheme.colors.primary + '20',
    marginVertical: 16,
  },
  modalButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 8,
  },
  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 12,
  },
  cancelStyle: {
    color: appTheme.colors.secondaryText,
    fontSize: appTheme.fontSizes.medium,
    fontFamily: appTheme.fontFamilies.bold,
  },
  saveButton: {
    backgroundColor: appTheme.colors.primary,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    elevation: 2,
    shadowColor: appTheme.colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  saveText: {
    color: appTheme.colors.primaryBackground,
    fontSize: appTheme.fontSizes.medium,
    fontFamily: appTheme.fontFamilies.bold,
  },
});

export default IPAddressModal;
