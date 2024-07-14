import React from "react";
import { View, StyleSheet } from "react-native";
import ProfilePicture from "../components/ProfilePicture/ProfilePicture";
import UserInfo from "../components/UserInfo/UserInfo";
import LogoutButton from "../components/LogoutButton/LogoutButton";
import { LoginStore } from "../store";
import { useStore } from "zustand";

const ProfileScreen = ({ navigation }) => {
  const { user, setUser } = useStore(LoginStore); // Accessing Zustand store for user data

  // Function to handle logout
  const handleLogout = () => {
    setUser(null); // Clear user data in Zustand store
    navigation.navigate("LoginScreen"); // Navigate to LoginScreen after logout
  };

  // If user data is not available, render nothing
  if (!user) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Display user profile picture */}
      <ProfilePicture profilePic={user.profilePic} style={styles.profilePic} />

      {/* Display user information */}
      <UserInfo userInfo={user} />

      {/* Logout button */}
      <LogoutButton onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
});

export default ProfileScreen;
