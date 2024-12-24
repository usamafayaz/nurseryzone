import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Modal} from 'react-native';
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
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalWrapper}>
          <Text style={styles.modalHeaderStyle}>Change IP Address</Text>
          <Text style={styles.hintText}>Current IP: {currentIP}</Text>
          <Text style={[styles.hintText, {marginTop: 20}]}>IP Address:</Text>

          <InputField
            placeholder="Enter IP Address"
            value={apiAddress}
            onChangeText={onChangeApiAddress}
            iconName="lock"
          />
          <View style={styles.modalButtonWrapper}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.cancelStyle}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onSave}>
              <Text style={styles.OKStyle}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalWrapper: {
    backgroundColor: appTheme.colors.primaryBackground,
    borderRadius: 16,
    padding: 20,
    width: '90%',
    elevation: 5,
  },
  modalHeaderStyle: {
    fontSize: appTheme.fontSizes.large,
    fontFamily: appTheme.fontFamilies.bold,
    color: appTheme.colors.primary,
    marginBottom: 20,
  },
  modalButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  cancelStyle: {
    color: appTheme.colors.secondaryText,
    marginRight: 20,
    paddingVertical: 10,
    fontSize: appTheme.fontSizes.medium,
    fontFamily: appTheme.fontFamilies.bold,
  },
  OKStyle: {
    color: appTheme.colors.primaryBackground,
    backgroundColor: appTheme.colors.primary,
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: appTheme.fontSizes.medium,
    fontFamily: appTheme.fontFamilies.bold,
  },
  hintText: {
    color: appTheme.colors.secondaryText,
    fontSize: appTheme.fontSizes.medium,
    fontFamily: appTheme.fontFamilies.regular,
    marginBottom: 10,
  },
});

export default IPAddressModal;
