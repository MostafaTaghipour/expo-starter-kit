import { commonStyles } from "@app/constants/Classifications";
import {
  useAppTheme,
  useAppLocale,
  useDialog,
  useAppDimensions,
  useRedux,
  useAppInfo,
} from "@app/hooks";
import {
  ignoreThisAppSessionUpdateAction,
  ignoreThisAppVersionUpdateAction,
} from "@app/store/app/actions";
import { actions } from "@app/store/app/reducer";
import { getAppLastVersionAsyncAction } from "@app/store/config/actions";
import { AntDesign } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { Linking, StyleSheet, View } from "react-native";
import { Button, H4, P, Text } from "./UIKit";

const AppUpdateHandler = (props: {}) => {
  const { dispatch, state: appVersion } = useRedux(
    (state) => state.config.appVersion
  );
  const {
    state: { ignoreThisAppSessionUpdate, ignoreThisAppVersionUpdate },
  } = useRedux((state) => state.app);
  const { showDialog, dismissDialog } = useDialog();
  const { window, insets } = useAppDimensions();
  const { t } = useAppLocale();
  const { theme } = useAppTheme();
  const {
    nativeBuildVersion,
    nativeApplicationVersion,
    sessionId,
  } = useAppInfo();

  console.log("=====>",nativeBuildVersion, nativeApplicationVersion);

  useEffect(() => {
    dispatch(getAppLastVersionAsyncAction());
  }, []);

  useEffect(() => {
    if (!appVersion) {
      hideAlert();
      return;
    }
    if (!nativeBuildVersion) {
      hideAlert();
      return;
    }
    if (appVersion.buildNumber <= +nativeBuildVersion) {
      hideAlert();
      return;
    }
    if (ignoreThisAppVersionUpdate == appVersion.buildNumber) {
      hideAlert();
      return;
    }
    if (ignoreThisAppSessionUpdate == sessionId) {
      hideAlert();
      return;
    }

    showAlert();
  }, [appVersion]);

  const showAlert = () => {
    showDialog(
      <View
        style={[
          styles.content,
          {
            padding: theme.defaultPadding,
            // width: window.width,
            // paddingBottom: insets.bottom + theme.defaultPadding,
            // paddingHorizontal: theme.defaultPadding,
            // paddingTop: theme.defaultPadding,
          },
        ]}
      >
        <Text style={styles.title} fontWeight="bold">
          {t("app_update.title")}
        </Text>
        <P>
          {t("app_update.desc", {
            current: nativeApplicationVersion,
            new: appVersion?.name,
          })}
        </P>
        <View style={styles.actions}>
          <Button
            type="flat"
            size="small"
            onPress={update}
            style={styles.button}
            title={t("app_update.update")}
          ></Button>
          {!appVersion!!.force && (
            <>
              <Button
                color="gray"
                size="small"
                onPress={later}
                style={styles.button}
                title={t("app_update.later")}
                type="flat"
              ></Button>
              <Button
                type="flat"
                size="small"
                color="gray"
                onPress={ignoreThisAppVersion}
                style={styles.button}
                title={t("app_update.not_this_version")}
              ></Button>
            </>
          )}
        </View>
      </View>,
      {
        // position: "bottom",
        // contentStyle: { borderRadius: 0, margin: 0, marginBottom: 0 },
        isDismissable: true,
      }
    );
  };

  const update = () => {
    if (appVersion?.url && Linking.canOpenURL(appVersion.url))
      Linking.openURL(appVersion.url);
  };

  const later = () => {
    dispatch(ignoreThisAppSessionUpdateAction(sessionId));
    hideAlert();
  };

  const ignoreThisAppVersion = () => {
    dispatch(ignoreThisAppVersionUpdateAction(appVersion!!.buildNumber));
    hideAlert();
  };

  const hideAlert = () => {
    dismissDialog();
  };

  return null;
};

export default AppUpdateHandler;

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
    marginStart: 10,
    minWidth: 60,
  },
});
