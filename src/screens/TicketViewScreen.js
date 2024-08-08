import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Barcode from "react-native-barcode-builder";

const TicketViewScreen = () => {
  // Static barcode value for placeholder
  const barcodeValue = "TICKET123456789";

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Ticket</Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.detail}>Movie: The Grand Adventure</Text>
        <Text style={styles.detail}>Date: August 10, 2024</Text>
        <Text style={styles.detail}>Time: 7:30 PM</Text>
        <Text style={styles.detail}>Theater: Grand Cinema Hall</Text>
        <Text style={styles.detail}>Seat: A12</Text>
        <Text style={styles.detail}>Number of People: 2</Text>
        <Text style={styles.detail}>Number of Children: 1</Text>
        <Text style={styles.detail}>Booking Date: August 6, 2024</Text>
      </View>
      <View style={styles.barcodeContainer}>
        <Barcode value={barcodeValue} format="CODE128" />
      </View>
      <View style={styles.footer}>
        <Image
          source={{
            uri: "https://via.placeholder.com/150x50?text=Grand+Cinema",
          }} // Placeholder logo URL
          style={styles.logo}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  details: {
    marginBottom: 16,
    width: "100%",
    paddingHorizontal: 16,
  },
  detail: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: "center",
  },
  barcodeContainer: {
    alignItems: "center",
    marginVertical: 16,
    width: "100%",
  },
  footer: {
    alignItems: "center",
    marginTop: 16,
  },
  logo: {
    width: 150,
    height: 50,
    resizeMode: "contain",
  },
});

export default TicketViewScreen;
