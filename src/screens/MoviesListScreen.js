import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useStore } from "zustand";
import DisplayMovieItem from "../components/DisplayMovieItem/DisplayMovieItem";
import { MoviesStore } from "../store";

const { width: screenWidth } = Dimensions.get("window");

const MoviesListScreen = () => {
  const navigation = useNavigation();
  const { movies, setMovies } = useStore(MoviesStore);

  const renderMovieItem = ({ item }) => <DisplayMovieItem item={item} />;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.content}>
            <FlatList
              data={movies}
              renderItem={renderMovieItem}
              keyExtractor={(item) => item.id}
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
    width: screenWidth,
    height: screenWidth * 0.5,
  },
  content: {
    flex: 1,
    paddingBottom: 10,
  },
  movieContainer: {
    flex: 1,
    margin: 10,
  },
  movieImage: {
    width: "100%",
    height: screenWidth * 0.8,
    borderRadius: 10,
  },
  movieTitle: {
    marginTop: 5,
    fontWeight: "bold",
  },
  movieType: {
    marginTop: 5,
  },
});

export default MoviesListScreen;
