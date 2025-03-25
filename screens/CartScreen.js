import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CartScreen = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const fetchCart = async () => {
            let savedCart = JSON.parse(await AsyncStorage.getItem("cart")) || [];
            setCart(savedCart);
        };
        fetchCart();
    }, []);

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Cart</Text>
            <FlatList 
                data={cart}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={{ flexDirection: "row", marginBottom: 10 }}>
                        <Image source={{ uri: item.image }} style={{ width: 80, height: 80, marginRight: 10 }} />
                        <View>
                            <Text>{item.title}</Text>
                            <Text>${item.price}</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

export default CartScreen;
