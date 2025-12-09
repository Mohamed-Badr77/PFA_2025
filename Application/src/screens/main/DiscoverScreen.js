// src/screens/main/DiscoverScreen.js
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  PanResponder,
  StyleSheet,
} from 'react-native';
import { theme, SCREEN_WIDTH } from '../../constants/theme';

export default function DiscoverScreen({ profiles, onMatch, themeColor }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const position = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > 120) {
          forceSwipe('right');
        } else if (gesture.dx < -120) {
          forceSwipe('left');
        } else {
          resetPosition();
        }
      },
    })
  ).current;

  const forceSwipe = (direction) => {
    const x = direction === 'right' ? SCREEN_WIDTH + 100 : -SCREEN_WIDTH - 100;
    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: 250,
      useNativeDriver: false,
    }).start(() => {
      if (direction === 'right') {
        onMatch(profiles[currentIndex]);
      }
      position.setValue({ x: 0, y: 0 });
      setCurrentIndex((i) => i + 1);
    });
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  };

  const rotate = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
  });

  if (currentIndex >= profiles.length) {
    return (
      <View style={styles.centerContent}>
        <Text style={{ color: '#fff', fontSize: 18 }}>No more profiles.</Text>
      </View>
    );
  }

  const currentProfile = profiles[currentIndex];
  const cardWidth = SCREEN_WIDTH - 30;
  const cardHeight = '90%';

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, marginBottom: 15 }}>
        {profiles.slice(currentIndex, currentIndex + 2).reverse().map((profile, index, array) => {
          const isTop = index === array.length - 1;

          const cardStyle = {
            position: 'absolute',
            width: cardWidth,
            height: cardHeight,
            left: 15,
            top: 15,
          };

          return (
            <Animated.View
              key={profile.id}
              {...(isTop ? panResponder.panHandlers : {})}
              style={[
                styles.swipeCard,
                cardStyle,
                isTop
                  ? {
                      transform: [
                        { translateX: position.x },
                        { translateY: position.y },
                        { rotate },
                      ],
                    }
                  : { top: 25, transform: [{ scale: 0.95 }] },
              ]}
            >
              {/* Image Area */}
              <View style={styles.imageArea}>
                <Image source={{ uri: profile.photo }} style={styles.image} />

                {/* Gradient Overlay */}
                <View style={styles.overlay}>
                  <Text style={styles.name}>
                    {profile.name}, {profile.role === 'Mentor' ? 'M' : 'E'}
                  </Text>
                  <Text style={styles.location}>{profile.location}</Text>
                </View>
              </View>

              {/* Content Footer */}
              <View style={styles.contentFooter}>
                {/* Stats Row */}
                <View style={styles.statsRow}>
                  <View style={styles.statBox}>
                    <Text style={styles.statIcon}>💼</Text>
                    <Text style={styles.statText}>{profile.sector}</Text>
                  </View>
                  <View style={styles.statBox}>
                    <Text style={styles.statIcon}>⏳</Text>
                    <Text style={styles.statText}>{profile.experience} Yrs</Text>
                  </View>
                </View>

                {/* Bio */}
                <View style={{ marginTop: theme.spacing.md }}>
                  <Text style={styles.bioLabel}>📝 Bio</Text>
                  <Text style={styles.bioText} numberOfLines={3}>
                    {profile.bio.replace(/\*\*/g, '')}
                  </Text>
                </View>
              </View>
            </Animated.View>
          );
        })}
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: theme.colors.nope }]}
          onPress={() => forceSwipe('left')}
          disabled={currentIndex >= profiles.length}
        >
          <Text style={styles.actionButtonText}>❌ Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: theme.colors.like }]}
          onPress={() => forceSwipe('right')}
          disabled={currentIndex >= profiles.length}
        >
          <Text style={styles.actionButtonText}>🤝 Connect</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 0,
  },
  swipeCard: {
    backgroundColor: theme.colors.card,
    overflow: 'hidden',
    borderRadius: theme.borderRadius.xl,
  },
  imageArea: {
    height: '70%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: theme.spacing.lg,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  location: {
    fontSize: 16,
    color: theme.colors.textSecondary,
  },
  contentFooter: {
    padding: theme.spacing.lg,
    height: '30%',
    justifyContent: 'space-between',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    paddingBottom: theme.spacing.md,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statIcon: {
    fontSize: 24,
    marginBottom: theme.spacing.sm,
  },
  statText: {
    color: theme.colors.text,
    fontWeight: 'bold',
    fontSize: 14,
  },
  bioLabel: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    opacity: 0.8,
  },
  bioText: {
    color: theme.colors.textSecondary,
    marginTop: 5,
    fontSize: 14,
    fontStyle: 'italic',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  actionButton: {
    padding: theme.spacing.md,
    borderRadius: 50,
    flex: 1,
    marginHorizontal: theme.spacing.sm,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  actionButtonText: {
    color: theme.colors.text,
    fontWeight: 'bold',
    fontSize: 16,
  },
});