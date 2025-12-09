// src/screens/MainApp.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import { theme, getThemeColor } from '../constants/theme';

// Import screens
import DiscoverScreen from './main/DiscoverScreen';
import FeedScreen from './main/FeedScreen';
import MessagesScreen from './main/MessagesScreen';
import ChatScreen from './main/ChatScreen';
import ProfileScreen from './main/ProfileScreen';

export default function MainApp(props) {
  const [activeTab, setActiveTab] = useState('discover');
  const themeColor = getThemeColor(props.role);

  const renderContent = () => {
    switch (activeTab) {
      case 'discover':
        return (
          <DiscoverScreen
            profiles={props.profiles}
            onMatch={props.onMatch}
            themeColor={themeColor}
          />
        );
      case 'feed':
        return (
          <FeedScreen
            posts={props.posts}
            setPosts={props.setPosts}
            themeColor={themeColor}
          />
        );
      case 'messages':
        return props.selectedConversation ? (
          <ChatScreen
            conversation={props.selectedConversation}
            user={props.user}
            themeColor={themeColor}
            onBack={() => props.setSelectedConversation(null)}
            onSendMessage={props.onSendMessage}
          />
        ) : (
          <MessagesScreen
            conversations={props.conversations}
            onSelectConversation={props.setSelectedConversation}
          />
        );
      case 'profile':
        return (
          <ProfileScreen
            user={props.user}
            onLogout={props.onLogout}
            onProfileUpdate={props.onProfileUpdate}
            themeColor={themeColor}
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      {(!props.selectedConversation || activeTab !== 'messages') && (
        <View style={styles.headerBar}>
          <Text style={styles.headerTitle}>{activeTab.toUpperCase()}</Text>
        </View>
      )}

      {/* Main Content */}
      <View style={{ flex: 1 }}>{renderContent()}</View>

      {/* Tab Bar */}
      {!props.selectedConversation && (
        <View style={styles.tabBar}>
          {[
            { key: 'discover', icon: '🔍' },
            { key: 'feed', icon: '📰' },
            { key: 'messages', icon: '💬' },
            { key: 'profile', icon: '👤' },
          ].map((tab) => (
            <TouchableOpacity
              key={tab.key}
              onPress={() => setActiveTab(tab.key)}
              style={styles.tabItem}
            >
              <Text style={{ fontSize: 24, opacity: activeTab === tab.key ? 1 : 0.5 }}>
                {tab.icon}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  headerBar: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: theme.colors.card,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
  },
});