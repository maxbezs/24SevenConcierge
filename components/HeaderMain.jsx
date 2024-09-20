import BackArrow from "./svg/BackArrow";
import { Pressable, StyleSheet, View } from "react-native";
import { Link } from "expo-router";

const HeaderMain = ({ href, children }) => {
  return (
    <Link href={href} style={styles.headerContainer} asChild>
      <Pressable>
        <View style={styles.headerBackButton}>
          <BackArrow />
        </View>
        <View style={styles.headerContent}>{children}</View>
      </Pressable>
    </Link>
  );
};
const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#000",
    paddingVertical: 16,
    maxHeight: 88,
  },
  headerBackButton: {
    marginHorizontal: 16,
  },
  headerContent: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    alignItems: "center",
    justifyContent: "center",
    zIndex: -1,
  },
});
export default HeaderMain;
