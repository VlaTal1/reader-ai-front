import React from "react";
import {AppState, ImageBackground, StyleSheet, useColorScheme} from "react-native";
import {Slot} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import {TamaguiProvider} from "tamagui";
import {useFonts} from "expo-font";

import tamaguiConfig from "@/styles/tamagui.config";
import {LanguageProvider} from "@/components/provider/LanguageProvider";

// Root layout. Accessible for both authenticated and not users.
// In future public pages should be added in app directory.
export default function Root() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    GeistRegular: require("@/assets/fonts/Geist/Geist-Regular.otf"),
    GeistMedium: require("@/assets/fonts/Geist/Geist-Medium.otf"),
    InterLight: require("@/assets/fonts/Inter/InterDisplay-Light.otf"),
    InterRegular: require("@/assets/fonts/Inter/InterDisplay-Regular.otf"),
    InterMedium: require("@/assets/fonts/Inter/InterDisplay-Medium.otf"),
  });

  if (!loaded) {
    return null;
  }

  const backgroundColor = "#E0E0DC"

  return (
      <LanguageProvider>
        <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme!}>
          {/*<Provider store={store}>*/}
            {/*<SupabaseAuthProvider>*/}
            {/*  <ImageBackground*/}
            {/*      source={require("@/assets/images/backgrounds/bg-food.png")}*/}
            {/*      style={[styles.backgroundImage, {backgroundColor}]}*/}
            {/*  >*/}
                <SafeAreaView style={[styles.safeArea]}>
                  <Slot/>
                </SafeAreaView>
              {/*</ImageBackground>*/}
            {/*</SupabaseAuthProvider>*/}
          {/*</Provider>*/}
        </TamaguiProvider>
      </LanguageProvider>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    height: "100%",
    resizeMode: "cover",
  },
  safeArea: {
    height: "100%",
  },
});
