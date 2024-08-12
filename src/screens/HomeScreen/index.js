import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useStore } from "zustand";
import DisplayMovieItem from "../../components/DisplayMovieItem/DisplayMovieItem";
import HeroImage from "../../assets/images/movies/hero.jpg";
import { MoviesStore } from "../../store";
import { getAllMovies } from "../../services/api";

const { width: screenWidth } = Dimensions.get("window");

const HomeScreen = () => {
  const navigation = useNavigation();
  const { movies, setMovies } = useStore(MoviesStore);

  // Fetch movies from API only if movies state is empty
  useEffect(() => {
    const loadMovies = async () => {
      try {
        // Check if movies state is empty before fetching
        if (movies.length === 0) {
          const fetchedMovies = await getAllMovies();
          setMovies(fetchedMovies);
        }
      } catch (error) {
        console.error("Error loading movies:", error);
      }
    };

    loadMovies();
  }, [movies, setMovies]); // Dependency array includes movies and setMovies

  // Render function for each movie item in FlatList
  const renderMovieItem = ({ item }) => <DisplayMovieItem item={item} />;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <ScrollView>
        <View style={styles.container}>
          {/* Hero image at the top */}
          <Image source={HeroImage} style={styles.image} />
          {/* Section header with recommended movies and 'See All' button */}
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Recommended Movies</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Movies")}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          {/* FlatList to display movies */}
          <View style={styles.content}>
            <FlatList
              data={movies}
              renderItem={renderMovieItem}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}
              scrollEnabled={false}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  image: {
    width: screenWidth - 20,
    height: screenWidth * 0.5,
    borderRadius: 10,
    margin: 10,
  },
  content: {
    flex: 1,
    paddingBottom: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 10,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "500",
  },
  seeAllText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#dc3558",
  },
});

export default HomeScreen;
