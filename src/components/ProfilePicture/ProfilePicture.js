import React from "react";
import { Image, StyleSheet } from "react-native";
import UserPicture from "../../assets/images/user.png";

const ProfilePicture = () => {
  return <Image source={UserPicture} style={styles.profilePic} />;
};

const styles = StyleSheet.create({
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
});

export default ProfilePicture;
