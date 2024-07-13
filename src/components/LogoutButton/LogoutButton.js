import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const LogoutButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.logoutButton} onPress={onPress}>
      <Text style={styles.logoutButtonText}>Logout</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  logoutButton: {
    width: "100%",
    backgroundColor: "#dc3558",
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  logoutButtonText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LogoutButton;
