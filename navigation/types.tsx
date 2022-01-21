import React from "react";

import {
  StackNavigationOptions,
  StackNavigationProp,
  TransitionPresets,
} from "@react-navigation/stack";
import { Platform } from "react-native";
import I18N from "@app/helpers/I18N";
import Ionicons from "@app/components/Ionicons";
import { RouteProp } from "@react-navigation/native";
import StackHeader, {
  StackHeaderBackground,
} from "@app/components/StackHeader";
import { useAppFont, useAppTheme } from "@app/hooks";

export const stackOptions = (): StackNavigationOptions => {
  const { theme } = useAppTheme();
  const { bold } = useAppFont();
  return {
    // headerBackTitleVisible: false,
    header: (props) => {
      return <StackHeader {...props} translucent={theme.tranclucent} />;
    },
    headerBackground: (props) => {
      return (
        <StackHeaderBackground {...props} translucent={theme.tranclucent} />
      );
    },
    headerTransparent: theme.tranclucent,
    headerBackImage: () => (
      <Ionicons
        name={I18N.selectDir({ rtl: "arrow-forward", ltr: "arrow-back" })}
        size={24}
        color={theme.colors.brand}
        style={{ marginHorizontal: theme.defaultPadding }}
      />
    ),
    headerTitleStyle: {
      textAlign: Platform.select({ ios: "center", default: "left" }),
      fontFamily: bold,
    },
    // gestureEnabled: true,
    cardOverlayEnabled: true,
    // ...TransitionPresets.SlideFromRightIOS,
  };
};

export const modalOptions = (): StackNavigationOptions => {
  const { theme } = useAppTheme();
  const { bold } = useAppFont();
  return {
    headerBackTitleVisible: false,
    headerBackImage: () => (
      <Ionicons
        name="close"
        size={30}
        color={theme.colors.brand}
        style={{ marginHorizontal: theme.defaultPadding }}
      />
    ),
    headerTitleStyle: {
      textAlign: Platform.select({ ios: "center", default: "left" }),
      fontFamily: bold,
    },
    gestureEnabled: true,
    cardOverlayEnabled: true,
    ...Platform.select({
      ios: { ...TransitionPresets.ModalPresentationIOS },
      android: { ...TransitionPresets.RevealFromBottomAndroid },
    }),
  };
};

export const dialogOptions: StackNavigationOptions = {
  animationEnabled: true,
  cardOverlayEnabled: true,
  cardStyle: {
    backgroundColor: "transparent",
  },

  cardStyleInterpolator: ({ current: { progress } }) => {
    return {
      containerStyle: {
        backgroundColor: "transparent",
      },
      cardStyle: {
        backgroundColor: "transparent",
        opacity: progress.interpolate({
          inputRange: [0, 0.5, 0.9, 1],
          outputRange: [0, 0.25, 0.7, 1],
        }),
        transform: [
          {
            scale: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [1.2, 1],
              extrapolate: "clamp",
            }),
          },
        ],
      },
      overlayStyle: {
        opacity: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0.5],
          extrapolate: "clamp",
        }),
      },
    };
  },
};

/* #region  shared */
export type SharedParamList = {
  // Auth: undefined;
};

export type SharedStackNavigationProps<T extends keyof SharedParamList> = {
  navigation: StackNavigationProp<SharedParamList, T>;
  route: RouteProp<SharedParamList, T>;
};
/* #endregion */

/* #region  root */
export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  Dialog: undefined;
} & SharedParamList;

export type RootStackNavigationProps<T extends keyof RootStackParamList> = {
  navigation: StackNavigationProp<RootStackParamList, T>;
  route: RouteProp<RootStackParamList, T>;
};
/* #endregion */

/* #region  bottom tab */
export type BottomTabParamList = {
  HomeStack: undefined;
  SettingsStack: undefined;
} & SharedParamList;

export type BottomTabNavigationProps<T extends keyof BottomTabParamList> = {
  navigation: StackNavigationProp<BottomTabParamList, T>;
  route: RouteProp<BottomTabParamList, T>;
};
/* #endregion */

/* #region  home */
export type HomeStackParamList = {
  HomeScreen: undefined;
  DetailScreen: undefined;
} & SharedParamList;

export type HomeStackNavigationProps<T extends keyof HomeStackParamList> = {
  navigation: StackNavigationProp<HomeStackParamList, T>;
  route: RouteProp<HomeStackParamList, T>;
};
/* #endregion */

/* #region  settings */
export type SettingsStackParamList = {
  SettingsScreen: undefined;
} & SharedParamList;

export type SettingsStackNavigationProps<
  T extends keyof SettingsStackParamList
> = {
  navigation: StackNavigationProp<SettingsStackParamList, T>;
  route: RouteProp<SettingsStackParamList, T>;
};

/* #endregion */
