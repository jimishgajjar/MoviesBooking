import React from "react";
import { View, StyleSheet } from "react-native";
import MapboxGL from "@rnmapbox/maps";

MapboxGL.setAccessToken(
  "sk.eyJ1Ijoid2ViaG9zdDQ2NiIsImEiOiJjbHprc2FvZGkxMW0yMnJwcTZ6YzEyZjJwIn0.rKw8N1rVDodFVIYIUbunRw"
);

const latitude = 43.5248564;
const longitude = -79.8709313;

const App = () => {
  return (
    <View style={styles.container}>
      <MapboxGL.MapView style={styles.map}>
        <MapboxGL.Camera
          zoomLevel={10}
          centerCoordinate={[longitude, latitude]}
        />
        <MapboxGL.PointAnnotation
          id="marker1"
          coordinate={[longitude, latitude]}
        >
          <View style={styles.marker}>
            {/* You can use an Image or other React Native components to represent the marker */}
            <View style={styles.markerIcon} />
          </View>
        </MapboxGL.PointAnnotation>
      </MapboxGL.MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  marker: {
    width: 30,
    height: 30,
    backgroundColor: "red",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  markerIcon: {
    width: 20,
    height: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
});

export default App;
