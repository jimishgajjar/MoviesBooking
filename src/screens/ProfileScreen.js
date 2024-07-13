import React from "react";
import { View, StyleSheet } from "react-native";
import ProfilePicture from "../components/ProfilePicture/ProfilePicture";
import UserInfo from "../components/UserInfo/UserInfo";
import LogoutButton from "../components/LogoutButton/LogoutButton";
import { LoginStore } from "../store";
import { useStore } from "zustand";

const ProfileScreen = ({ navigation }) => {
  const { user, setUser } = useStore(LoginStore);

  const handleLogout = () => {
    setUser(null);
    navigation.navigate("LoginScreen");
  };

  if (!user) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ProfilePicture profilePic={user.profilePic} style={styles.profilePic} />
      <UserInfo userInfo={user} />
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
