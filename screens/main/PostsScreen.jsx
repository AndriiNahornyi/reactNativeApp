import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function PostsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>PostsScreen</Text>
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
