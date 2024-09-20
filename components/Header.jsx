import { Pressable, StyleSheet, Text, View } from "react-native";

import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import Logo1 from "./svg/Logo1";
import HeaderMain from "./HeaderMain";

const Header = ({ data, value, setValue }) => {
  const handleLocationChange = (location) => {
    setValue(location);
  };

  return (
    <View style={styles.headerContainer}>
      <HeaderMain href={"/homepage"}>
        <Logo1 />
      </HeaderMain>
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
    backgroundColor: "black",
  },
  locationsContainer: {
    paddingHorizontal: 24,
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    paddingBottom: 16,
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
