import React from "react";
import {} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../nestedScreens/Home";
import CommentsScreen from "../nestedScreens/CommentsScreen";
import MapScreen from "../nestedScreens/MapScreen";

const NestedScreen = createNativeStackNavigator();

export default function PostsScreen({ route }) {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen name="Home" component={Home} />
      <NestedScreen.Screen name="Comments" component={CommentsScreen} />
      <NestedScreen.Screen name="Map" component={MapScreen} />
    </NestedScreen.Navigator>
  );
}
