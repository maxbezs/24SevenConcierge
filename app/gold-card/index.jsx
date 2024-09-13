import { Link, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import WhatsappButton from "../../components/WhatsappButton";

export default function Card() {
  const { selectedLocation } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View
        className={"flex flex-row justify-between items-center bg-black h-16"}
      >
        <Link
          href={{
            pathname: "/",
            params: {
              selectedLocation: selectedLocation,
              showSplash: "notshow",
            },
          }}
          style={{
            padding: 16,
            height: 64,
            width: 64,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </Link>

        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            alignItems: "center",
            paddingVertical: 8,
            zIndex: -1,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 24,
              fontFamily: "24SevenType",
              paddingVertical: 8,
            }}
          >
            BUY NOW
          </Text>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{
          backgroundColor: "white",
        }}
      >
        <Image
          source={require("../../assets/gold-card.jpg")}
          style={{ width: "100%", height: 400 }}
        />
        <View
          style={{
            alignItems: "center",
            paddingTop: 12,
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontFamily: "24SevenType",
              textAlign: "center",
            }}
          >
            1 Year Membership Gold Card
          </Text>
        </View>
        <View style={{ marginVertical: 16 }}>
          <Text style={{ fontSize: 16, paddingHorizontal: 16 }}>
            Receive all of our special discounts with our collaborations and
            allow our 24Seven Admin Team to book your reservations and transfers
            for Ibiza, Marbella and the Marbella islands.
          </Text>
          <Text style={{ fontSize: 16, paddingHorizontal: 16 }}>
            Leave the planning to us, gain 1 Year of access to exclusive venue
            reservations, specialised guidance and recommendations so that you
            spend time on enjoying the best lifestyle experience.
          </Text>
        </View>

        <View
          style={{
            alignItems: "center",
          }}
        >
          <Link href={"https://buy.stripe.com/9AQdTA2pNfelgRa28a"} asChild>
            <Pressable
              style={{
                backgroundColor: "black",
                height: 50,
                width: 250,
                alignItems: "center",
                marginVertical: 16,
                borderRadius: 8,
                marginBottom: 16,
              }}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  marginVertical: "auto",
                  fontFamily: "24SevenType",
                }}
              >
                GET GOLD CARD
              </Text>
            </Pressable>
          </Link>
        </View>
      </ScrollView>
      <WhatsappButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column", // Arrange children side by side
  },
});
