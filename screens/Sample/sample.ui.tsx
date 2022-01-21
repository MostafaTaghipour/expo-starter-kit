import React from "react";
import { SampleUIProps } from "./sample.type";
import { Button } from "@app/components/UIKit";
import ContentView from "@app/components/ContentView";
import { useAppLocale } from "@app/hooks";

export const SampleUI = (props: SampleUIProps) => {
  const { presenter, styles } = props;
  const { t } = useAppLocale();
  return (
    <ContentView contentStyle={styles.container}>
      <Button
        title={t("sample.button")}
        onPress={presenter.onButtonClick}
      ></Button>
    </ContentView>
  );
};
