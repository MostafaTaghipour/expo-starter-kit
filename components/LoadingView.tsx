import { commonStyles } from "@app/constants/Classifications";
import { useAppTheme, useAppLocale } from "@app/hooks";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "./UIKit";
export type LoadingViewProps = {} & View["props"];

const LoadingView = (props: LoadingViewProps) => {
  const { style, ...oteherProps } = props;
  const { theme } = useAppTheme();

  return (
    <View style={[styles.container, style]} {...oteherProps}>
      <ActivityIndicator color={theme.colors.brand} size="large" />
    </View>
  );
};

export default LoadingView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
