import React from "react";
import { Ionicons as DefaultIonicons } from "@expo/vector-icons";
import { Platform } from "react-native";

export default function Ionicons(props: any) {
  let name: string = props.name;
  if (!name.startsWith("ios-") && !name.startsWith("md-"))
    name = Platform.select({ ios: "ios-", default: "md-" }) + props.name;
  return <DefaultIonicons {...props} name={name} />;
}
