import { View, Pressable, StyleSheet } from "react-native";
import PagerView from "react-native-pager-view";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useState, useRef } from "react";

const PagerViewComponent = ({ images }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const pagerRef = useRef(null);
  const totalImages = images.length;

  const handleNextPage = () => {
    if (currentPage < totalImages - 1) {
      setCurrentPage(currentPage + 1);
      pagerRef.current.setPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      pagerRef.current.setPage(currentPage - 1);
    }
  };

  return (
    <>
      {totalImages > 1 ? (
        <>
          <PagerView
            style={{ height: 300, width: "100%" }}
            ref={pagerRef}
            initialPage={0}
            onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
            layoutDirection="ltr"
            orientation="horizontal"
          >
            {images.map((image, index) => (
              <View key={index} collapsable={false}>
                <Image
                  source={{ uri: image.node.src }}
                  style={{ width: "100%", height: 300 }}
                />
              </View>
            ))}
          </PagerView>

          <View style={styles.paginationControls}>
            <Pressable
              onPress={handlePrevPage}
              disabled={currentPage === 0}
              style={[
                styles.controlButton,
                { backgroundColor: currentPage === 0 ? "#ccc" : "black" },
              ]}
            >
              <Ionicons
                style={styles.controlButtonText}
                name="arrow-back"
                size={24}
                color={"white"}
              />
            </Pressable>
            <Pressable
              onPress={handleNextPage}
              disabled={currentPage === totalImages - 1}
              style={[
                styles.controlButton,
                {
                  backgroundColor:
                    currentPage === totalImages - 1 ? "#ccc" : "black",
                },
              ]}
            >
              <Ionicons
                name="arrow-forward"
                style={styles.controlButtonText}
                size={24}
                color="white"
              />
            </Pressable>
          </View>
        </>
      ) : (
        <Image
          source={{
            uri: images[0]?.node.src || require("../../assets/logo.png"),
          }}
          style={{ width: "100%", height: 300 }}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  paginationControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 8,
  },
  controlButton: {
    width: 100,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  controlButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
export default PagerViewComponent;
