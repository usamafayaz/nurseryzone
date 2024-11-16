// components/ChatInput.js
import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {constants, getThemeColors} from '../config/constants';
import {useSelector} from 'react-redux';

const ChatInput = ({onSend, disabled}) => {
  const [input, setInput] = useState('');
  const currentTheme = useSelector(state => state.theme.theme);
  const colors = getThemeColors(currentTheme);

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
        {backgroundColor: colors.secondaryBackground},
      ]}>
      <TextInput
        style={[
          styles.input,
          {backgroundColor: colors.inputBackground, color: colors.primaryText},
        ]}
        value={input}
        onChangeText={setInput}
        placeholder="Type a message..."
        placeholderTextColor={colors.placeholderText}
        editable={!disabled}
      />
      <TouchableOpacity
        onPress={handleSend}
        style={styles.sendButton}
        disabled={disabled}>
        <Icon
          name="send"
          size={24}
          color={disabled ? colors.iconInactive : colors.primary}
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
    fontSize: constants.fontSizes.small,
  },
  sendButton: {
    marginLeft: 10,
    padding: 10,
  },
});

export default ChatInput;
