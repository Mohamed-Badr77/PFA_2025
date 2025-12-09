// src/screens/auth/LoginScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { theme, getThemeColor } from '../../constants/theme';

export default function LoginScreen({ onLogin, onSignup, onBack, role }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const themeColor = getThemeColor(role);

  const handleLogin = () => {
    onLogin({});
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={{ color: theme.colors.textSecondary, fontSize: 16 }}>
            ← Choose Role
          </Text>
        </TouchableOpacity>

        <View style={styles.content}>
          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeTitle}>Hello!</Text>
            <Text style={styles.welcomeSubtitle}>
              Logging in as{' '}
              <Text style={{ color: themeColor, fontWeight: 'bold' }}>
                {role.toUpperCase()}
              </Text>
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.input}
              placeholder="name@example.com"
              placeholderTextColor={theme.colors.textTertiary}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor={theme.colors.textTertiary}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            style={[styles.buttonPrimary, { backgroundColor: themeColor }]}
            onPress={handleLogin}
          >
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>

          <View style={styles.signupPrompt}>
            <Text style={styles.linkText}>New here? </Text>
            <TouchableOpacity onPress={onSignup}>
              <Text style={{ color: themeColor, fontWeight: 'bold' }}>
                Create Account
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
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
  linkText: {
    color: theme.colors.textSecondary,
    fontSize: 15,
  },
  backButton: {
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: theme.spacing.lg,
  },
  welcomeSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  welcomeTitle: {
    fontSize: 42,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  welcomeSubtitle: {
    fontSize: 18,
    color: theme.colors.textSecondary,
    marginTop: 10,
  },
  signupPrompt: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
});