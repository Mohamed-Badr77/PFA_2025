// src/App.js
import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';

// Utils & Generators
import { generateProfiles, generatePosts, generateMockUser } from './utils/generators';

// Screens
import RoleSelectionScreen from './screens/auth/RoleSelectionScreen';
import LoginScreen from './screens/auth/LoginScreen';
import SignupScreen from './screens/auth/SignupScreen';
import MainApp from './screens/MainApp';

export default function App() {
  // Navigation State
  const [currentScreen, setCurrentScreen] = useState('roleSelection');
  const [userRole, setUserRole] = useState(null);
  const [user, setUser] = useState(null);

  // Data State
  const [profiles, setProfiles] = useState([]);
  const [posts, setPosts] = useState(generatePosts());
  const [conversations, setConversations] = useState([]);
  const [matches, setMatches] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);

  // Generate profiles when role is selected
  useEffect(() => {
    if (userRole) {
      setProfiles(generateProfiles(userRole));
    }
  }, [userRole]);

  // Update conversation with new message
  const updateConversationState = (convId, newMsg) => {
    setConversations((prevConvs) => {
      const updatedConvs = prevConvs.map((c) =>
        c.id === convId
          ? { ...c, messages: [...c.messages, newMsg], lastMessage: newMsg }
          : c
      );

      if (selectedConversation && selectedConversation.id === convId) {
        const activeConv = updatedConvs.find((c) => c.id === convId);
        setSelectedConversation(activeConv);
      }
      return updatedConvs;
    });
  };

  // Handle sending a message
  const handleSendMessage = (conversationId, message) => {
    updateConversationState(conversationId, message);
    // Simulate reply
    setTimeout(() => {
      const replyMsg = {
        id: `msg-${Date.now()}-reply`,
        text: "That sounds interesting! Let's discuss.",
        sender: 'other',
        timestamp: new Date().toISOString(),
      };
      updateConversationState(conversationId, replyMsg);
    }, 1500);
  };

  // Handle profile match
  const handleMatch = (profile) => {
    const newMatch = { id: `match-${Date.now()}`, profile };
    setMatches([newMatch, ...matches]);
    const newConv = {
      id: newMatch.id,
      participants: [user, profile],
      messages: [],
      lastMessage: null,
    };
    setConversations([newConv, ...conversations]);
    Alert.alert('Match!', `You connected with ${profile.name}`);
  };

  // Handle profile update
  const handleProfileUpdate = (updatedData) => {
    setUser(updatedData);
    Alert.alert('Success', 'Your profile has been updated!');
  };

  // Navigation Handlers
  const handleRoleSelection = (role) => {
    setUserRole(role);
    setCurrentScreen('login');
  };

  const handleLogin = () => {
    setUser(generateMockUser(userRole));
    setCurrentScreen('main');
  };

  const handleSignup = (userData) => {
    setUser(userData);
    setCurrentScreen('main');
  };

  const handleLogout = () => {
    setUser(null);
    setUserRole(null);
    setCurrentScreen('roleSelection');
  };

  // Screen Routing
  if (currentScreen === 'roleSelection') {
    return <RoleSelectionScreen onSelectRole={handleRoleSelection} />;
  }

  if (currentScreen === 'login') {
    return (
      <LoginScreen
        role={userRole}
        onLogin={handleLogin}
        onSignup={() => setCurrentScreen('signup')}
        onBack={() => setCurrentScreen('roleSelection')}
      />
    );
  }

  if (currentScreen === 'signup') {
    return (
      <SignupScreen
        role={userRole}
        onSignup={handleSignup}
        onBack={() => setCurrentScreen('login')}
      />
    );
  }

  // Main App
  return (
    <MainApp
      user={user}
      role={userRole}
      profiles={profiles}
      posts={posts}
      setPosts={setPosts}
      conversations={conversations}
      matches={matches}
      selectedConversation={selectedConversation}
      setSelectedConversation={setSelectedConversation}
      onMatch={handleMatch}
      onLogout={handleLogout}
      onSendMessage={handleSendMessage}
      onProfileUpdate={handleProfileUpdate}
    />
  );
}