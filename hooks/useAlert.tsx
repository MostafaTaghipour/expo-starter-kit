import { View, Text, Button } from "@app/components/UIKit";
import useDialog from "./useDialog";
import { StyleSheet } from "react-native";
import useAppTheme from "./useAppTheme";
import React from "react";
import useAppDimensions from "./useAppDimensions";
import useAppLocale from "./useAppLocale";

type Props = {
  title: string;
  buttonTitle?: string;
  onButtonCLick?: () => any;
  onDismiss?: () => any;
};

function Content(props: Props & { close: () => any }) {
  const { window, insets } = useAppDimensions();
  let { close, onDismiss, title, buttonTitle, onButtonCLick } = props;
  const { t } = useAppLocale();
  const { theme } = useAppTheme();

  buttonTitle = buttonTitle != undefined ? buttonTitle : t("ok");

  const _dismiss = () => {
    if (onDismiss) onDismiss();
    close();
  };

  const _onButtonClick = () => {
    if (onButtonCLick) onButtonCLick();
    else _dismiss();
  };
  return (
    <View
      style={[
        styles.content,
        {
          padding:theme.defaultPadding,
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
          onPress={_onButtonClick}
          type="flat"
          style={styles.button}
          title={buttonTitle}
        ></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {},
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

export default function useAlert() {
  const { showDialog, dismissDialog } = useDialog();

  const showAlert = (config: Props) => {
    showDialog(<Content {...config} close={dismissDialog}></Content>, {
         // position: "bottom",
        // contentStyle: { borderRadius: 0, margin: 0, marginBottom: 0 },
    });
  };

  const hideAlert = () => {
    dismissDialog();
  };
  return { showAlert, hideAlert };
}
