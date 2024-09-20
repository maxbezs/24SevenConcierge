import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";

import { StatusBar } from "expo-status-bar";
import WhatsappButton from "../../components/WhatsappButton";
import { useFonts } from "expo-font";
import SkeletonLoader from "../../components/items/SkeletonLoader";
import { useEffect, useState } from "react";
import Logo1 from "../../components/svg/Logo1";
import HomePageItem from "../../components/items/HomePageItem";

export default function HomePage() {
  const [fontsLoaded] = useFonts({
    "24SevenType": require("../../assets/24Seven-type.ttf"),
  });
  const [isLoading, setIsLoading] = useState(true);

  // Simulate a delay for the loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.innerContainer}>
        <View style={styles.logoContainer}>
          <Logo1 />
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.listContent}>
        {isLoading || !fontsLoaded ? (
          <>
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
          </>
        ) : (
          <>
            <HomePageItem
              href="/gold-card"
              imageSource={require("../../assets/gold-card.jpg")}
              text="Gold Card"
            />
            <HomePageItem
              href="/concierge"
              imageSource={require("../../assets/logo.png")}
              text="Concierge"
            />
            <HomePageItem
              href="/real-estate"
              imageSource={require("../../assets/real-estate.jpg")}
              text="Real Estate"
            />
          </>
        )}
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
  listContent: {
    backgroundColor: "white",
    paddingVertical: 8,
  },
  innerContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "black",
    paddingVertical: 16,
    display: "flex",
  },
  logoContainer: {
    width: "100%",
    paddingVertical: 8,
    alignItems: "center",
    display: "flex",
  },
});
