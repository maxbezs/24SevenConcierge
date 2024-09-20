import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const SkeletonLoader = () => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();
  }, [shimmerAnim]);

  const translateX = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [
      -Dimensions.get("window").width,
      Dimensions.get("window").width,
    ],
  });

  return (
    <View style={styles.skeletonContainer}>
      <View style={styles.skeletonItem}>
        <Animated.View
          style={[styles.shimmer, { transform: [{ translateX }] }]}
        >
          <LinearGradient
            colors={["#E0E0E0", "#F0F0F0", "#E0E0E0"]}
            start={[0, 0]}
            end={[1, 0]}
            style={styles.shimmerGradient}
          />
        </Animated.View>
      </View>
      <View style={styles.skeletonText} />
    </View>
  );
};

const styles = StyleSheet.create({
  skeletonContainer: {
    marginHorizontal: 16,
    marginTop: 16,
    height: 250,
    borderRadius: 8,
    backgroundColor: "#E0E0E0",
    overflow: "hidden",
  },
  skeletonItem: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  shimmer: {
    ...StyleSheet.absoluteFillObject,
  },
  shimmerGradient: {
    flex: 1,
  },
  skeletonText: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    height: 24,
    backgroundColor: "#E0E0E0",
  },
});

export default SkeletonLoader;
