import * as SplashScreen from "expo-splash-screen";

import { Dimensions, Text, View } from "react-native";
import { useCallback, useEffect, useState } from "react";

import HomePage from "../components/HomePage";
import { Video } from "expo-av";
import { useLocalSearchParams } from "expo-router";

SplashScreen.preventAutoHideAsync().catch(() => {
  /* reloading the app might trigger some race conditions, ignore them */
});

export default function App() {
  return (
    <AnimatedSplashScreen>
      <Text>READY!</Text>
      <HomePage />
    </AnimatedSplashScreen>
  );
}

function AnimatedSplashScreen({ children }) {
  const { showSplash } = useLocalSearchParams();
  const splashShouldBeShown = showSplash === "show" || showSplash === undefined;

  const [isSplashAnimationComplete, setAnimationComplete] = useState(false);
  const [videoError, setVideoError] = useState(null);

  const onVideoPlaybackStatusUpdate = useCallback(({ didJustFinish }) => {
    if (didJustFinish) {
      setAnimationComplete(true);
    }
  }, []);

  const onVideoError = useCallback((error) => {
    console.error("Video Error:", error);
    setVideoError(error);
  }, []);

  useEffect(() => {
    const hideSplash = async () => {
      if (isSplashAnimationComplete) {
        try {
          await SplashScreen.hideAsync();
        } catch (e) {
          console.error("Failed to hide splash screen:", e);
        }
      }
    };
    hideSplash();
  }, [isSplashAnimationComplete]);

  const { width, height } = Dimensions.get("window");

  if (splashShouldBeShown && !isSplashAnimationComplete) {
    return (
      <View style={{ flex: 1 }}>
        {videoError ? (
          <Text style={{ color: "white" }}>Error loading video.</Text>
        ) : (
          <Video
            source={require("../assets/splash.mp4")}
            shouldPlay
            resizeMode="cover"
            style={{ width, height }}
            isLooping={false}
            onPlaybackStatusUpdate={onVideoPlaybackStatusUpdate}
            onError={onVideoError}
          />
        )}
      </View>
    );
  }

  return <View style={{ flex: 1 }}>{children}</View>;
}
