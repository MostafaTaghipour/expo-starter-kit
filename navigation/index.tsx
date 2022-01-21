import AppUpdateHandler from "@app/components/AppUpdateHandler";
import { useAppTheme, useAppLocale } from "@app/hooks";
import { BottomSheetProvider } from "@app/providers/BottomSheetProvider";
import { DialogProvider } from "@app/providers/DialogProvider";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import NotFoundScreen from "../screens/NotFoundScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";
import { RootStackParamList, dialogOptions } from "./types";
import { RootSiblingParent } from "react-native-root-siblings";

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation() {
  const { theme, dark } = useAppTheme();

  let navTheme = dark ? DarkTheme : DefaultTheme;
  navTheme = {
    ...navTheme,
    colors: {
      ...navTheme.colors,
      primary: theme.colors.brand,
      card: theme.colors.surface,
      background: theme.colors.background,
      border: theme.colors.border,
    },
  };

  return (
    <NavigationContainer linking={LinkingConfiguration} theme={navTheme}>
      <RootSiblingParent>
        <BottomSheetProvider>
          <DialogProvider>
            <>
              <RootNavigator />
              <AppUpdateHandler />
            </>
          </DialogProvider>
        </BottomSheetProvider>
      </RootSiblingParent>
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  const { t } = useAppLocale();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} mode="modal">
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: t("not_found.title") }}
      />
      {/* <Stack.Screen
        name="Dialog"
        component={Dialog}
        options={{ ...dialogOptions }}
      /> */}
    </Stack.Navigator>
  );
}
