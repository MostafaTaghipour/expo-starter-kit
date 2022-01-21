import Constants from "expo-constants";
import * as Linking from "expo-linking";

export default {
  prefixes: [
    Linking.makeUrl("/"),
    `https://${Constants.manifest.name}.com`,
    `${Constants.manifest.name}://`,
  ],
  config: {
    screens: {
      Root: {
        path: "",
        initialRouteName: "HomeStack",
        screens: {
          HomeStack: {
            path: "",
            initialRouteName: "HomeScreen",
            screens: {
              HomeScreen: "",
              DetailScreen: "detail",
            },
          },
          SettingsStack: {
            path: "settings",
            initialRouteName: "SettingsScreen",
            screens: {
              SettingsScreen: "",
            },
          },
        },
      },
      Dialog: "Dialog",
      NotFound: "*",
    },
  },
};
