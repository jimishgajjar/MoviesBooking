import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import Logo from "../assets/images/logo/logo.png";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace("LoginScreen");
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.image} resizeMode="contain" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "80%",
    height: "80%",
  },
});

export default SplashScreen;
