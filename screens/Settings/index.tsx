import { useSettingsPresenter } from "./settings.presenter";
import React from "react";
import { settingsStyles } from "./settings.style";
import { SettingsUI } from "./settings.ui";
import { useSettingsRepo } from "./settings.repo";
import { commonStyles } from "@app/constants/Classifications";
import { SettingsStackNavigationProps } from "@app/navigation/types";


export default function SettingsScreen({
  navigation,
  route,
}: 
SettingsStackNavigationProps<"SettingsScreen">) {
  const repo = useSettingsRepo({});
  const presenter = useSettingsPresenter({
    navigation,
    route,
    repo,
  });

  return (
    <SettingsUI
      styles={{ ...settingsStyles, ...commonStyles }}
      presenter={presenter}
    />
  );
}
