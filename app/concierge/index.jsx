import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

import Banner from "../../components/Banner";
import CollectionItem from "../../components/items/CollectionItem";
import Header from "../../components/Header";
import { StatusBar } from "expo-status-bar";
import WhatsappButton from "../../components/WhatsappButton";
import { fetchAllCollections } from "../../hooks/shopify";
import { useFonts } from "expo-font";
import SkeletonLoader from "../../components/items/SkeletonLoader"; // Import the SkeletonLoader

const Concierge = () => {
  // Load the custom font
  const [fontsLoaded] = useFonts({
    "24SevenType": require("../../assets/24Seven-type.ttf"),
  });

  // State for collections
  const [allCollections, setAllCollections] = useState([]);
  const [filteredCollections, setFilteredCollections] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  // Location data
  const data = [
    { label: "Ibiza", value: "Ibiza" },
    { label: "Marbella", value: "Marbella" },
    { label: "Tenerife", value: "Tenerife" },
  ];
  const { selectedLocation } = useLocalSearchParams();

  const [value, setValue] = useState(selectedLocation || data[0].value);

  // Set selected location if provided
  useEffect(() => {
    if (selectedLocation) {
      setValue(selectedLocation);
    }
  }, [selectedLocation]);

  // Fetch collections data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllCollections();
        setAllCollections(data);
        filterCollectionsByLocation(data, value);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching collections: ", error);
        setLoading(false); // Ensure loading is set to false in case of error
      }
    };
    fetchData();
  }, []);

  // Filter collections based on location
  useEffect(() => {
    if (allCollections.length > 0) {
      filterCollectionsByLocation(allCollections, value);
    }
  }, [value]);

  const filterCollectionsByLocation = (collections, location) => {
    const filtered = collections.filter((collection) =>
      collection.title.toLowerCase().includes(location.toLowerCase())
    );
    setFilteredCollections(filtered);
  };

  // Return null if the font hasn't loaded yet
  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <Header data={data} value={value} setValue={setValue} />
      <ScrollView contentContainerStyle={styles.listContent}>
        <Banner />
        {/* Show skeleton loader while loading */}
        {loading ? (
          <>
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
          </>
        ) : (
          filteredCollections.map((item) => (
            <View key={item.id}>
              <CollectionItem collection={item} location={value} />
            </View>
          ))
        )}
      </ScrollView>
      <WhatsappButton />
    </SafeAreaView>
  );
};

export default Concierge;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  listContent: {
    backgroundColor: "white",
    paddingVertical: 8,
  },
  goldCardContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "white",
    height: 250,
  },
  goldCardPressable: {
    borderRadius: 8,
    overflow: "hidden",
    height: "100%",
  },
  goldCardText: {
    zIndex: 2,
    color: "white",
    textAlign: "center",
    position: "absolute",
    bottom: 20,
    right: 0,
    left: 0,
    fontSize: 24,
    fontFamily: "24SevenType",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
    zIndex: 1,
  },
});
