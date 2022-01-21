import useAppLocale from "@app/hooks/useAppLocale";
import DetailScreen from "@app/screens/Detail";
import HomeScreen from "@app/screens/Home";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HomeStackParamList, stackOptions } from "./types";


// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator<HomeStackParamList>();

export default function HomeNavigator() {
 
  // navigation.setOptions({
  //   tabBarVisible: route.state ? (route.state.index > 0 ? false : true) : null,
  // });

  const { t } = useAppLocale();
  return (
    <HomeStack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={stackOptions()}
    >
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerTitle: t("home.title") }}
      />
      <HomeStack.Screen
        name="DetailScreen"
        component={DetailScreen}
        options={{ headerTitle: t("detail.title") }}
      />
    </HomeStack.Navigator>
  );
}
