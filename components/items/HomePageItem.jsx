import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

const HomePageItem = ({ href, imageSource, text }) => (
  <View style={styles.homePageItemContainer}>
    <Link href={href} asChild>
      <Pressable style={styles.homePageItemPressable}>
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.8)"]}
          style={styles.homePageItemGradient}
        />
        <Image
          source={imageSource}
          style={styles.homePageItemImage}
          contentFit="cover"
        />
        <Text style={styles.homePageItemText}>{text}</Text>
      </Pressable>
    </Link>
  </View>
);

const styles = StyleSheet.create({
  homePageItemContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "white",
    height: 250,
  },
  homePageItemPressable: {
    borderRadius: 8,
    overflow: "hidden",
    height: "100%",
  },
  homePageItemGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
    zIndex: 1,
  },
  homePageItemImage: {
    width: "100%",
    height: "100%",
    marginBottom: 8,
  },
  homePageItemText: {
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
});
export default HomePageItem;
