import React from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function MapScreen({ route }) {
  //   console.log("route.params", route.params.location);
  //   const { latitude, longitude } = route.params.location;
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: 50.516339,
          longitude: 30.602185,
          //   latitude: latitude,
          //   longitude: longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.006,
        }}
      >
        <Marker
          coordinate={{
            latitude: 50.516339,
            longitude: 30.602185,
            // latitude: latitude,
            // longitude: longitude,
          }}
          title="photo location"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
