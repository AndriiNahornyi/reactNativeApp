import React, { useState, useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "./router";
// import { useFonts } from "expo-font";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import * as SplashScreen from "expo-splash-screen";
SplashScreen.preventAutoHideAsync();
// import {} from "react-native";
const loadApplication = async () => {
  await Font.loadAsync({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });
};
export default function App() {
  const [isReady, setIsReady] = useState(false);
  const routing = useRoute(null);
  // const [fontsLoaded] = useFonts({
  //   "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  //   "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  //   "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  // });
  // const onLayoutRootView = useCallback(async () => {
  //   if (fontsLoaded) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded]);

  // if (!fontsLoaded) {
  //   return null;
  // }
  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadApplication}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }
  return (
    <NavigationContainer
    // {/* onLayout={onLayoutRootView} */}
    >
      {routing}
    </NavigationContainer>
  );
}
