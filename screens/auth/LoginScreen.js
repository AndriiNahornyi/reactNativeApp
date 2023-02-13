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
} from "react-native";
import { useDispatch } from "react-redux";
import { authSignInUser } from "../../redux/auth/authOperations";

const initialState = {
  mail: "",
  password: "",
};
export default function LoginScreen({ navigation }) {
  // console.log(navigation);
  // console.log(Platform.OS);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);

  const dispatch = useDispatch();

  const login = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    dispatch(authSignInUser(state));
    // console.log(state);
    setState(initialState);
  };
  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require("../../assets/images/Photo-BG.jpg")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : ""}
          >
            <View
              style={{
                ...Platform.select({
                  ios: {
                    ...styles.form,
                    marginBottom: isShowKeyboard ? 58 : 0,
                    // marginBottom: isShowKeyboard ? 180 : 0,
                  },
                  android: {
                    ...styles.form,
                    // paddingBottom: isShowKeyboard ? 0 : 140,
                  },
                }),
              }}
            >
              <Text style={styles.text}>Увійти</Text>
              <TextInput
                // onSubmitEditing={onReturn}
                style={styles.input}
                placeholder="Адреса електронної пошти"
                placeholderTextColor="#BDBDBD"
                value={state.mail}
                onFocus={() => setIsShowKeyboard(true)}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, mail: value }))
                }
              />
              <View>
                <TextInput
                  // onSubmitEditing={onReturn}
                  style={styles.input}
                  placeholder="Пароль"
                  placeholderTextColor="#BDBDBD"
                  value={state.password}
                  secureTextEntry={true}
                  onFocus={() => setIsShowKeyboard(true)}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, password: value }))
                  }
                />
                <Text
                  // onPress={() => {
                  //   setIsPasswordSecure(!isPasswordSecure);
                  // }}              або
                  // onPress={changeIsPasswordSecure}
                  style={styles.showPassword}
                >
                  {/* {isPasswordSecure ? "Показати" : "Приховати"} */}
                </Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.btn}
                onPress={login}
              >
                <Text style={styles.btnTitle}>Увійти</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("Registration")}
              >
                <Text style={styles.login}>Немає акаунту? Зареєструватися</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  text: {
    marginHorizontal: 16,
    marginBottom: 16,
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.01,
    textAlign: "center",
    fontFamily: "Roboto-Medium",
  },
  input: {
    marginTop: 16,
    marginHorizontal: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    color: "#212121",
    backgroundColor: "#F6F6F6",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    lineHeight: 19,
  },
  showPassword: {
    position: "absolute",
    top: 32,
    // top: 152,
    right: 32,
    color: "#1B4371",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
  },
  form: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 32,
    height: 489,
    backgroundColor: "#fff",
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 43,
    marginBottom: 16,
    marginHorizontal: 16,
    backgroundColor: "#ff6c00",
    height: 51,
    borderRadius: 100,
  },
  btnTitle: {
    color: "#fff",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
  },
  login: {
    color: "#1B4371",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
  },
});
