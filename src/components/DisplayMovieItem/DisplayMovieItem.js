import React from "react";
import {
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width: screenWidth } = Dimensions.get("window");

const DisplayMovieItem = ({ item }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("MovieDetailsScreen", { movie: item });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.movieContainer}>
      <Image source={{ uri: item.image_uri }} style={styles.movieImage} />
      <Text style={styles.movieTitle}>{item.title}</Text>
      <Text style={styles.movieType}>{item.type}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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

export default DisplayMovieItem;
