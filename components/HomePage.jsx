import {
  Dimensions,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import WhatsappButton from "../components/WhatsappButton";
import { useFonts } from "expo-font";

export default function HomePage() {
  const [fontsLoaded] = useFonts({
    "24SevenType": require("../assets/24Seven-type.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "black",
          paddingVertical: 4,
        }}
      >
        <View style={{ width: "100%", paddingVertical: 2 }}>
          <Image
            source={require("../assets/logo1.png")}
            style={{ height: 28 }}
            contentFit="contain"
          />
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.listContent}>
        <View style={styles.goldCardContainer}>
          <Link href="/gold-card" asChild>
            <Pressable style={styles.goldCardPressable}>
              <LinearGradient
                colors={["transparent", "rgba(0,0,0,0.8)"]}
                style={styles.background}
              />
              <Image
                source={require("../assets/gold-card.jpg")}
                style={{
                  width: "100%",
                  height: "100%",
                  marginBottom: 2,
                  contentFit: "cover",
                }}
              />
              <Text style={styles.goldCardText}>Gold Card</Text>
            </Pressable>
          </Link>
        </View>
        <View style={styles.goldCardContainer}>
          <Link href="/concierge" asChild>
            <Pressable style={styles.goldCardPressable}>
              <LinearGradient
                colors={["transparent", "rgba(0,0,0,0.8)"]}
                style={styles.background}
              />
              <Image
                source={require("../assets/logo.png")}
                style={{
                  width: "100%",
                  height: "100%",
                  marginBottom: 2,
                  contentFit: "cover",
                }}
              />
              <Text style={styles.goldCardText}>Concierge</Text>
            </Pressable>
          </Link>
        </View>
        <View style={styles.goldCardContainer}>
          <Link href="/real-estate" asChild>
            <Pressable style={styles.goldCardPressable}>
              <LinearGradient
                colors={["transparent", "rgba(0,0,0,0.8)"]}
                style={styles.background}
              />
              <Image
                source={require("../assets/real-estate.jpg")}
                style={{
                  width: "100%",
                  height: "100%",
                  marginBottom: 2,
                  contentFit: "cover",
                }}
              />
              <Text style={styles.goldCardText}>Real Estate</Text>
            </Pressable>
          </Link>
        </View>
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
  video: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
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
