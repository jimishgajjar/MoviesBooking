import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  ScrollView,
} from "react-native";
import { useStore } from "zustand";
import { LoginStore } from "../store";
import Icon from "react-native-vector-icons/FontAwesome";
import UserPicture from "../assets/images/user.png";

const { height: screenHeight } = Dimensions.get("window");

const ProfileScreen = ({ navigation }) => {
  const { user, setUser } = useStore(LoginStore); // Accessing Zustand store for user data

  // Function to handle logout
  const handleLogout = () => {
    setUser(null); // Clear user data in Zustand store
    navigation.navigate("LoginScreen"); // Navigate to LoginScreen after logout
  };

  // Function to handle FAQ navigation
  const handleFaqNavigation = () => {
    navigation.navigate("FaqScreen"); // Navigate to FaqScreen
  };

  // If user data is not available, render nothing
  if (!user) {
    return null;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          {/* Profile Picture */}
          <View style={styles.profileContainer}>
            <Image source={UserPicture} style={styles.profilePic} />
          </View>
          {/* User Information */}
          <Text style={styles.userName}>
            {user._raw.first_name} {user._raw.last_name}
          </Text>
          <Text style={styles.userEmail}>{user.email}</Text>
          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>

          {/* Menu Items */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={handleFaqNavigation}
          >
            <Icon name="question-circle" style={styles.icon} />
            <Text style={styles.menuText}>FAQ</Text>
            <Icon name="chevron-right" style={styles.errorIcon} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.menuItem, styles.logoutButton]}
            onPress={handleLogout}
          >
            <Icon name="sign-out" style={styles.icon} />
            <Text style={styles.menuText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    height: screenHeight,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 0,
  },
  profilePic: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  userEmail: {
    fontSize: 20,
    color: "#666",
    textAlign: "center",
    marginTop: 10,
  },
  editProfileButton: {
    backgroundColor: "#3b5998",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: "center",
    marginVertical: 20,
  },
  editProfileText: {
    color: "#fff",
    fontWeight: "bold",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 17,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 5,
    marginBottom: 30,
  },
  icon: {
    fontSize: 22,
    marginRight: 15,
  },
  menuText: {
    fontSize: 22,
    flex: 1,
  },
  errorIcon: {
    fontSize: 22,
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 10,
  },
  logoutButton: {
    backgroundColor: "#f8d7da",
  },
});

export default ProfileScreen;
