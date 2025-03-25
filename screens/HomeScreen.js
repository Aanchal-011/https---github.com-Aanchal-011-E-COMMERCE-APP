import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, TextInput } from "react-native";
import axios from "axios";

const HomeScreen = ({ navigation }) => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        axios.get("https://fakestoreapi.com/products")
            .then(res => setProducts(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <View style={{ padding: 10 }}>
            <TextInput 
                placeholder="Search products..."
                style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
                onChangeText={setSearch}
            />
            <FlatList 
                data={products.filter(p => p.title.toLowerCase().includes(search.toLowerCase()))}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate("Details", { item })}>
                        <View style={{ flexDirection: "row", marginBottom: 10 }}>
                            <Image source={{ uri: item.image }} style={{ width: 80, height: 80, marginRight: 10 }} />
                            <View>
                                <Text>{item.title}</Text>
                                <Text>${item.price}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

export default HomeScreen;
