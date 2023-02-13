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
import { authSignUpUser } from "../../redux/auth/authOperations";

const initialState = {
  mail: "",
  password: "",
  login: "",
  // photo: '',
};

export default function RegistrationScreen({ navigation }) {
  // console.log(navigation);
  // console.log(Platform.OS);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);

  const dispatch = useDispatch();

  const registration = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    dispatch(authSignUpUser(state));
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
                    marginBottom: isShowKeyboard ? 140 : 0,
                    // marginBottom: isShowKeyboard ? 180 : 0,
                  },
                  android: {
                    ...styles.form,
                    // paddingBottom: isShowKeyboard ? 0 : 78,
                  },
                }),
              }}
            >
              <Text style={styles.text}>Реєстрація</Text>
              <TextInput
                // onSubmitEditing={onReturn}
                style={styles.input}
                placeholder="Логін"
                placeholderTextColor="#BDBDBD"
                value={state.login}
                onFocus={() => setIsShowKeyboard(true)}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, login: value }))
                }
              />
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
                // }}   або
                //   onPress={changeIsPasswordSecure}
                style={styles.showPassword}
              >
                {/* {isPasswordSecure ? "Показати" : "Приховати"} */}
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.btn}
                onPress={registration}
              >
                <Text style={styles.btnTitle}>Зареєструватися</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.login}>Вже є акаунт? Увійти</Text>
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
    justifyContent: "flex-end",
    resizeMode: "cover",
  },
  text: {
    marginTop: 92,
    marginHorizontal: 16,
    marginBottom: 16,
    textAlign: "center",
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.01,
    fontFamily: "Roboto-Medium",
  },
  input: {
    position: "relative",
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    color: "#212121",
    backgroundColor: "#F6F6F6",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
  },
  showPassword: {
    position: "absolute",
    top: 32,
    // top: 320,
    right: 32,
    color: "#1B4371",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
  },
  form: {
    position: "relative",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 32,
    height: 549,
    backgroundColor: "#fff",
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 43,
    marginBottom: 16,
    height: 51,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
  btnTitle: {
    color: "#fff",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
  },
  login: {
    textAlign: "center",
    color: "#1B4371",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
  },
});
