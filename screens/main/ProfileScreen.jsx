import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import { useDispatch } from "react-redux";
import { authSignOutUser } from "../../redux/auth/authOperations";
import db from "../../firebase/config";

export default function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(authSignOutUser());
  };
  return (
    <View style={styles.container}>
      <Text>ProfileScreen</Text>
      <View style={styles.box}>
        <Button title="signOut" onPress={signOut} />
        {/* <TouchableOpacity
          style={styles.out}
          onPress={signOut}
        ></TouchableOpacity> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
