
import {useAppTheme} from "@app/hooks";
import {
  BottomTabBar as DefaultBottomTabBar,
  BottomTabBarProps,
} from "@react-navigation/bottom-tabs";
import React from "react";
import { LayoutChangeEvent, View, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";


let _bottomBarCurrentHeight = 0;
//todo
let _bottomBarIsVisible = true;

//todo hide on scroll down
export function getCurrentBottomBarHeight() {
  return _bottomBarCurrentHeight;
}

export function isBottomBarVisible() {
  return _bottomBarIsVisible;
}

type Props = {
  translucent?: boolean;
} & BottomTabBarProps;

export default function BottomTabBar(props: Props) {
  const { dark } = useAppTheme();
  const { style, translucent, ...otherProps } = props;

  const onLayout = (event: LayoutChangeEvent) => {
    let height = event.nativeEvent.layout.height;
    _bottomBarCurrentHeight = height;
  };
  return translucent ? (
    <BlurView
      onLayout={onLayout}
      style={styles.absoluteTabBar}
      brand={dark ? "dark" : "light"}
      intensity={100}
    >
      <DefaultBottomTabBar
        style={[styles.translucentTab, style]}
        {...otherProps}
      />
    </BlurView>
  ) : (
    <View onLayout={onLayout}>
      <DefaultBottomTabBar style={[style]} {...otherProps} />
    </View>
  );
}

const styles = StyleSheet.create({
  absoluteTabBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 0,
  },
  translucentTab: {
    backgroundColor: "transparent",
    elevation: 0.5,
  },
});
