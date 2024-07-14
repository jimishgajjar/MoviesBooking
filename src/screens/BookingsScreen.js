import React from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  View,
  Platform,
} from "react-native";
import { useStore } from "zustand";
import { LoginStore } from "../store";
import BookingCard from "../components/BookingCard/BookingCard";

// Component displaying user bookings with a scrollable list of BookingCard components.
const BookingsScreen = () => {
  // Access user data from Zustand store
  const { user } = useStore(LoginStore);

  // Extract bookings array from user data or initialize as empty array
  const bookings = user ? user.bookings || [] : [];

  return (
    // Avoid keyboard and handle screen adjustments based on platform
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      style={styles.container}
    >
      <ScrollView>
        <View>
          {/* Render each booking as a BookingCard component */}
          {bookings.map((booking, index) => (
            <BookingCard key={index} booking={booking} />
          ))}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  card: {
    margin: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 4,
    flexDirection: "row",
    overflow: "hidden",
  },
  cardImage: {
    width: 135,
    height: "100%",
    resizeMode: "cover",
  },
  cardContent: {
    flex: 1,
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardRating: {
    fontSize: 14,
    color: "#888",
    marginVertical: 4,
  },
  cardDetails: {
    fontSize: 14,
    marginVertical: 4,
  },
  cardButton: {
    backgroundColor: "#ff5a5f",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginTop: 8,
  },
  cardButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default BookingsScreen;
