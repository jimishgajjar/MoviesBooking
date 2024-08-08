import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useStore } from "zustand";
import DisplayMovieItem from "../components/DisplayMovieItem/DisplayMovieItem";
import { MoviesStore } from "../store";

const MoviesListScreen = () => {
  const { movies, setMovies } = useStore(MoviesStore); // Accessing Zustand store

  // Function to render each movie item
  const renderMovieItem = ({ item }) => <DisplayMovieItem item={item} />;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.content}>
            {/* FlatList to display movies */}
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
  content: {
    flex: 1,
    paddingBottom: 10,
  },
});

export default MoviesListScreen;
