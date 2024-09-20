import { SafeAreaView, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import PagerViewComponent from "../../../components/product-page-components/PagerViewComponent";
import ProductDetails from "../../../components/product-page-components/ProductDetails";
import HeaderMain from "../../../components/HeaderMain";
import ProductPageSkeleton from "../../../components/product-page-components/ProductPageSkeleton";
import WhatsappButton from "../../../components/WhatsappButton";
import { fetchSingleProduct } from "../../../hooks/shopify";

export default function Product() {
  const { selectedLocation, productId } = useLocalSearchParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

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
    return <ProductPageSkeleton />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <HeaderMain
        href={{ pathname: "/real-estate", params: { selectedLocation } }}
      />
      <ScrollView contentContainerStyle={{ backgroundColor: "white" }}>
        <PagerViewComponent images={product.images.edges} />
        <ProductDetails
          product={product}
          hrefBooking={{
            pathname: "/real-estate/[productId]/booking",
            params: { productId: product.id, selectedLocation },
          }}
        />
      </ScrollView>
      <WhatsappButton />
    </SafeAreaView>
  );
}
