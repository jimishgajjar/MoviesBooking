import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { FontAwesome } from "react-native-vector-icons";
import Icon from "react-native-vector-icons/Entypo";

const MovieDetailsScreen = () => {
  const route = useRoute();
  const { movie } = route.params;
  const navigation = useNavigation();

  // Function to handle booking tickets for the selected movie
  const handleBookTickets = () => {
    navigation.navigate("TicketBookingScreen", { movie: movie });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header with back button, movie title, and share button */}
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <FontAwesome name="angle-left" size={24} color="#dc3558" />
          </TouchableOpacity>
          <Text style={styles.title}>{movie.title}</Text>
          <TouchableOpacity style={styles.shareButton}>
            <Icon name="share" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Movie image */}
        <Image source={{ uri: movie.imageUri }} style={styles.image} />

        {/* Subheader with genre, duration, language, and release date */}
        <View style={styles.subHeader}>
          <Text style={styles.genre}>{movie.type}</Text>
          <Text style={styles.duration}>{movie.duration}</Text>
          <Text style={styles.language}>{movie.language}</Text>
          <Text style={styles.releaseDate}>{movie.releaseDate}</Text>
        </View>

        {/* Movie description */}
        <Text style={styles.description}>{movie.description}</Text>

        {/* Container for interested count and interested button */}
        <View style={styles.interestedContainer}>
          <Text style={styles.interestedText}>1.2M are interested</Text>
          <TouchableOpacity style={styles.interestedButton}>
            <Text style={styles.interestedButtonText}>I'm interested</Text>
          </TouchableOpacity>
        </View>

        {/* Container for trending count */}
        <View style={styles.trendingContainer}>
          <Text style={styles.trendingText}>Trending</Text>
          <Text style={styles.trendingCount}>
            54.73K tickets booked in last 1 hour
          </Text>
        </View>

        {/* Container for top offers */}
        <View style={styles.offersContainer}>
          <Text style={styles.offersTitle}>Top offers for you</Text>
          <ScrollView horizontal>
            <View style={styles.offerItem}>
              <Text>50% Off*</Text>
            </View>
            <View style={styles.offerItem}>
              <Text>IndusInd Bank Credit Card</Text>
            </View>
            <View style={styles.offerItem}>
              <Text>Buy 1 Get 1</Text>
            </View>
          </ScrollView>
        </View>
      </ScrollView>

      {/* Button to book tickets */}
      <TouchableOpacity style={styles.bookButton} onPress={handleBookTickets}>
        <Text style={styles.bookButtonText}>Book tickets</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContent: {
    paddingHorizontal: 10,
    paddingBottom: 80,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  backButton: {
    padding: 5,
    color: "#dc3558",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    flex: 1,
    marginLeft: 10,
  },
  shareButton: {
    backgroundColor: "#dc3558",
    padding: 5,
    borderRadius: 5,
  },
  shareText: {
    fontSize: 16,
    color: "white",
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 10,
    marginVertical: 10,
  },
  subHeader: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  genre: {
    fontSize: 14,
    backgroundColor: "#f1f1f1",
    padding: 5,
    borderRadius: 5,
  },
  duration: {
    fontSize: 14,
    backgroundColor: "#f1f1f1",
    padding: 5,
    borderRadius: 5,
  },
  language: {
    fontSize: 14,
    backgroundColor: "#f1f1f1",
    padding: 5,
    borderRadius: 5,
  },
  releaseDate: {
    fontSize: 14,
    backgroundColor: "#f1f1f1",
    padding: 5,
    borderRadius: 5,
  },
  description: {
    fontSize: 16,
    marginVertical: 10,
  },
  interestedContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    elevation: 5,
  },
  interestedText: {
    fontSize: 16,
  },
  interestedButton: {
    backgroundColor: "#dc3558",
    padding: 10,
    borderRadius: 10,
  },
  interestedButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  trendingContainer: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: "#000",
    elevation: 5,
  },
  trendingText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  trendingCount: {
    fontSize: 16,
  },
  offersContainer: {
    marginVertical: 10,
  },
  offersTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  offerItem: {
    backgroundColor: "#f1f1f1",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  bookButton: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#dc3558",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    margin: 10,
  },
  bookButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default MovieDetailsScreen;
