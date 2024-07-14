import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import Logo from "../assets/images/logo/logo.png";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Replace with LoginScreen after 1 second (1000 milliseconds)
    setTimeout(() => {
      navigation.replace("LoginScreen");
    }, 1000);
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  return (
    <View style={styles.container}>
      {/* Logo image */}
      <Image source={Logo} style={styles.image} resizeMode="contain" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF", // White background
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "80%",
    height: "80%",
  },
});

export default SplashScreen;
