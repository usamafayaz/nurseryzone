import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {appTheme} from '../config/constants'; // Assuming constants contains the colors

const ChatInput = ({onSend, disabled}) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() !== '') {
      onSend(input);
      setInput('');
    }
  };

  return (
    <View
      style={[
        styles.inputContainer,
        {backgroundColor: appTheme.colors.secondaryBackground},
      ]}>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: appTheme.colors.inputBackground,
            color: appTheme.colors.primaryText,
          },
        ]}
        value={input}
        onChangeText={setInput}
        placeholder="Type a message..."
        placeholderTextColor={appTheme.colors.placeholderText}
        editable={!disabled}
      />
      <TouchableOpacity
        onPress={handleSend}
        style={styles.sendButton}
        disabled={disabled}>
        <Icon
          name="send"
          size={24}
          color={
            disabled ? appTheme.colors.iconInactive : appTheme.colors.primary
          }
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginTop: 5,
  },
  input: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: appTheme.fontSizes.small,
  },
  sendButton: {
    marginLeft: 10,
    padding: 10,
  },
});

export default ChatInput;
