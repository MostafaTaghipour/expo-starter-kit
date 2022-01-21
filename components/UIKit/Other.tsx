import React from "react";
import {
  ActivityIndicator as DefaultActivityIndicator,
  Switch as DefaultSwitch,
} from "react-native";
import { hexToRGB } from "@app/helpers/UIHelper";
import useAppTheme from "@app/hooks/useAppTheme";


export type ActivityIndicatorProps = {} & DefaultActivityIndicator["props"];

export function ActivityIndicator(props: ActivityIndicatorProps) {
  const { ...otherProps } = props;
  const { theme } = useAppTheme();

  return <DefaultActivityIndicator color={theme.colors.brand} {...otherProps} />;
}


// TODO: thumb color on web
export type SwitchProps = {} & DefaultSwitch["props"];

export function Switch(props: SwitchProps) {
  const { disabled, value, ...otherProps } = props;
  const { theme } = useAppTheme();

  const activeTrackColor = hexToRGB(theme.colors.brand, 0.5);
  const thumbColor = value ? theme.colors.brand : "#fff";

  return (
    <DefaultSwitch
      trackColor={{
        true: activeTrackColor,
        false: "#d3d3d3",
      }}
      disabled={disabled}
      value={value}
      thumbColor={thumbColor}
      {...otherProps}
    />
  );
}
