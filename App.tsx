import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppearanceProvider } from "react-native-appearance";
import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";
import { enableScreens } from "react-native-screens";
import { persistor, store } from "./store";
import { Provider as ReduxProvider, useDispatch } from "react-redux";
import { PersistGate as ReduxPersistGate } from "redux-persist/integration/react";
import NetInfo from "@react-native-community/netinfo";
import {
  setAppRunningCountAndLastRunningSessionIdAction,
  setConnectivityStatusAction,
} from "./store/app/actions";
import Constants from "expo-constants";
import { LocalizationProvider } from "./providers/LocalizationProvider";
import { ThemeProvider } from "./providers/ThemeProvider";
import { LogBox, Platform, UIManager } from "react-native";
import ThemeManager from "./helpers/ThemeManager";

//todo resolve all warnings
LogBox?.ignoreAllLogs();

/**
 * react-native-screens provides native primitives to represent screens instead of
 * plain <View> components in order to better take advantage of operating system
 * behavior and optimizations around screens
 *
 * https://github.com/software-mansion/react-native-screens
 */
enableScreens();

// enable LayoutAnimation
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

/** TODO:
 *
 * enable service worker for pwa offline support (https://github.com/expo/fyi/blob/master/enabling-web-service-workers.md)
 * customize splash screen (https://github.com/expo/expo-cli/tree/master/packages/configure-splash-screen)
 * add firebase crashlytics (https://rnfirebase.io/crashlytics/usage)
 * ejecting if need (https://docs.expo.io/workflow/customizing/ , https://docs.expo.io/bare/exploring-bare-workflow/)
 *
 */

// expo update
// boilerplate new page
// helmet
// netfly
// hermes
// resolve warnings
// redux + boilerplate
// test
// comment
// ssr
// pwa
// pixel perfect (responsive , scalable)
// date picker , time picker
// map
// forms
// bottomsheet
// flipper
// animation
// viewpager
// carousel
// progressbar , chackbox , radio , picker
// expo useful things
// app layout {header , content ,  footer}
// storybook
// easy app builder
// git flow
// react navigation 6 
// fastlane
// hoskey
// react-native-clean-project
// documentation

export default function AppContainer() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ReduxProvider store={store}>
        <ReduxPersistGate persistor={persistor}>
          <AppearanceProvider>
            <SafeAreaProvider>
              <ThemeProvider>
                <LocalizationProvider>
                  <App />
                </LocalizationProvider>
              </ThemeProvider>
            </SafeAreaProvider>
          </AppearanceProvider>
        </ReduxPersistGate>
      </ReduxProvider>
    );
  }
}

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setAppRunningCountAndLastRunningSessionIdAction(Constants.sessionId)
    );

    const unsubscribe = NetInfo.addEventListener((state) => {
      dispatch(setConnectivityStatusAction(state.isConnected));
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return (
    <>
      <Navigation />
      <StatusBar
        style={ThemeManager.selectTheme({ dark: "light", light: "dark" })}
      />
    </>
  );
}
