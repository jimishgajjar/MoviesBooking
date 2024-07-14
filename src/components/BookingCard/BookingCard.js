import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const BookingCard = ({ booking }) => {
  return (
    <View style={styles.card}>
      <Image
        style={styles.cardImage}
        source={{ uri: booking.movie.imageUri }}
      />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{booking.movie.title}</Text>
        <Text style={styles.cardRating}>Type: {booking.movie.type}</Text>
        <Text style={styles.cardDetails}>
          Duration: {booking.movie.duration}
        </Text>
        <Text style={styles.cardDetails}>
          Language: {booking.movie.language}
        </Text>
        <Text style={styles.cardDetails}>
          Release Date: {booking.movie.releaseDate}
        </Text>
        {/* Additional booking details */}
        <Text style={styles.cardDetails}>
          Number of People: {booking.numberOfPeople}
        </Text>
        <Text style={styles.cardDetails}>
          Number of Children: {booking.numberOfChildren}
        </Text>
        <Text style={styles.cardDetails}>
          Booking Date: {booking.bookingDate}
        </Text>
        <TouchableOpacity style={styles.cardButton}>
          <Text style={styles.cardButtonText}>View Ticket</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 4,
    overflow: "hidden",
  },
  cardImage: {
    width: 150,
    height: "100%",
    resizeMode: "cover",
  },
  cardContent: {
    flex: 1,
    padding: 12,
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
    marginVertical: 2,
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

export default BookingCard;
