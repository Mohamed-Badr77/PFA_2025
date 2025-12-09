// src/screens/main/MessagesScreen.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { theme } from '../../constants/theme';

export default function MessagesScreen({ conversations, onSelectConversation }) {
  if (conversations.length === 0) {
    return (
      <View style={styles.centerContent}>
        <Text style={{ color: '#888', fontSize: 16 }}>No conversations yet.</Text>
        <Text style={{ color: '#666', fontSize: 14, marginTop: 10 }}>
          Start connecting with people!
        </Text>
      </View>
    );
  }

  const renderConversation = ({ item }) => {
    const otherUser = item.participants[1];

    return (
      <TouchableOpacity
        onPress={() => onSelectConversation(item)}
        style={styles.conversationRow}
      >
        <Image source={{ uri: otherUser.photo }} style={styles.avatarMedium} />
        <View style={styles.conversationInfo}>
          <Text style={styles.conversationName}>{otherUser.name}</Text>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {item.lastMessage ? item.lastMessage.text : 'New Match!'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={conversations}
      keyExtractor={(item) => item.id}
      renderItem={renderConversation}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
}

const styles = StyleSheet.create({
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarMedium: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  conversationRow: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: theme.spacing.md,
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
  },
  conversationInfo: {
    marginLeft: 15,
    flex: 1,
  },
  conversationName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  lastMessage: {
    color: '#888',
    fontSize: 14,
  },
  separator: {
    height: 1,
    backgroundColor: theme.colors.border,
  },
});