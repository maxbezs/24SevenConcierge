import React from "react";
import { View, Text } from "react-native";

const MetafieldItem = ({ icon: Icon, value, label }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 8,
      }}
    >
      <Icon style={{ marginRight: 8 }} size={24} color="black" />
      <Text style={{ fontSize: 16, color: "black" }}>
        {/*{label}:*/} {value}
      </Text>
    </View>
  );
};

export default MetafieldItem;
