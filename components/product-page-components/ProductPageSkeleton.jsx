import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";

import { StatusBar } from "expo-status-bar";
import HeaderMain from "../HeaderMain";
import WhatsappButton from "../WhatsappButton";

const ProductPageSkeleton = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <HeaderMain href={"/homepage"} />
      <ScrollView style={{ padding: 16 }}>
        <View style={styles.skeletonImage} />
        <View style={styles.skeletonTextLarge} />
        <View style={styles.skeletonText} />
        <View style={styles.skeletonMetafields}>
          <View style={styles.skeletonMetafieldItem} />
          <View style={styles.skeletonMetafieldItem} />
          <View style={styles.skeletonMetafieldItem} />
        </View>
        <View style={styles.skeletonButton} />
        <View>
          <View style={styles.skeletonText} />
          <View style={styles.skeletonText} />
          <View style={styles.skeletonText} />
        </View>
      </ScrollView>
      <WhatsappButton />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  skeletonImage: {
    width: "100%",
    height: 300,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
  },
  skeletonText: {
    width: "100%",
    height: 24,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    marginVertical: 8,
  },
  skeletonTextLarge: {
    width: "100%",
    height: 80,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    marginVertical: 8,
  },
  skeletonMetafields: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 4,
    marginVertical: 12,
  },
  skeletonMetafieldItem: {
    width: 80,
    height: 40,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
  },
  skeletonButton: {
    width: 150,
    height: 50,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    marginVertical: 16,
    marginHorizontal: "auto",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default ProductPageSkeleton;
