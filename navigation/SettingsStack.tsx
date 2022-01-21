import useAppLocale from "@app/hooks/useAppLocale";
import SettingsScreen from "@app/screens/Settings";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { SettingsStackParamList, stackOptions } from "./types";

const SettingsStack = createStackNavigator<SettingsStackParamList>();

export default function SettingsNavigator() {
  // navigation.setOptions({
  //   tabBarVisible: route.state ? (route.state.index > 0 ? false : true) : null,
  // });

  const { t } = useAppLocale();
  return (
    <SettingsStack.Navigator screenOptions={stackOptions()}>
      <SettingsStack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{ headerTitle: t("settings.title") }}
      />
    </SettingsStack.Navigator>
  );
}
