import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
} from "react-native";

const Banner = () => {
  return (
    <Link href={"/gold-card"} asChild>
      <Pressable style={styles.container}>
        <ImageBackground
          source={require("../assets/gold-bg.png")}
          style={styles.goldCardContainer}
        >
          <View style={styles.cardContent}>
            <View style={styles.textContainer}>
              <Text style={styles.bannerText}>Buy your gold card</Text>
            </View>
            <Ionicons name="arrow-forward" size={24} color="black" />
          </View>
        </ImageBackground>
      </Pressable>
    </Link>
  );
};

export default Banner;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    borderRadius: 8,
    overflow: "hidden",
    paddingVertical: 8,
  },
  goldCardContainer: {
    height: 60,
    borderRadius: 8,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    overflow: "hidden",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  textContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  bannerText: {
    fontSize: 18,
    fontFamily: "24SevenType",
    zIndex: 2,
  },
});
