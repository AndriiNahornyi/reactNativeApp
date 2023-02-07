import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Button,
} from "react-native";
const initialState = {
  email: "",
  password: "",
};
export default function LoginScreen({ navigation }) {
  // console.log(navigation);
  // console.log(Platform.OS);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    // console.log(state);
    setState(initialState);
  };
  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View
        style={styles.container}
        // onLayout={onLayoutRootView}
      >
        <ImageBackground
          style={styles.image}
          source={require("../../assets/images/fire.png")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View
              style={{
                // ...Platform.select({
                //   ios: {
                ...styles.form,
                marginBottom: isShowKeyboard ? 20 : 150,
                //   },
                //   android: {
                //     ...styles.form,
                //   },
                // }),
              }}
            >
              <View style={styles.header}>
                <Text style={styles.text}>Glory to Ukraine!</Text>
                <Text style={styles.text}>Glory to the Heroes!</Text>
              </View>
              <View>
                <Text style={styles.inputTitle}>EMAIL ADDRESS</Text>
                <TextInput
                  style={styles.input}
                  textAlign={"center"}
                  onFocus={() => setIsShowKeyboard(true)}
                  value={state.email}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                />
              </View>
              <View style={{ marginTop: 5 }}>
                <Text style={styles.inputTitle}>PASSWORD</Text>
                <TextInput
                  style={styles.input}
                  textAlign={"center"}
                  secureTextEntry={true}
                  onFocus={() => setIsShowKeyboard(true)}
                  value={state.password}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, password: value }))
                  }
                />
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.btn}
                onPress={keyboardHide}
              >
                <Text style={styles.btnTitle}>SIGN IN</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("Registration")}
                style={{
                  marginTop: 10,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    color: "#fff",
                  }}
                >
                  New to application?
                  <Text
                    style={{
                      fontSize: 24,
                      color: "#7fff00",
                    }}
                  >
                    Sign Up
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
          <StatusBar style="auto" />
        </ImageBackground>
        {/* <StatusBar style="auto" /> */}
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // marginBottom: 100,
    // alignItems: "center",
    // justifyContent: "center",
  },
  text: {
    color: "yellow",
    fontSize: 28,
    // marginHorizontal: 10,
    marginBottom: 10,
    fontFamily: "Roboto-Regular",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    // alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ffff00",
    borderRadius: 10,
    padding: 5,
    color: "#29abf4",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1.5,
    // width: 340,
    // marginHorizontal: 30,
  },
  form: {
    marginHorizontal: 30,
    marginBottom: 100,
  },
  inputTitle: {
    color: "#29abf4",
    marginBottom: 5,
    fontSize: 14,
  },
  btn: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    // marginHorizontal: 40,
    justifyContent: "center",
    alignItems: "center",

    ...Platform.select({
      ios: {
        borderColor: "transparent",
        backgroundColor: "yellow",
      },
      android: {
        borderColor: "#29abf4",
        backgroundColor: "#29abf4",
      },
    }),
  },
  btnTitle: {
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 1.2,
    ...Platform.select({
      ios: {
        color: "#29abf4",
      },
      android: {
        color: "yellow",
      },
    }),
  },
  header: {
    alignItems: "center",
    // marginBottom: 120,
  },
});
