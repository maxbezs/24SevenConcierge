import { Link } from "expo-router";
import React from "react";
import { Pressable } from "react-native";
import WhatsappLogo from "./svg/WhatsappLogo";
const WhatsappButton = () => {
  return (
    <Link
      style={{
        alignItems: "center",
        justifyContent: "center",
        width: 70,
        position: "absolute",
        bottom: 20,
        right: 20,
        height: 70,
        backgroundColor: "black",
        borderRadius: 999,
        zIndex: 98,
        flex: 1,
        padding: 4,
      }}
      href={"https://wa.me/447575383355"}
      asChild
    >
      <Pressable>
        <WhatsappLogo />
      </Pressable>
    </Link>
  );
};

export default WhatsappButton;
