import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Link, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useRef, useState } from "react";

import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import MetafieldItem from "../../../../components/MetafieldItem";
import PagerView from "react-native-pager-view"; // Add the PagerView import
import { StatusBar } from "expo-status-bar";
import WhatsappButton from "../../../../components/WhatsappButton";
import { fetchSingleProduct } from "../../../../hooks/shopify";

export default function Product() {
  const { location, collection, productId } = useLocalSearchParams();
  const navigation = useNavigation();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0); // Track the current page index
  const pagerRef = useRef(null); // Reference for PagerView

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSingleProduct(productId);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [productId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const metafieldIcons = {
    capacity: { icon: FontAwesome6, iconName: "users", label: "Capacity" },
    beds: { icon: FontAwesome5, iconName: "bed", label: "Beds" },
    bathrooms: { icon: FontAwesome5, iconName: "bath", label: "Bathrooms" },
    rooms: { icon: FontAwesome5, iconName: "door-open", label: "Rooms" },
  };

  // Check if there are multiple images
  const images = product.images.edges;
  const totalImages = images.length;

  const handleNextPage = () => {
    if (currentPage < totalImages - 1) {
      setCurrentPage(currentPage + 1);
      pagerRef.current.setPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      pagerRef.current.setPage(currentPage - 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View
        className={"flex flex-row justify-between items-center bg-black h-16 "}
      >
        <Link
          href={{
            pathname: "/concierge/[collection]",
            params: { collection: collection },
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
      </View>
      <ScrollView contentContainerStyle={{ backgroundColor: "white" }}>
        {totalImages > 1 ? (
          <>
            <PagerView
              style={{ height: 300, width: "100%" }}
              ref={pagerRef}
              initialPage={0}
              onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
              layoutDirection="ltr"
              orientation="horizontal"
            >
              {images.map((image, index) => (
                <View key={index} collapsable={false}>
                  <Image
                    source={{ uri: image.node.src }}
                    style={{ width: "100%", height: 300 }}
                  />
                </View>
              ))}
            </PagerView>

            <View style={styles.paginationControls}>
              <Pressable
                onPress={handlePrevPage}
                disabled={currentPage === 0}
                style={[
                  styles.controlButton,
                  { backgroundColor: currentPage === 0 ? "#ccc" : "black" },
                ]}
              >
                <Ionicons
                  style={styles.controlButtonText}
                  name="arrow-back"
                  size={24}
                  color={"white"}
                />
              </Pressable>
              <Pressable
                onPress={handleNextPage}
                disabled={currentPage === totalImages - 1}
                style={[
                  styles.controlButton,
                  {
                    backgroundColor:
                      currentPage === totalImages - 1 ? "#ccc" : "black",
                  },
                ]}
              >
                <Ionicons
                  name="arrow-forward"
                  style={styles.controlButtonText}
                  size={24}
                  color="white"
                />
              </Pressable>
            </View>
          </>
        ) : (
          <Image
            source={{
              uri:
                images[0]?.node.src || require("../../../../assets/logo.png"),
            }}
            style={{ width: "100%", height: 300 }}
          />
        )}
        <View style={{ alignItems: "center", paddingTop: 12 }}>
          <Text
            style={{
              fontSize: 24,
              fontFamily: "24SevenType",
              textAlign: "center",
            }}
          >
            {product.title}
          </Text>
        </View>
        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            fontWeight: "500",
            paddingVertical: 8,
          }}
        >
          {product.priceRange?.minVariantPrice?.amount &&
          product.priceRange?.minVariantPrice?.amount !== "0.0"
            ? `from ${parseFloat(product.priceRange.minVariantPrice.amount)} ${
                product.priceRange.minVariantPrice.currencyCode
              }/day`
            : "Price on request"}
        </Text>
        <View
          style={{
            paddingHorizontal: 16,
            marginVertical: product.metafields ? 0 : 16,
            flexDirection: "row",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 4,
          }}
        >
          {product.metafields &&
            product.metafields.map((metafield, index) => {
              if (!metafield || !metafield.key || !metafield.value) return null;

              const { key, value } = metafield;
              const iconData = metafieldIcons[key];

              return iconData ? (
                <MetafieldItem
                  key={index}
                  icon={(props) => (
                    <iconData.icon name={iconData.iconName} {...props} />
                  )}
                  value={value}
                  label={iconData.label}
                />
              ) : null;
            })}
        </View>
        <View style={{ alignItems: "center" }}>
          <Link
            href={{
              pathname: "/concierge/[collection]/[productId]/booking",
              params: { location, collection, productId },
            }}
            key={collection.id}
            asChild
          >
            <Pressable
              style={{
                backgroundColor: "black",
                height: 50,
                width: 150,
                alignItems: "center",
                marginVertical: 0,
                borderRadius: 8,
                marginBottom: 16,
              }}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  marginVertical: "auto",
                  fontFamily: "24SevenType",
                }}
              >
                Book now
              </Text>
            </Pressable>
          </Link>
        </View>
        <Text style={{ fontSize: 16, paddingHorizontal: 16 }}>
          {product.description}
        </Text>
      </ScrollView>
      <WhatsappButton />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  paginationControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 8,
  },
  controlButton: {
    width: 100,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  controlButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
