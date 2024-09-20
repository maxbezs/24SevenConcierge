import { Pressable, StyleSheet, Text, View } from "react-native";

import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";

const ProductItem = ({
  product,
  pathname,
  params = {},
  imagePlaceholder = require("../../assets/logo.png"),
}) => {
  const { id, title, images, variants } = product;

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
          pathname: pathname,
          params: { productId: id, ...params }, // Merging productId with other params
        }}
        key={id}
        asChild
      >
        <Pressable
          style={{ borderRadius: 8, overflow: "hidden", height: "100%" }}
        >
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.8)"]}
            style={styles.background}
            start={{ x: 0, y: 0.2 }}
            end={{ x: 0, y: 0.9 }}
          />
          {(images && images.length > 0) || images?.edges?.length ? (
            <Image
              source={{ uri: images[0]?.src || images.edges[0].node.src }}
              style={{
                position: "absolute",
                right: 0,
                left: 0,
                top: 0,
                bottom: 0,
              }}
              alt={images[0]?.altText || "Product Image"}
            />
          ) : (
            <Image
              source={imagePlaceholder}
              style={{ width: "100%", height: "100%" }}
            />
          )}
          <View
            style={{
              zIndex: 2,
              position: "absolute",
              bottom: 20,
              right: 0,
              left: 0,
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontSize: 16,
                fontFamily: "24SevenType",
                marginHorizontal: 4,
                marginVertical: 4,
              }}
            >
              {title}
            </Text>
            {variants && variants.length > 0 && (
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontSize: 16,
                }}
              >
                {variants[0].price.amount && variants[0].price.amount !== "0.0"
                  ? `from ${variants[0].price.amount} ${variants[0].price.currencyCode}/day`
                  : "Price on request"}
              </Text>
            )}
          </View>
        </Pressable>
      </Link>
    </View>
  );
};

export default ProductItem;

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
