// src/screens/auth/RoleSelectionScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../../constants/theme';

export default function RoleSelectionScreen({ onSelectRole }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { marginBottom: 40 }]}>MentorHub</Text>
      <Text style={styles.subtitle}>Choose your path</Text>
      
      <TouchableOpacity
        style={[styles.roleCard, { borderColor: theme.colors.accent }]}
        onPress={() => onSelectRole('mentee')}
      >
        <Text style={styles.emoji}>🎓</Text>
        <Text style={[styles.roleTitle, { color: theme.colors.accent }]}>Mentee</Text>
        <Text style={styles.roleDescription}>Find experienced mentors</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.roleCard, { borderColor: theme.colors.accentBlue, marginTop: 20 }]}
        onPress={() => onSelectRole('mentor')}
      >
        <Text style={styles.emoji}>🌟</Text>
        <Text style={[styles.roleTitle, { color: theme.colors.accentBlue }]}>Mentor</Text>
        <Text style={styles.roleDescription}>Share your expertise</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  subtitle: {
    fontSize: 18,
    color: theme.colors.textSecondary,
    marginBottom: 20,
  },
  roleCard: {
    backgroundColor: theme.colors.card,
    borderWidth: 2,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    width: '100%',
  },
  emoji: {
    fontSize: 40,
  },
  roleTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  roleDescription: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginTop: 5,
  },
});