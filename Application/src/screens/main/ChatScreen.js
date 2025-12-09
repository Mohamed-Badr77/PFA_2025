// src/screens/main/ChatScreen.js
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  StyleSheet,
} from 'react-native';
import { theme } from '../../constants/theme';

export default function ChatScreen({ conversation, user, onBack, onSendMessage, themeColor }) {
  const [text, setText] = useState('');
  const flatListRef = useRef();

  const handleSend = () => {
    if (!text.trim()) return;
    onSendMessage(conversation.id, {
      id: `msg-${Date.now()}`,
      text,
      sender: user.id,
      timestamp: new Date().toISOString(),
    });
    setText('');
    Keyboard.dismiss();
  };

  const otherUser =
    conversation.participants.find((p) => p.id !== user.id) || conversation.participants[1];

  const renderMessage = ({ item }) => {
    const isMyMessage = item.sender === user.id;
    return (
      <View
        style={[
          styles.messageBubble,
          isMyMessage
            ? { alignSelf: 'flex-end', backgroundColor: themeColor }
            : { alignSelf: 'flex-start', backgroundColor: theme.colors.cardLight },
        ]}
      >
        <Text style={{ color: '#fff' }}>{item.text}</Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      {/* Chat Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Text style={{ color: themeColor, fontSize: 18, marginRight: 10 }}>←</Text>
        </TouchableOpacity>
        <Image source={{ uri: otherUser.photo }} style={styles.avatarSmall} />
        <Text style={{ color: '#fff', fontWeight: 'bold', marginLeft: 10 }}>
          {otherUser.name}
        </Text>
      </View>

      {/* Messages List */}
      <FlatList
        ref={flatListRef}
        data={conversation.messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
        renderItem={renderMessage}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Say Hello! 👋</Text>
        }
      />

      {/* Input Bar */}
      <View style={styles.inputBar}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Type a message..."
          placeholderTextColor="#666"
        />
        <TouchableOpacity onPress={handleSend}>
          <Text style={{ color: themeColor, fontWeight: 'bold', marginLeft: 10 }}>
            Send
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  avatarSmall: {
    width: 34,
    height: 34,
    borderRadius: 17,
  },
  header: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: theme.colors.card,
    alignItems: 'center',
  },
  messagesList: {
    padding: theme.spacing.md,
  },
  messageBubble: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 10,
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
    fontSize: 16,
  },
  inputBar: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: theme.colors.card,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: theme.colors.cardLight,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: '#fff',
  },
});