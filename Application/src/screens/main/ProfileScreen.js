// src/screens/main/ProfileScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { theme } from '../../constants/theme';

export default function ProfileScreen({ user, onLogout, onProfileUpdate, themeColor }) {
  const [editableUser, setEditableUser] = useState(user);

  const handleChange = (key, value) => {
    setEditableUser((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    onProfileUpdate(editableUser);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <Image source={{ uri: editableUser.photo }} style={styles.profilePhoto} />
          <Text style={styles.profileName}>{editableUser.name}</Text>
          <Text style={[styles.roleLabel, { color: themeColor }]}>
            {editableUser.role.toUpperCase()}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Personalize Profile</Text>

        {/* Editable Fields */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={editableUser.name}
            onChangeText={(text) => handleChange('name', text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Sector/Expertise</Text>
          <TextInput
            style={styles.input}
            value={editableUser.sector}
            onChangeText={(text) => handleChange('sector', text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Location</Text>
          <TextInput
            style={styles.input}
            value={editableUser.location}
            onChangeText={(text) => handleChange('location', text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Years of Experience</Text>
          <TextInput
            style={styles.input}
            value={String(editableUser.experience)}
            onChangeText={(text) => handleChange('experience', Number(text) || 0)}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Biography</Text>
          <TextInput
            style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
            value={editableUser.bio}
            onChangeText={(text) => handleChange('bio', text)}
            multiline
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity
          style={[
            styles.buttonPrimary,
            { backgroundColor: themeColor, marginTop: theme.spacing.lg },
          ]}
          onPress={handleSave}
        >
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>

        {/* Logout Button */}
        <TouchableOpacity
          onPress={onLogout}
          style={[
            styles.buttonPrimary,
            {
              backgroundColor: theme.colors.card,
              borderWidth: 1,
              borderColor: theme.colors.error,
              marginTop: theme.spacing.md,
            },
          ]}
        >
          <Text style={{ color: theme.colors.error, fontWeight: 'bold' }}>Log Out</Text>
        </TouchableOpacity>

        <View style={{ height: theme.spacing.xl }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  inputContainer: {
    marginBottom: theme.spacing.md,
  },
  label: {
    color: theme.colors.textSecondary,
    marginBottom: 8,
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '600',
  },
  input: {
    backgroundColor: theme.colors.cardLight,
    borderRadius: 12,
    padding: 16,
    color: theme.colors.text,
    fontSize: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  buttonPrimary: {
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  scrollContent: {
    padding: theme.spacing.lg,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  roleLabel: {
    fontWeight: 'bold',
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
});