// CollectionItem.js

import { Link, useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";

const CollectionItem = ({ collection, location }) => {
  if (!collection || !collection.title) {
    return null;
  }

  // Check if the title matches any excluded locations
  const excludedLocations = ["Ibiza", "Tenerife", "Marbella"];
  const titleParts = collection.title.split(" ");

  if (excludedLocations.includes(collection.title)) {
    return null;
  }

  // Remove the location part from the title
  const title = titleParts.slice(1).join(" ");

  return (
    <View
      style={{
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: "white",
        height: 250,
      }}
    >
      <Link
        href={{
          pathname: "/concierge/[collection]",
          params: {
            location: location,
            collection: collection.id,
            title: collection.title,
            selectedLocation: location,
          },
        }}
        key={collection.id}
        asChild
      >
        <Pressable
          style={{ borderRadius: 8, overflow: "hidden", height: "100%" }}
        >
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.8)"]}
            style={styles.background}
          />
          {collection.image ? (
            <Image
              source={{ uri: collection.image.src }}
              style={{
                position: "absolute",
                right: 0,
                left: 0,
                top: 0,
                bottom: 0,
              }}
            />
          ) : (
            <Image
              source={require("../assets/logo.png")}
              className="w-full h-full mb-2 object-cover"
            />
          )}
          <Text
            style={{
              zIndex: 2,
              color: "white",
              textAlign: "center",
              position: "absolute",
              bottom: 20,
              right: 0,
              left: 0,
              fontSize: 24,
              fontFamily: "24SevenType",
            }}
          >
            {title}
          </Text>
        </Pressable>
      </Link>
    </View>
  );
};

export default CollectionItem;

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
    zIndex: 1,
  },
});
