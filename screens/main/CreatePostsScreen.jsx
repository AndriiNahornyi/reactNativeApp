import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
// icons import
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export default function CreateScreen({ navigation }) {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log(status);
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }
    })();
  }, []);
  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    let location = await Location.getCurrentPositionAsync({});
    console.log(location.coords.latitude);
    console.log(location.coords.longitude);
    setPhoto(photo.uri);
    // console.log(photo);
    // console.log("camera --->", photo.uri);
  };
  const sendPhoto = async () => {
    console.log(navigation);
    navigation.navigate("Home", { photo });
  };
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={setCamera}>
        {photo && (
          <View style={styles.takePhotoContainer}>
            <Image source={{ uri: photo }} style={styles.photo} />
          </View>
        )}
        <TouchableOpacity style={styles.snapContainer} onPress={takePhoto}>
          <FontAwesome name="camera" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </Camera>
      <Text style={styles.text}>Завантажити фото</Text>
      <View>
        <TouchableOpacity style={styles.btnSubmit} onPress={sendPhoto}>
          <Text style={styles.btnText}>Опублікувати</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    // justifyContent: "center",
    // alignItems: "center",
  },
  camera: {
    height: 240,
    marginTop: 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E8E8E8",
    // overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  snap: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  snapContainer: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  takePhotoContainer: {
    position: "absolute",
    // top: 0,
    // left: 0,
    // borderWidth: 1,
    // borderColor: "#E8E8E8",
    // borderRadius: 8,
  },
  photo: {
    height: 240,
    width: 240,
    // width: Dimensions.get("window").width - 32,
    borderRadius: 8,
  },
  text: {
    color: "#BDBDBD",
    marginLeft: 16,
    marginTop: 8,
    fontFamily: "Roboto-Regular",
    marginBottom: 32,
    fontSize: 16,
    lineHeight: 19,
  },
  btnSubmit: {
    marginTop: 32,
    marginHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 16,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#FFFFFF",
  },
});
