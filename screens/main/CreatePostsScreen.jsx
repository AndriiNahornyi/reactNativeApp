import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
} from "react-native";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import db from "../../firebase/config";
// icons import
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

export default function CreateScreen({ navigation }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [title, setTitle] = useState("");
  const [place, setPlace] = useState("");
  const [location, setLocation] = useState(null);

  const { userId, login } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    })();
  }, []);

  const takePhoto = async () => {
    console.log("location", location);
    console.log("title", title);
    console.log("place", place);
    const { status } = await Camera.requestCameraPermissionsAsync();

    if (status !== "granted") {
      console.log("Permission to access camera was denied");
      return;
    }
    const { uri } = await camera.takePictureAsync();

    setPhoto(uri);
    console.log("photo uri ", uri);
  };

  const sendPhoto = () => {
    uploadPostToServer();
    navigation.navigate("Home");
  };
  const uploadPostToServer = async () => {
    const photo = await uploadPhotoToServer();
    const createPost = await db.firestore().collection("posts").add({
      photo,
      title,
      location: location.coords,
      place,
      userId,
      login,
    });
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);
    const file = await response.blob();
    const uniquePostId = Date.now().toString();
    await db.storage().ref(`postImage/${uniquePostId}`).put(file);

    const processedPhoto = await db
      .storage()
      .ref("postImage")
      .child(uniquePostId)
      .getDownloadURL();
    return processedPhoto;
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
        <TextInput
          style={styles.title}
          placeholder={"Назва..."}
          value={title}
          onChangeText={(value) => {
            setTitle((prev) => ({ ...prev, value }));
          }}
          onFocus={() => {
            setIsShowKeyboard(true);
          }}
        />
        <TextInput
          style={styles.place}
          placeholder={"Місцевість..."}
          value={place}
          onChangeText={(value) => {
            setPlace((prev) => ({ ...prev, value }));
          }}
          onFocus={() => {
            setIsShowKeyboard(true);
          }}
        />
        <View style={{ position: "absolute", top: 65, left: 16 }}>
          <Feather name="map-pin" size={24} color="#BDBDBD" />
        </View>
      </View>
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
    // width: 240,
    width: Dimensions.get("window").width - 32,
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
  title: {
    paddingBottom: 16,
    paddingTop: 16,
    marginHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  place: {
    paddingBottom: 16,
    paddingTop: 16,
    paddingLeft: 28,
    marginHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
});
