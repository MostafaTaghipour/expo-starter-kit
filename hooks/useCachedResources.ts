import Constants from "expo-constants";
import I18n from "@app/helpers/I18N";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import * as ScreenOrientation from "expo-screen-orientation";
import userAgent from "@app/net/userAgent";

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load locales
        await I18n.initAsync();

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          "iran-sans-regular": require("@app/assets/fonts/IranSans/IRANSansMobile.ttf"),
          "iran-sans-light": require("@app/assets/fonts/IranSans/IRANSansMobile_Light.ttf"),
          "iran-sans-bold": require("@app/assets/fonts/IranSans/IRANSansMobile_Bold.ttf"),
          "rubik-regular": require("@app/assets/fonts/Rubik/Rubik-Regular.ttf"),
          "rubik-light": require("@app/assets/fonts/Rubik/Rubik-Light.ttf"),
          "rubik-bold": require("@app/assets/fonts/Rubik/Rubik-Bold.ttf"),
        });

        // get user agent
        const ua = await Constants.getWebViewUserAgentAsync();
        userAgent.setUserAgent(ua);

        // lock screen orientation
        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.PORTRAIT_UP
        );
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
