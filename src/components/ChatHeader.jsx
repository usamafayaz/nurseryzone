import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {toggleTheme} from '../redux/themeSlice';
import {getThemeColors, constants} from '../config/constants';

const ChatHeader = () => {
  const dispatch = useDispatch();
  const currentTheme = useSelector(state => state.theme.theme);
  const colors = getThemeColors(currentTheme);

  return (
    <View
      style={[styles.header, {backgroundColor: colors.secondaryBackground}]}>
      <TouchableOpacity style={styles.iconLeft}>
        <Icon name="menu" size={30} color={colors.iconInactive} />
      </TouchableOpacity>
      <Text
        allowFontScaling={false}
        style={[styles.headerText, {color: colors.primaryText}]}>
        AI Chat Bot
      </Text>
      <TouchableOpacity
        style={styles.iconRight}
        onPress={() => dispatch(toggleTheme())}>
        <Icon
          name={currentTheme === 'dark' ? 'dark-mode' : 'light-mode'}
          size={30}
          color={colors.iconInactive}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  headerText: {
    fontSize: constants.fontSizes.large,
    fontWeight: 'bold',
    fontFamily: constants.fontFamilies.bold,
    fontStyle: 'italic',
  },
  iconLeft: {
    position: 'absolute',
    left: 15,
  },
  iconRight: {
    position: 'absolute',
    right: 15,
  },
});

export default ChatHeader;
