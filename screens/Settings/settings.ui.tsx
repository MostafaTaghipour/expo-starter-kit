import React from "react";
import { SettingsUIProps } from "./settings.type";
import { Button } from "@app/components/UIKit";
import useAppLocale from "@app/hooks/useAppLocale";
import ContentView from "@app/components/ContentView";

export const SettingsUI = ({ styles, presenter }: SettingsUIProps) => {
  const { t } = useAppLocale();
  return (
    <ContentView contentStyle={styles.container}>
      
    </ContentView>
  );
};
