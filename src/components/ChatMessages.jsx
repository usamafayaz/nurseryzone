import React, {useRef, useEffect} from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Clipboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-toast-message';
import {constants, getThemeColors} from '../config/constants';
import LottieView from 'lottie-react-native';
import {useSelector} from 'react-redux';

const ChatMessages = ({messages, onMessageLongPress, isLoading}) => {
  const flatListRef = useRef(null);
  const currentTheme = useSelector(state => state.theme.theme);
  const colors = getThemeColors(currentTheme);

  useEffect(() => {
    if (flatListRef.current && messages.length > 0) {
      flatListRef.current.scrollToEnd({animated: true});
    }
  }, [messages, isLoading]);

  const renderFormattedText = text => {
    const lines = text.split('\n');
    let inCodeBlock = false;
    let codeContent = '';

    return lines.map((line, lineIndex) => {
      const numberedHeadingMatch = line.match(/^(\d+\.) \*\*(.*?)\*\*/);

      if (numberedHeadingMatch) {
        const [_, number, headingText] = numberedHeadingMatch;
        return (
          <Text
            allowFontScaling={false}
            key={lineIndex}
            style={[
              styles.subheading,
              styles.marginBottom,
              {color: colors.primaryText},
            ]}>
            {number} {headingText}
          </Text>
        );
      }

      if (line.trim() === '```') {
        if (inCodeBlock) {
          const content = codeContent;
          codeContent = '';
          inCodeBlock = false;
          return (
            <View
              key={lineIndex}
              style={[
                styles.codeBlock,
                styles.marginBottom,
                {backgroundColor: colors.codeBlockBackground},
              ]}>
              <View style={styles.codeContent}>
                <Text
                  allowFontScaling={false}
                  style={[styles.codeText, {color: colors.primaryText}]}>
                  {content}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.copyButton}
                onPress={() => {
                  Clipboard.setString(content);
                  Toast.show({
                    type: 'success',
                    position: 'bottom',
                    text1: 'Copied to clipboard',
                    visibilityTime: 2000,
                    autoHide: true,
                  });
                }}>
                <Icon
                  name="content-copy"
                  size={20}
                  color={colors.iconInactive}
                />
              </TouchableOpacity>
            </View>
          );
        } else {
          inCodeBlock = true;
          return null;
        }
      }

      if (inCodeBlock) {
        codeContent += line + '\n';
        return null;
      }

      const parts = line.split(/(\*\*\*.*?\*\*\*|\*\*.*?\*\*|\*.*?\*)/);

      return parts
        .filter(part => part.trim())
        .map((part, partIndex) => {
          part = part.trim();

          if (part.startsWith('***') && part.endsWith('***')) {
            return (
              <Text
                allowFontScaling={false}
                key={`${lineIndex}-${partIndex}`}
                style={[
                  styles.heading,
                  styles.marginBottom,
                  {color: colors.primaryText},
                ]}>
                {part.slice(3, -3).trim()}
              </Text>
            );
          } else if (part.startsWith('**') && part.endsWith('**')) {
            return (
              <Text
                allowFontScaling={false}
                key={`${lineIndex}-${partIndex}`}
                style={[
                  styles.subheading,
                  styles.marginBottom,
                  {color: colors.primaryText},
                ]}>
                {part.slice(2, -2).trim()}
              </Text>
            );
          } else if (part.startsWith('*') && part.endsWith('*')) {
            return (
              <Text
                allowFontScaling={false}
                key={`${lineIndex}-${partIndex}`}
                style={[styles.italic, {color: colors.primary}]}>
                {part.slice(1, -1).trim()}
              </Text>
            );
          } else {
            return (
              <Text
                allowFontScaling={false}
                key={`${lineIndex}-${partIndex}`}
                style={[styles.bodyText, {color: colors.secondaryText}]}>
                {part}
              </Text>
            );
          }
        });
    });
  };

  const renderItem = ({item: message}) => {
    if (message.isLoading) {
      return (
        <View
          style={[
            styles.messageBubble,
            styles.aiMessage,
            {backgroundColor: colors.messageBubbleAI, paddingVertical: 0},
          ]}>
          <LottieView
            source={require('../assets/animations/loading.json')}
            autoPlay
            loop
            style={styles.loadingLottie}
          />
        </View>
      );
    }

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onLongPress={() => onMessageLongPress(message.text)}
        delayLongPress={500}>
        <View
          style={[
            styles.messageBubble,
            message.user
              ? [
                  styles.userMessage,
                  {backgroundColor: colors.messageBubbleUser},
                ]
              : [styles.aiMessage, {backgroundColor: colors.messageBubbleAI}],
          ]}>
          {renderFormattedText(message.text)}
        </View>
      </TouchableOpacity>
    );
  };

  const messagesWithLoading = [
    ...messages,
    ...(isLoading ? [{id: 'loading', isLoading: true}] : []),
  ];

  return (
    <FlatList
      windowSize={20}
      ref={flatListRef}
      data={messagesWithLoading}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      style={styles.messagesContainer}
      showsVerticalScrollIndicator={false}
      onContentSizeChange={() =>
        flatListRef.current?.scrollToEnd({animated: true})
      }
      onLayout={() => flatListRef.current?.scrollToEnd({animated: true})}
    />
  );
};

const styles = StyleSheet.create({
  messagesContainer: {
    flex: 1,
    padding: 10,
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    marginBottom: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
  },
  aiMessage: {
    alignSelf: 'flex-start',
  },
  heading: {
    fontSize: constants.fontSizes.xlarge,
    fontWeight: 'bold',
  },
  subheading: {
    fontSize: constants.fontSizes.medium,
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginVertical: 10,
  },
  bodyText: {
    fontSize: constants.fontSizes.small,
    lineHeight: 24,
  },
  italic: {
    fontStyle: 'italic',
    fontSize: constants.fontSizes.small,
  },
  codeBlock: {
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  codeContent: {
    flex: 1,
    padding: 12,
  },
  codeText: {
    fontFamily: constants.fontFamilies.monospace,
    fontSize: constants.fontSizes.small - 3,
  },
  copyButton: {
    padding: 8,
    marginRight: 4,
    alignSelf: 'flex-end',
  },
  marginBottom: {
    marginBottom: 10,
  },
  loadingLottie: {height: 40, width: 40},
});

export default React.memo(ChatMessages);
