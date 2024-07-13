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
import { useNavigation } from "@react-navigation/native";

import DisplayMovieItem from "../components/DisplayMovieItem/DisplayMovieItem";
import HeroImage from "../assets/images/movies/hero.jpg";
import movieData from "../MoviesData";

const { width: screenWidth } = Dimensions.get("window");

const HomeScreen = () => {
  const navigation = useNavigation();

  const renderMovieItem = ({ item }) => <DisplayMovieItem item={item} />;

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image source={HeroImage} style={styles.image} />
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Recommended Movies</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Movies")}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
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
