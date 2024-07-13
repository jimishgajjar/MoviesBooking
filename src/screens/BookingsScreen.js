import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import movieData from "../MoviesData";

const BookingsScreen = () => {
  const moviesToDisplay = movieData.slice(0, 2);

  return (
    <ScrollView style={styles.container}>
      {moviesToDisplay.map((movie) => (
        <View key={movie.id} style={styles.card}>
          <Image style={styles.cardImage} source={{ uri: movie.imageUri }} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{movie.title}</Text>
            <Text style={styles.cardRating}>Type: {movie.type}</Text>
            <Text style={styles.cardDetails}>Duration: {movie.duration}</Text>
            <Text style={styles.cardDetails}>Language: {movie.language}</Text>
            <Text style={styles.cardDetails}>
              Release Date: {movie.releaseDate}
            </Text>
            <TouchableOpacity style={styles.cardButton}>
              <Text style={styles.cardButtonText}>View ticket</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
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
