// src/constants/theme.js
import { Dimensions } from 'react-native';

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

export const theme = {
  colors: {
    primary: '#161717',
    secondary: '#1c291d',
    accent: '#4CAF50', // Green for Mentee
    accentBlue: '#2196F3', // Blue for Mentor
    card: '#1E1E1E',
    cardLight: '#2C2C2C',
    text: '#FFFFFF',
    textSecondary: '#B0B0B0',
    textTertiary: '#666666',
    border: '#333333',
    error: '#EF5350',
    like: '#4CAF50',
    nope: '#EF5350',
  },
  spacing: {
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
  },
  typography: {
    title: {
      fontSize: 32,
      fontWeight: 'bold',
    },
    header: {
      fontSize: 28,
      fontWeight: 'bold',
    },
    subtitle: {
      fontSize: 18,
    },
    body: {
      fontSize: 16,
    },
    small: {
      fontSize: 14,
    },
  },
};

export const getThemeColor = (role) => {
  return role === 'mentor' ? theme.colors.accentBlue : theme.colors.accent;
};