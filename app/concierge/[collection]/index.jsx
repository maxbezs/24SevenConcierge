import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

import ProductItem from "../../../components/items/ProductItem";
import { StatusBar } from "expo-status-bar";
import WhatsappButton from "../../../components/WhatsappButton";
import { fetchProductsWithTags } from "../../../hooks/shopify";
import { useFonts } from "expo-font";
import SkeletonLoader from "../../../components/items/SkeletonLoader";
import HeaderMain from "../../../components/HeaderMain";

export default function Collection() {
  const { location, collection, title, selectedLocation } =
    useLocalSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fontLoaded, error] = useFonts({
    "24SevenType": require("../../../assets/24Seven-type.ttf"),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProductsWithTags(collection);
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products: ", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [collection, location]);

  if (!fontLoaded && !error) return null;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <HeaderMain
        href={{
          pathname: "/concierge",
          params: { selectedLocation: selectedLocation },
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 16,
            fontFamily: "24SevenType",
          }}
        >
          {title}
        </Text>
      </HeaderMain>
      <ScrollView
        contentContainerStyle={{
          backgroundColor: "white",
          paddingVertical: 8,
        }}
      >
        {loading ? (
          <>
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
          </>
        ) : (
          products.map((product) => (
            <View key={product.id}>
              <ProductItem
                product={product}
                pathname="/concierge/[collection]/[productId]"
                params={{
                  collection: collection,
                  title: title,
                  selectedLocation: selectedLocation,
                }}
              />
            </View>
          ))
        )}
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
