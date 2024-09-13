import {
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  Link,
  SplashScreen,
  useLocalSearchParams,
  useNavigation,
} from "expo-router";
import { useEffect, useState } from "react";

import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import ProductItem from "../../../components/ProductItem";
import { StatusBar } from "expo-status-bar";
import WhatsappButton from "../../../components/WhatsappButton";
import { fetchProductsWithTags } from "../../../hooks/shopify";
import { useFonts } from "expo-font";

export default function Collection() {
  const { location, collection, title, selectedLocation } =
    useLocalSearchParams();
  const [products, setProducts] = useState([]);
  const [fontLoaded, error] = useFonts({
    "24SevenType": require("../../../assets/24Seven-type.ttf"),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProductsWithTags(collection);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };
    fetchData();
  }, [collection, location]);
  useEffect(() => {
    if (error) throw error;
    if (fontLoaded) SplashScreen.hideAsync();
  }, [fontLoaded, error]);

  if (!fontLoaded && !error) return null;
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View
        className={"flex flex-row justify-between items-center bg-black h-16 "}
      >
        <Link
          href={{
            pathname: "/concierge",
            params: { selectedLocation: selectedLocation },
          }}
          style={{
            padding: 16,
            height: 64,
            width: 64,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </Link>
        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            alignItems: "center",
            paddingVertical: 8,
            zIndex: -1,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 16,
              fontFamily: "24SevenType",
              paddingVertical: 8,
            }}
          >
            {title}
          </Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{
          backgroundColor: "white",
          paddingVertical: 8,
        }}
      >
        {products.map((product) => (
          <View key={product.id}>
            <ProductItem
              product={product}
              pathname="/concierge/[collection]/[productId]"
              params={{ collection: collection }}
            />
          </View>
        ))}
      </ScrollView>
      <WhatsappButton />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
