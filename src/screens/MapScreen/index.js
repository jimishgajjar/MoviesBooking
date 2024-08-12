import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import MapboxGL from "@rnmapbox/maps";

MapboxGL.setAccessToken(
  "sk.eyJ1Ijoid2ViaG9zdDQ2NiIsImEiOiJjbHprc2FvZGkxMW0yMnJwcTZ6YzEyZjJwIn0.rKw8N1rVDodFVIYIUbunRw"
);

const annotations = [
  {
    id: "annotation1",
    coordinate: [-79.90186, 43.53161],
    title: "Location 1",
    description: "Description for Location 1",
    image: require("../../assets/images/mapmarker.png"),
  },
  {
    id: "annotation2",
    coordinate: [-79.9032, 43.5328],
    title: "Location 2",
    description: "Description for Location 2",
    image: require("../../assets/images/mapmarker.png"),
  },
  {
    id: "annotation3",
    coordinate: [-79.9042, 43.5338],
    title: "Location 3",
    description: "Description for Location 3",
    image: require("../../assets/images/mapmarker.png"),
  },
];

export default function MapAnnotation() {
  useEffect(() => {
    MapboxGL.setTelemetryEnabled(false);
  }, []);

  const [selectedAnnotation, setSelectedAnnotation] = useState(null);

  const handleMarkerPress = (annotation) => {
    setSelectedAnnotation(annotation);
  };

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapboxGL.MapView
          style={styles.map}
          styleURL={MapboxGL.StyleURL.Satellite}
        >
          <MapboxGL.Camera
            zoomLevel={15}
            centerCoordinate={annotations[0].coordinate}
          />
          {annotations.map((annotation) => (
            <MapboxGL.PointAnnotation
              key={annotation.id}
              id={annotation.id}
              coordinate={annotation.coordinate}
              onSelected={() => handleMarkerPress(annotation)}
            >
              <Image source={annotation.image} style={styles.markerIcon} />
              {selectedAnnotation &&
                selectedAnnotation.id === annotation.id && (
                  <MapboxGL.Callout
                    title={selectedAnnotation.title}
                    contentStyle={styles.calloutContent}
                  >
                    <Text>{selectedAnnotation.description}</Text>
                  </MapboxGL.Callout>
                )}
            </MapboxGL.PointAnnotation>
          ))}
        </MapboxGL.MapView>
      </View>
      <View style={styles.infoBox}>
        {selectedAnnotation && (
          <>
            <Text style={styles.infoTitle}>{selectedAnnotation.title}</Text>
            <Text>{selectedAnnotation.description}</Text>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    height: "100%",
    width: "100%",
  },
  map: {
    flex: 1,
  },
  markerIcon: {
    width: 40,
    height: 40,
  },
  calloutContent: {
    borderRadius: 5,
    padding: 10,
    backgroundColor: "white",
  },
  infoBox: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    padding: 15,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
});
