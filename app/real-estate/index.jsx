import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SplashScreen, useLocalSearchParams } from "expo-router";

import Banner from "../../components/Banner";
import Header from "../../components/Header";
import ProductItem from "../../components/ProductItem";
import WhatsappButton from "../../components/WhatsappButton";
import { fetchProductsFromRealEstateCollection } from "../../hooks/shopify";
import { useFonts } from "expo-font";

SplashScreen.preventAutoHideAsync();

const RealEstate = () => {
  // Load the custom font
  const [fontsLoaded] = useFonts({
    "24SevenType": require("../../assets/24Seven-type.ttf"),
  });

  // State for Real Estate collection products
  const [realEstateProducts, setRealEstateProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [realEstateCollectionId, setRealEstateCollectionId] = useState();

  // Location data
  const data = [
    { label: "Ibiza", value: "Ibiza" },
    { label: "Marbella", value: "Marbella" },
    { label: "Tenerife", value: "Tenerife" },
  ];
  const { selectedLocation } = useLocalSearchParams();

  const [location, setLocation] = useState(selectedLocation || data[0].value);
  const [isFocus, setIsFocus] = useState(false);
  // Set selected location if provided
  useEffect(() => {
    if (selectedLocation) {
      setLocation(selectedLocation);
    }
  }, [selectedLocation]);

  // Fetch Real Estate products data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { collectionId, products } =
          await fetchProductsFromRealEstateCollection();
        setRealEstateProducts(products);
        setRealEstateCollectionId(collectionId);
        filterProductsByLocation(products, location); // Filter by location initially
      } catch (error) {
        console.error("Error fetching Real Estate products: ", error);
      }
    };
    fetchData();
  }, []);

  // Filter Real Estate products based on location and tags
  useEffect(() => {
    if (realEstateProducts.length > 0) {
      filterProductsByLocation(realEstateProducts, location);
    }
  }, [location]);

  const filterProductsByLocation = (products, location) => {
    const filtered = products.filter(
      (product) =>
        product.tags.includes(location) && product.tags.includes("Real Estate")
    );
    setFilteredProducts(filtered);
  };

  // Hide the splash screen once the font is loaded
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Return null if the font hasn't loaded yet
  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Header
        data={data}
        value={location}
        setValue={setLocation}
        setIsFocus={setIsFocus}
      />
      <Banner />
      <ScrollView
        contentContainerStyle={{
          backgroundColor: "white",
          paddingVertical: 8,
        }}
      >
        {filteredProducts.map((product) => (
          <View key={product.id}>
            <ProductItem
              product={product}
              pathname="/real-estate/[productId]"
              params={{ selectedLocation: location }}
            />
          </View>
        ))}
      </ScrollView>
      <WhatsappButton />
    </SafeAreaView>
  );
};

export default RealEstate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
