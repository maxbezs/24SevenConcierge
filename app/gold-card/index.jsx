import { Link } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import HeaderMain from "../../components/HeaderMain";

export default function Card() {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <StatusBar style="auto" />
      <HeaderMain href="/homepage">
        <Text
          style={{
            color: "white",
            fontSize: 24,
            fontFamily: "24SevenType",
          }}
        >
          BUY NOW
        </Text>
      </HeaderMain>
      <ScrollView>
        <Image
          source={require("../../assets/gold-card.jpg")}
          style={{ width: "100%", height: 380 }}
        />
        <Text style={styles.title}>1 Year Membership Gold Card</Text>
        <View>
          <Text style={styles.paragraph}>
            Receive all of our special discounts with our collaborations and
            allow our 24Seven Admin Team to book your reservations and transfers
            for Ibiza, Marbella and the Marbella islands.
          </Text>
          <Text style={styles.paragraph}>
            Leave the planning to us, gain 1 Year of access to exclusive venue
            reservations, specialised guidance and recommendations so that you
            spend time on enjoying the best lifestyle experience.
          </Text>
        </View>

        <View>
          <Link href={"https://buy.stripe.com/9AQdTA2pNfelgRa28a"} asChild>
            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>GET GOLD CARD</Text>
            </Pressable>
          </Link>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontFamily: "24SevenType",
    textAlign: "center",
    padding: 16,
  },
  paragraph: { fontSize: 16, paddingHorizontal: 16, paddingBottom: 8 },
  button: {
    backgroundColor: "black",
    height: 50,
    width: 250,
    alignItems: "center",
    marginVertical: 16,
    borderRadius: 8,
    marginHorizontal: "auto",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    marginVertical: "auto",
    fontFamily: "24SevenType",
  },
});
