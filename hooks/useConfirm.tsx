import { View, Text, Button } from "@app/components/UIKit";
import useDialog from "./useDialog";
import { StyleSheet } from "react-native";
import useAppTheme from "./useAppTheme";
import React from "react";
import useAppDimensions from "./useAppDimensions";
import useAppLocale from "./useAppLocale";

type Props = {
  title: string;
  acceptTitle?: string;
  denaiedTitle?: string;
  onAccept?: () => any;
  onDenaied?: () => any;
  onDismiss?: () => any;
};

function Content(props: Props & { close: () => any }) {
  const { window, insets } = useAppDimensions();
  let {
    close,
    onDismiss,
    title,
    acceptTitle,
    denaiedTitle,
    onAccept,
    onDenaied,
  } = props;
  const { t } = useAppLocale();
  const { theme } = useAppTheme();

  acceptTitle = acceptTitle != undefined ? acceptTitle : t("yes");
  denaiedTitle = denaiedTitle != undefined ? denaiedTitle : t("no");

  const _dismiss = () => {
    if (onDismiss) onDismiss();
    close();
  };

  const _onAcceptClick = () => {
    if (onAccept) onAccept();
    else _dismiss();
  };
  const _onDenaiedClick = () => {
    if (onDenaied) onDenaied();
    else _dismiss();
  };

  return (
    <View
      style={[
        styles.content,
        {
          padding: theme.defaultPadding,
          width: window.width * 0.7,
          // width: window.width,
          // paddingBottom: insets.bottom + theme.defaultPadding,
          // paddingHorizontal: theme.defaultPadding,
          // paddingTop: theme.defaultPadding,
        },
      ]}
    >
      <Text style={styles.title} fontWeight="bold">
        {title}
      </Text>
      <View style={styles.actions}>
        <Button
          type="flat"
          onPress={_onDenaiedClick}
          color={theme.colors.danger}
          title={denaiedTitle}
          style={styles.button}
        ></Button>
        <Button
          onPress={_onAcceptClick}
          title={acceptTitle}
          type="flat"
          style={styles.button}
        ></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { justifyContent: "space-between", minWidth: 250 },
  title: {
    // flex: 1,
    lineHeight: 30,
  },
  actions: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "flex-end",
    backgroundColor: "transparent",
  },
  button: {
    // marginStart: 10,
    minWidth: 60,
    marginBottom: -10,
    marginEnd: -10,
  },
});

export default function useConfirm() {
  const { showDialog, dismissDialog } = useDialog();

  const showConfirm = (config: Props) => {
    showDialog(<Content {...config} close={dismissDialog}></Content>, {
      // position: "bottom",
      // contentStyle: { borderRadius: 0, margin: 0, marginBottom: 0 },
    });
  };

  const hideConfirm = () => {
    dismissDialog();
  };
  return { showConfirm, hideConfirm };
}
