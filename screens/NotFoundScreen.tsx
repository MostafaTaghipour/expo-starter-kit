import ContentView from "@app/components/ContentView";
import { Button, Text } from "@app/components/UIKit";
import { useAppLocale } from "@app/hooks";
import { RootStackNavigationProps } from "@app/navigation/types";
import * as React from "react";
import { StyleSheet } from "react-native";

export default function NotFoundScreen({
  navigation,
}: RootStackNavigationProps<"NotFound">) {
  const { t } = useAppLocale();

  return (
    <ContentView contentStyle={styles.container}>
      <Text style={styles.title}>{t("not_found.desc")}</Text>
      <Button
        style={styles.link}
        onPress={() => navigation.replace("Root")}
        type="flat"
        title={t("not_found.button")}
      />
    </ContentView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
  },
});
