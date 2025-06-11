import { SplashScreen, Stack } from "expo-router";

import "./globals.css";
import {useFonts} from "expo-font";
import { useEffect } from "react";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Rubik-Bold": require('../assets/fonts/Rubik-Bold.ttf'),
    "Rubik-ExtraBold": require('../assets/fonts/Rubik-ExtraBold.ttf'),
    "Rubik-Light": require('../assets/fonts/Rubik-Light.ttf'),
    "Rubik-Medium": require('../assets/fonts/Rubik-Medium.ttf'),
    "Rubik-Regular": require('../assets/fonts/Rubik-Regular.ttf'),
    "Rubik-SemiBold": require('../assets/fonts/Rubik-SemiBold.ttf'),
  })

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
  }
  //if fonts loaded, hide the splash screen
}, [fontsLoaded]); // check if fontsLoaded changes

if(!fontsLoaded) return null;
// If fonts are not loaded, return null to avoid rendering the app prematurely
//else, return the main Stack component


  return <Stack screenOptions={{headerShown: false}} />;
}
