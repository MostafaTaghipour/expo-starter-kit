import { commonStyles } from "@app/constants/Classifications";
import { useAppTheme, useAppLocale } from "@app/hooks";
import { SimpleLineIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { H4, Text } from "./UIKit";

export type EmptyViewProps = {
  icon?: React.ReactNode;
  title?: string;
  subtitle?: string;
} & View["props"];

const EmptyView = (props: EmptyViewProps) => {
  const { style, icon, title, subtitle, ...oteherProps } = props;
  const { t } = useAppLocale();
  const { theme } = useAppTheme();

  return (
    <View style={[styles.container, style]} {...oteherProps}>
      {icon || (
        <SimpleLineIcons
          name="doc"
          size={100}
          color={theme.colors.disable}
          style={styles.icon}
        />
      )}
      <H4 style={commonStyles.margin_top_24}>{title || t("no_item")}</H4>
      {subtitle && <Text style={styles.text}>{subtitle}</Text>}

     
    </View>
  );
};

export default EmptyView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    marginTop: -50,
  },
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
