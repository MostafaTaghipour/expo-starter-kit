import { View } from "react-native";
import React from "react";
import { DetailUIProps } from "./detail.type";
import ContentView from "@app/components/ContentView";

export const DetailUI = ({ styles, presenter }: DetailUIProps) => {
  return <ContentView contentStyle={styles.container}></ContentView>;
};
