import { SimpleLineIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import HomeNavigator from "./HomeStack";
import SettingsNavigator from "./SettingsStack";
import { BottomTabParamList } from "./types";
import BottomTabBar from "@app/components/BottomTabBar";
import { useAppLocale, useAppTheme } from "@app/hooks";
import Ionicons from "@app/components/Ionicons";
import { Caption } from "@app/components/UIKit";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const { theme } = useAppTheme();
  const { t } = useAppLocale();
  return (
    <BottomTab.Navigator
      tabBar={(props) => (
        <BottomTabBar {...props} translucent={theme.tranclucent} />
      )}
      initialRouteName="HomeStack"
      tabBarOptions={{
        // showLabel: false,
        keyboardHidesTabBar: true,
        labelPosition:'below-icon'
      }}
    >
      <BottomTab.Screen
        name="HomeStack"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          tabBarLabel: ({ color }) => (
            <TabBarLabel title={t("home.title")} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="SettingsStack"
        component={SettingsNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="settings" color={color} />
          ),
          tabBarLabel: ({ color }) => (
            <TabBarLabel title={t("settings.title")} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={28} {...props} />;
}

function TabBarLabel(props: { title: string; color: string }) {
  return <Caption style={{ color: props.color }}>{props.title}</Caption>;
}
