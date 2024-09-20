import React, { useCallback, useEffect, useState } from "react";
import {
  Text,
  TextInput,
  View,
  Modal,
  StyleSheet,
  SafeAreaView,
  Pressable,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";
import { Ionicons } from "@expo/vector-icons";
import { fetchSingleProduct } from "../../../../../hooks/shopify";
import WhatsappButton from "../../../../../components/WhatsappButton";
import { StatusBar } from "expo-status-bar";
import HeaderMain from "../../../../../components/HeaderMain";

export default function Product() {
  const { title, collection, productId, selectedLocation } =
    useLocalSearchParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSingleProduct(productId);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [productId]);

  const [formData, setFormData] = useState({
    product: "",
    email: "",
    fullName: "",
    phone: "",
    startDate: dayjs(),
    endDate: dayjs(),
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    setModalVisible(true);
  };

  const onChange = useCallback(
    (params) => {
      setFormData({
        ...formData,
        startDate: params.startDate,
        endDate: params.endDate,
      });
    },
    [formData]
  ); // Added dependency array for useCallback

  if (loading) {
    return <ActivityIndicator size="large" color="#000" />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        <HeaderMain
          href={{
            pathname: "/concierge/[collection]/[productId]",
            params: {
              collection: collection,
              productId: productId,
              title: title,
              selectedLocation: selectedLocation,
            },
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 24,
              fontFamily: "24SevenType",
            }}
          >
            BOOKING
          </Text>
        </HeaderMain>
        <ScrollView>
          <Text
            style={{
              fontSize: 24,
              fontFamily: "24SevenType",
              paddingVertical: 8,
              textAlign: "center",
            }}
          >
            {product?.title}
          </Text>
          <View style={styles.datePickerContainer}>
            <View style={styles.datePicker}>
              <DateTimePicker
                mode={"range"}
                date={dayjs()}
                locale={"en"}
                height={333}
                startDate={formData.startDate}
                endDate={formData.endDate}
                displayFullDays
                minDate={dayjs().startOf("day")}
                onChange={onChange}
                todayContainerStyle={{
                  borderWidth: 1,
                  fontFamily: "24SevenType",
                }}
                headerButtonColor={"#ffffff"}
                selectedItemColor={"#ffffff"}
                selectedTextStyle={{
                  fontFamily: "24SevenType",
                  color: "#000000",
                }}
                headerTextStyle={{
                  color: "#ffffff",
                  fontFamily: "24SevenType",
                }}
                calendarTextStyle={{
                  color: "#ffffff",
                  fontFamily: "24SevenType",
                }}
                weekDaysTextStyle={{
                  color: "#ffffff",
                  fontFamily: "24SevenType",
                }}
                yearContainerStyle={{
                  backgroundColor: "#000000",
                }}
                yearTextStyle={{
                  fontFamily: "24SevenType",
                  fontSize: 18,
                  color: "red",
                }}
                selectedYearContainerStyle={{
                  backgroundColor: "red",
                  borderRadius: 10,
                  padding: 8,
                }}
                monthContainerStyle={{
                  backgroundColor: "#000000",
                }}
              />
            </View>
          </View>

          <View style={{ paddingHorizontal: 16 }}>
            <View style={{ gap: 3, marginBottom: 16 }}>
              <Text
                style={{
                  width: "100%",
                  textAlign: "center",
                  fontFamily: "24SevenType",
                  fontSize: 12,
                  marginVertical: 6,
                }}
              >
                {formData.startDate
                  ? dayjs(formData.startDate)
                      .locale("en")
                      .format("MMMM DD 08:00")
                  : "..."}
                {" - "}
                {formData.endDate
                  ? dayjs(formData.endDate).locale("en").format("MMMM DD 23:59")
                  : "..."}
              </Text>
            </View>
            <View style={{ paddingHorizontal: 4 }}>
              <Text style={{ fontFamily: "24SevenType" }}>Email</Text>
              <TextInput
                style={styles.input}
                onChangeText={(value) => handleChange("email", value)}
                value={formData.email}
                cursorColor={"#000000"}
              />
              <Text style={{ fontFamily: "24SevenType" }}>Full Name</Text>
              <TextInput
                style={styles.input}
                onChangeText={(value) => handleChange("fullName", value)}
                value={formData.fullName}
                cursorColor={"#000000"}
              />
              <Text style={{ fontFamily: "24SevenType" }}>Phone Number</Text>
              <TextInput
                style={styles.input}
                onChangeText={(value) => handleChange("phone", value)}
                value={formData.phone}
                cursorColor={"#000000"}
              />
            </View>
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Pressable
                onPress={handleSubmit}
                style={{
                  backgroundColor: "black",
                  height: 50,
                  width: 190,
                  alignItems: "center",
                  marginVertical: 16,
                  borderRadius: 8,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    marginVertical: "auto",
                    marginHorizontal: 16,
                    fontFamily: "24SevenType",
                  }}
                >
                  BOOK NOW
                </Text>
              </Pressable>
            </View>

            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              statusBarTranslucent={true}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              {/* Outer Pressable to detect clicks outside the modal */}
              <Pressable
                style={styles.content}
                onPress={() => setModalVisible(false)}
              >
                {/* Inner Pressable to prevent modal close when clicking inside the modal content */}
                <Pressable
                  style={styles.card}
                  onPress={(e) => e.stopPropagation()}
                >
                  {/* Checkmark Icon */}
                  <Ionicons
                    name="checkmark-circle"
                    size={60}
                    color="green"
                    style={{ alignSelf: "center", marginBottom: 16 }}
                  />

                  {/* Thank You Message */}
                  <Text style={styles.title}>Thank You!</Text>
                  <Text style={styles.desc}>
                    Thank you for your booking. We will contact you shortly.
                  </Text>

                  {/* Close Button */}
                  <Pressable
                    style={[
                      styles.button,
                      {
                        width: "100%",
                        marginTop: 24,
                        backgroundColor: "rgba(0,0,0,0.1)",
                      },
                    ]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={[styles.text, { color: "black" }]}>Close</Text>
                  </Pressable>
                </Pressable>
              </Pressable>
            </Modal>
          </View>
        </ScrollView>
        <WhatsappButton />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  input: {
    height: 40,
    borderColor: "black",
    borderWidth: 2,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    fontFamily: "24SevenType",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  datePickerContainer: {
    alignItems: "center",
    paddingHorizontal: 16,
  },
  datePicker: {
    backgroundColor: "#101213",
    padding: 16,
    borderRadius: 8,
  },
  desc: {
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.7,
    textAlign: "center",
  },
  title: {
    fontWeight: "600",
    fontSize: 18,
    marginBottom: 12,
    textAlign: "center",
  },
  card: {
    width: "90%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 8,
  },
  text: {
    fontWeight: "600",
    fontSize: 16,
    color: "white",
  },
  button: {
    width: "90%",
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    height: 56,
    borderRadius: 8,
  },
});
