// src/screens/main/FeedScreen.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { theme } from '../../constants/theme';

export default function FeedScreen({ posts, setPosts, themeColor }) {
  const toggleLike = (id) => {
    setPosts(
      posts.map((p) =>
        p.id === id
          ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
          : p
      )
    );
  };

  const renderPost = ({ item }) => (
    <View style={styles.feedCard}>
      <View style={styles.postHeader}>
        <Image source={{ uri: item.photo }} style={styles.avatarSmall} />
        <Text style={styles.authorName}>{item.author}</Text>
      </View>

      <Text style={styles.postContent}>{item.content}</Text>

      {item.image && (
        <Image source={{ uri: item.image }} style={styles.postImage} />
      )}

      <TouchableOpacity onPress={() => toggleLike(item.id)} style={styles.likeButton}>
        <Text style={[styles.likeText, { color: item.liked ? themeColor : '#888' }]}>
          {item.liked ? '❤️' : '🤍'} {item.likes} Likes
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id}
      renderItem={renderPost}
      contentContainerStyle={styles.listContent}
    />
  );
}

const styles = StyleSheet.create({
  avatarSmall: {
    width: 34,
    height: 34,
    borderRadius: 17,
  },
  listContent: {
    paddingBottom: theme.spacing.lg,
  },
  feedCard: {
    backgroundColor: theme.colors.card,
    margin: 10,
    borderRadius: 12,
    padding: 15,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  authorName: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  postContent: {
    color: '#fff',
    marginBottom: 10,
    fontSize: 15,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginVertical: 10,
  },
  likeButton: {
    marginTop: 5,
  },
  likeText: {
    fontSize: 14,
    fontWeight: '600',
  },
});