import { View, Text, Pressable, StyleSheet } from "react-native";
import { Link } from "expo-router";
import MetafieldItem from "./MetafieldItem";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
const ProductDetails = ({ product, hrefBooking }) => {
  const metafieldIcons = {
    capacity: { icon: FontAwesome6, iconName: "users", label: "Capacity" },
    beds: { icon: FontAwesome5, iconName: "bed", label: "Beds" },
    bathrooms: { icon: FontAwesome5, iconName: "bath", label: "Bathrooms" },
    rooms: { icon: FontAwesome5, iconName: "door-open", label: "Rooms" },
  };

  return (
    <View style={{ alignItems: "center", paddingTop: 20 }}>
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>
        {product.priceRange?.minVariantPrice?.amount &&
        product.priceRange?.minVariantPrice?.amount !== "0.0"
          ? `from ${parseFloat(product.priceRange.minVariantPrice.amount)} ${
              product.priceRange.minVariantPrice.currencyCode
            }/day`
          : "Price on request"}
      </Text>
      <View
        style={{
          paddingHorizontal: 16,
          marginVertical: product.metafields ? 0 : 16,
          flexDirection: "row",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 4,
        }}
      >
        {product.metafields &&
          product.metafields.map((metafield, index) => {
            if (!metafield || !metafield.key || !metafield.value) return null;
            const { key, value } = metafield;
            const iconData = metafieldIcons[key];
            return iconData ? (
              <MetafieldItem
                key={index}
                icon={(props) => (
                  <iconData.icon name={iconData.iconName} {...props} />
                )}
                value={value}
                label={iconData.label}
              />
            ) : null;
          })}
      </View>
      <View style={{ alignItems: "center" }}>
        <Link href={hrefBooking} asChild>
          <Pressable style={styles.bookNowButton}>
            <Text style={styles.bookNowText}>Book now</Text>
          </Pressable>
        </Link>
      </View>

      <Text style={styles.description}>{product.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: 24, textAlign: "center", fontFamily: "24SevenType" },
  price: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "500",
    paddingVertical: 8,
  },
  metafields: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 4,
  },
  bookNowButton: {
    backgroundColor: "black",
    height: 50,
    width: 150,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 16,
  },
  bookNowText: {
    color: "white",
    textAlign: "center",
    marginVertical: "auto",
    fontFamily: "24SevenType",
  },
  description: { fontSize: 16, textAlign: "center", paddingHorizontal: 16 },
});

export default ProductDetails;
