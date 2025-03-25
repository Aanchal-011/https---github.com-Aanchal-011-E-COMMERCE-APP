import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DetailsScreen = ({ route }) => {
    const { item } = route.params;

    const addToCart = async () => {
        let cart = JSON.parse(await AsyncStorage.getItem("cart")) || [];
        cart.push(item);
        await AsyncStorage.setItem("cart", JSON.stringify(cart));
        alert("Added to Cart!");
    };

    return (
        <View style={{ padding: 20 }}>
            <Image source={{ uri: item.image }} style={{ width: 150, height: 150, alignSelf: "center" }} />
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text style={{ fontSize: 18, color: "green" }}>${item.price}</Text>
            <TouchableOpacity onPress={addToCart} style={{ padding: 10, backgroundColor: "blue", marginTop: 10 }}>
                <Text style={{ color: "white", textAlign: "center" }}>Add to Cart</Text>
            </TouchableOpacity>
        </View>
    );
};

export default DetailsScreen;
