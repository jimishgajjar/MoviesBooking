import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook
import DisplayMovieItem from "../components/DisplayMovieItem/DisplayMovieItem";

import movieData from "../MoviesData";

const { width: screenWidth } = Dimensions.get("window");

const MoviesListScreen = () => {
  const navigation = useNavigation();

  const renderMovieItem = ({ item }) => <DisplayMovieItem item={item} />;

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.content}>
          <FlatList
            data={movieData}
            renderItem={renderMovieItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            scrollEnabled={false}
          />
        </View>
      </View>
    </ScrollView>
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
