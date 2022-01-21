import { useAppTheme, useAppLocale } from "@app/hooks";
import { Feather } from "@expo/vector-icons";
import React from "react";
import ErrorView, { ErrorViewProps } from "./ErrorView";

const DisconnectView = (props: ErrorViewProps) => {
  const { title, subtitle, icon, ...oteherProps } = props;
  const { t } = useAppLocale();
  const { theme } = useAppTheme();

  return (
    <ErrorView
      title={t("error.no_internet")}
      subtitle={t("error.no_internet_desc")}
      icon={
        <Feather
          name="wifi-off"
          size={100}
          color={theme.colors.disable}
       
        />
      }
      {...oteherProps}
    />
  );
};

export default DisconnectView;


