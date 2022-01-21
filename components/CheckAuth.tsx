import { useAppLocale, useAppTheme, useRedux } from "@app/hooks";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, H4 } from "./UIKit";


type Props = { text?: string } & View["props"];

const CheckAuth: React.FC<Props> = (props: Props) => {
  const { t } = useAppLocale();
  const { navigate } = useNavigation();
  let { text, children, style, ...otherProps } = props;
  const { state: isLogedIn } = useRedux((state) => state.auth.accessToken);
  const { theme } = useAppTheme();

  text = text || t("auth.unauth_text");
  return (
    <View style={[styles.container, style]} {...otherProps}>
      {isLogedIn ? (
        children
      ) : (
        <View style={styles.authContainer}>
          <SimpleLineIcons
            name="lock"
            size={100}
            color={theme.colors.disable}
            style={styles.icon}
          />
          <H4 fontWeight="regular" style={styles.text}>
            {text}
          </H4>
          <Button
            style={styles.button}
            onPress={() => navigate("AuthScreen")}
            title={t("auth.login")}
          ></Button>
        </View>
      )}
    </View>
  );
};

export default CheckAuth;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: "100%",
  },
  authContainer: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    marginTop: -50,
  },
  text: {
    marginTop: 24,
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
