import React from "react";
import { Stack } from "expo-router";
import { useEffect } from 'react';
import { useFonts, Inter_600SemiBold, Inter_700Bold, Inter_400Regular, Inter_900Black } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontLoaded, fontError] = useFonts({
    Inter: Inter_400Regular,
    InterSemi: Inter_600SemiBold,
    InterBold: Inter_700Bold,
    InterBlack: Inter_900Black,
  });

  useEffect(() => {
    if (fontLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontLoaded, fontError]);

  if (!fontLoaded && !fontError) {
    return null;
  }
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Stack screenOptions={{}}>
        <Stack.Screen name="index" options={{ title: 'Onboarding' }} />
      </Stack>
    </GestureHandlerRootView>
  );
}