import { commonStyles } from "@app/constants/Classifications";
import { useAppTheme, useAppLocale } from "@app/hooks";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, H4, Text } from "./UIKit";

export type ErrorViewProps = {
  icon?: React.ReactNode;
  title?: string;
  subtitle?: string;
  onRetry?: () => any;
} & View["props"];

const ErrorView = (props: ErrorViewProps) => {
  const { style, icon, title, subtitle, onRetry, ...oteherProps } = props;
  const { t } = useAppLocale();
  const { theme } = useAppTheme();

  return (
    <View style={[styles.container, style]} {...oteherProps}>
      {icon || (
        <AntDesign
          name="warning"
          size={100}
          color={theme.colors.disable}
          style={styles.icon}
        />
      )}
      <H4 style={commonStyles.margin_top_24}>{title || t("error.general")}</H4>
      <Text style={styles.text}>{subtitle || t("error.general_desc")}</Text>
      <Button style={styles.button} onPress={onRetry} title={t("retry")} />
    </View>
  );
};

export default ErrorView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {},
  text: {
    marginTop: 8,
    maxWidth: 250,
    textAlign: "center",
    lineHeight: 25,
  },
  button: {
    marginTop: 24,
    minWidth: 120,
    maxHeight: 50,
    justifyContent: "center",
  },
});
