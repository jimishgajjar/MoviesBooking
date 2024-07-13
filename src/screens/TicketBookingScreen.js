import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { FontAwesome } from "react-native-vector-icons";
import Icon from "react-native-vector-icons/Entypo";

// Example movie data (replace with your actual data source)
import movieData from "../MoviesData";

const TicketBookingScreen = ({ route, navigation }) => {
  const { movieId } = route.params;
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [numberOfChildren, setNumberOfChildren] = useState(0);
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    // Find the movie details based on movieId from movieData or API call
    const selectedMovie = movieData.find((m) => m.id === movieId);
    setMovie(selectedMovie);
  }, [movieId]);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleConfirmBooking = () => {
    const bookingData = {
      movieId: movie.id,
      movieTitle: movie.title,
      numberOfPeople,
      numberOfChildren,
    };
    navigation.navigate("BookingsScreen", { bookingData });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <FontAwesome name="chevron-left" size={24} color="#dc3558" />
        </TouchableOpacity>
        <Text style={styles.title}>Book Tickets</Text>
      </View>

      {movie && (
        <View style={styles.movieInfoContainer}>
          <Image source={{ uri: movie.imageUri }} style={styles.movieImage} />
          <Text style={styles.movieTitle}>{movie.title}</Text>
          <Text style={styles.movieDetails}>Type: {movie.type}</Text>
          <Text style={styles.movieDetails}>Duration: {movie.duration}</Text>
          <Text style={styles.movieDetails}>Language: {movie.language}</Text>
          <Text style={styles.movieDetails}>
            Release Date: {movie.releaseDate}
          </Text>
        </View>
      )}

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Number of People:</Text>
        <Picker
          selectedValue={numberOfPeople}
          onValueChange={(itemValue) => setNumberOfPeople(itemValue)}
          style={styles.picker}
        >
          {[1, 2, 3, 4, 5].map((value) => (
            <Picker.Item key={value} label={`${value}`} value={value} />
          ))}
        </Picker>

        <Text style={styles.label}>Number of Children:</Text>
        <Picker
          selectedValue={numberOfChildren}
          onValueChange={(itemValue) => setNumberOfChildren(itemValue)}
          style={styles.picker}
        >
          {[0, 1, 2, 3].map((value) => (
            <Picker.Item key={value} label={`${value}`} value={value} />
          ))}
        </Picker>
      </View>

      <TouchableOpacity
        style={styles.bookButton}
        onPress={handleConfirmBooking}
      >
        <Text style={styles.bookButtonText}>Confirm Booking</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    padding: 5,
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    flex: 1,
  },
  movieInfoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  movieImage: {
    width: 200,
    height: 300,
    borderRadius: 10,
    marginBottom: 10,
  },
  movieTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  movieDetails: {
    fontSize: 16,
    marginBottom: 5,
  },
  pickerContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  bookButton: {
    backgroundColor: "#dc3558",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  bookButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default TicketBookingScreen;
