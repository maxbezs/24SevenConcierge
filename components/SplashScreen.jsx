// SplashScreen.jsx

import { Dimensions, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";

import { Video } from "expo-av";

const { width, height } = Dimensions.get("window");

const SplashScreen = ({ onVideoFinished }) => {
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    if (videoLoaded) {
      setTimeout(onVideoFinished, 3000); // Duration of the splash screen video
    }
  }, [videoLoaded]);

  return (
    <View style={styles.container}>
      <Video
        source={require("../assets/splash.mp4")}
        style={styles.video}
        contentFit="cover"
        onLoad={() => setVideoLoaded(true)}
        shouldPlay
        isLooping={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  video: {
    width,
    height,
  },
});

export default SplashScreen;
