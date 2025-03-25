import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WishlistScreen = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    let wishlist = JSON.parse(await AsyncStorage.getItem('wishlist')) || [];
    setWishlist(wishlist);
  };

  const removeFromWishlist = async (productId) => {
    let updatedWishlist = wishlist.filter(item => item.id !== productId);
    await AsyncStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    setWishlist(updatedWishlist);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={wishlist}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.price}>${item.price}</Text>
            <TouchableOpacity style={styles.button} onPress={() => removeFromWishlist(item.id)}>
              <Text style={styles.buttonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  productCard: { padding: 10, borderWidth: 1, borderRadius: 10, alignItems: 'center', marginBottom: 10 },
  image: { width: 100, height: 100, resizeMode: 'contain' },
  title: { fontSize: 14, fontWeight: 'bold', marginTop: 5 },
  price: { fontSize: 16, color: 'green', marginTop: 5 },
  button: { backgroundColor: 'red', padding: 10, borderRadius: 5, marginTop: 5 },
  buttonText: { color: 'white', textAlign: 'center' }
});

export default WishlistScreen;
