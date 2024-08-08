import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  View,
  Platform,
  ActivityIndicator,
  Text,
} from "react-native";
import { useStore } from "zustand";
import { LoginStore } from "../store";
import BookingCard from "../components/BookingCard/BookingCard";
import { getBookingsByUserId } from "../services/api";

const BookingsScreen = () => {
  const { user } = useStore(LoginStore);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUserBookings = async () => {
      try {
        const fetcheBookingsCollection = await getBookingsByUserId(user.id);
        const userBookings = fetcheBookingsCollection.map(
          (fetcheBookingsCollection) => fetcheBookingsCollection._raw
        );
        setBookings(userBookings);
      } catch (err) {
        setError("Error loading bookings");
        console.error("Error loading bookings:", err);
      } finally {
        setLoading(false);
      }
    };

    loadUserBookings();
  }, [user.id]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      style={styles.container}
    >
      <ScrollView>
        <View>
          {bookings.length > 0 ? (
            bookings.map((booking, index) => (
              <BookingCard key={index} booking={booking} />
            ))
          ) : (
            <Text style={styles.noBookingsText}>No bookings found.</Text>
          )}
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
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
  noBookingsText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#555",
  },
});

export default BookingsScreen;
