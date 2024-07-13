import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const CustomHeader = ({ title, subtitle, navigation }) => {
  return (
    <View style={styles.headerContainer}>
      <View>
        <Text style={styles.headerTitle}>{title}</Text>
        {subtitle && <Text style={styles.headerSubtitle}>{subtitle}</Text>}
      </View>
      <View style={styles.headerIcons}>
        <TouchableOpacity onPress={() => {}}>
          <Icon
            name="search-outline"
            size={25}
            color="black"
            style={{ marginRight: 30 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Icon
            name="notifications-outline"
            size={25}
            color="black"
            style={{ marginRight: 20 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    height: 60,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  headerSubtitle: {
    marginTop: 5,
    color: "#dc3558",
    fontSize: 14,
    fontWeight: "500",
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default CustomHeader;
