import React, { useEffect, useMemo, useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Banner from "../../components/Banner";
import Header from "../../components/Header";
import ProductItem from "../../components/items/ProductItem";
import WhatsappButton from "../../components/WhatsappButton";
import SkeletonLoader from "../../components/items/SkeletonLoader";
import { fetchProductsFromRealEstateCollection } from "../../hooks/shopify";
import { useFonts } from "expo-font";

const RealEstate = () => {
  const [fontsLoaded] = useFonts({
    "24SevenType": require("../../assets/24Seven-type.ttf"),
  });
  const [realEstateProducts, setRealEstateProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Location data
  const data = [
    { label: "Ibiza", value: "Ibiza" },
    { label: "Marbella", value: "Marbella" },
    { label: "Tenerife", value: "Tenerife" },
  ];

  const { selectedLocation } = useLocalSearchParams();
  const [location, setLocation] = useState(selectedLocation || data[0].value);

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
        const products = await fetchProductsFromRealEstateCollection();
        setRealEstateProducts(products);
      } catch (error) {
        console.error("Error fetching Real Estate products: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filtering function for products
  const filterByLocation = (product, location) =>
    product.tags.includes(location) && product.tags.includes("Real Estate");

  // Memoized filtered products based on location
  const filteredProducts = useMemo(() => {
    return realEstateProducts.filter((product) =>
      filterByLocation(product, location)
    );
  }, [realEstateProducts, location]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <Header data={data} value={location} setValue={setLocation} />
      <Banner />
      <ScrollView>
        {loading || !fontsLoaded ? (
          <>
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
          </>
        ) : (
          filteredProducts.map((product) => (
            <View key={product.id}>
              <ProductItem
                product={product}
                pathname="/real-estate/[productId]"
                params={{ selectedLocation: location }}
              />
            </View>
          ))
        )}
      </ScrollView>
      <WhatsappButton />
    </SafeAreaView>
  );
};

export default RealEstate;
