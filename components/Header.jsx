import { Pressable, StyleSheet, Text, View } from "react-native";

import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";

const Header = ({ data, value, setValue, setIsFocus }) => {
  const handleLocationChange = (location) => {
    setValue(location);
    setIsFocus(false);
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.backAndLogoContainer}>
        <Link href="/" style={styles.backLink}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </Link>
        <View style={styles.logo}>
          <Image
            source={require("../assets/logo1.png")}
            style={{ height: 28, width: "100%" }}
            contentFit="contain"
          />
        </View>
      </View>
      <View style={styles.locationsContainer}>
        {data.map((item) => (
          <Pressable
            key={item.value}
            style={[
              styles.menuItem,
              value === item.label && styles.menuItemActive,
            ]}
            onPress={() => handleLocationChange(item.label)}
          >
            <Text
              style={{
                color: value === item.label ? "black" : "white",
                fontFamily: "24SevenType",
              }}
            >
              {item.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "black",
    paddingTop: 16,
  },
  backAndLogoContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    position: "relative",
  },
  backLink: {
    padding: 16,
    height: 60,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: -1,
  },
  locationsContainer: {
    paddingHorizontal: 24,
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    paddingVertical: 16,
  },
  menuItem: {
    backgroundColor: "black",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginRight: 10,
  },
  menuItemActive: {
    backgroundColor: "white",
  },
});

export default Header;
