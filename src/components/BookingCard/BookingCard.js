import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getMovieById } from "../../services/api";

const BookingCard = ({ booking }) => {
  const navigation = useNavigation();
  const [movie, setMovie] = useState(null);

  const handleViewTicket = () => {
    // Navigate to TicketView screen, passing booking details as params
    navigation.navigate("TicketViewScreen");
  };

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movieData = await getMovieById(booking.movie_id);
        setMovie(movieData);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    fetchMovie();
  }, [booking.movie_id]);

  if (!movie) {
    return (
      <View style={styles.card}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <Image style={styles.cardImage} source={{ uri: movie.image_uri }} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{movie.title}</Text>
        <Text style={styles.cardRating}>Type: {movie.type}</Text>
        <Text style={styles.cardDetails}>Duration: {movie.duration}</Text>
        <Text style={styles.cardDetails}>Language: {movie.language}</Text>
        <Text style={styles.cardDetails}>
          Release Date: {movie.releaseDate}
        </Text>
        {/* Additional booking details */}
        <Text style={styles.cardDetails}>
          Number of People: {booking.number_of_people}
        </Text>
        <Text style={styles.cardDetails}>
          Number of Children: {booking.number_of_children}
        </Text>
        <Text style={styles.cardDetails}>
          Booking Date: {booking.booking_date}
        </Text>
        <TouchableOpacity style={styles.cardButton} onPress={handleViewTicket}>
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
  loadingText: {
    textAlign: "center",
    padding: 20,
    fontSize: 16,
  },
});

export default BookingCard;
