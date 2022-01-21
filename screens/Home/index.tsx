import { useHomePresenter } from "./home.presenter";
import React from "react";
import { homeStyles } from "./home.style";
import { HomeUI } from "./home.ui";
import { useHomeRepo } from "./home.repo";
import { commonStyles } from "@app/constants/Classifications";
import { HomeStackNavigationProps } from "@app/navigation/types";

export default function HomeScreen({
  navigation,
  route,
}: HomeStackNavigationProps<"HomeScreen">) {
  const repo = useHomeRepo({});
  const presenter = useHomePresenter({
    navigation,
    route,
    repo,
  });

  return (
    <HomeUI styles={{ ...homeStyles, ...commonStyles }} presenter={presenter} />
  );
}
