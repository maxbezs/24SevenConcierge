import { useCallback, useState } from "react";
import { View } from "react-native";
import { Video } from "expo-av";
import { Redirect } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isSplashAnimationComplete, setAnimationComplete] = useState(false);
  const [isVideoLoaded, setVideoLoaded] = useState(false);

  const onVideoPlaybackStatusUpdate = useCallback(({ didJustFinish }) => {
    if (didJustFinish) {
      setAnimationComplete(true);
    }
  }, []);

  const onVideoLoad = useCallback(async () => {
    setVideoLoaded(true);
    await SplashScreen.hideAsync();
  }, []);

  if (isSplashAnimationComplete) {
    return <Redirect href="/homepage" />;
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
      }}
    >
      <Video
        source={require("../assets/splash.mp4")}
        shouldPlay
        resizeMode="cover"
        style={{ width: "100%", height: "100%" }}
        isLooping={false}
        onLoad={onVideoLoad}
        onPlaybackStatusUpdate={onVideoPlaybackStatusUpdate}
      />
    </View>
  );
}
