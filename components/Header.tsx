import { AntDesign } from "@expo/vector-icons";
import {
  useNavigation,
  useNavigationState,
  useTheme as useNavTheme,
} from "@react-navigation/native";
import React, { useState } from "react";
import {
  StyleSheet,
  View as DefaultView,
  StyleProp,
  ViewStyle,
} from "react-native";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import I18N from "@app/helpers/I18N";
import { Button, Text, View } from "./UIKit";
import { BlurView } from "expo-blur";
import Animated, { call, useCode } from "react-native-reanimated";
import { useAppDimensions, useAppTheme, useAppFont } from "@app/hooks";
import { commonStyles } from "@app/constants/Classifications";
import Ionicons from "./Ionicons";

export type HeaderProps = {
  animated?: boolean;
  translucent?: boolean;
  showBackButton?: boolean;
  start?: React.ReactNode;
  end?: React.ReactNode;
  title?: React.ReactNode | string;
  backButtun?: React.ReactNode;
  headerStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  titleSectionStyle?: StyleProp<ViewStyle>;
  titleTextStyle?: StyleProp<ViewStyle>;
  startSectionStyle?: StyleProp<ViewStyle>;
  endSectionStyle?: StyleProp<ViewStyle>;
  blurIntensity?: Animated.Value<number>;
} & DefaultView["props"];

const Header = (props: HeaderProps) => {
  const { headerFullHeight, statusBarHeight } = useAppDimensions();
  const [intensity, setIntensity] = useState(100);
  const { colors, dark } = useNavTheme();
  const { theme } = useAppTheme();

  let {
    style,
    headerStyle,
    children,
    start,
    blurIntensity,
    end,
    title,
    backButtun,
    animated,
    translucent,
    ...otherProps
  } = props;

  translucent = translucent != undefined ? translucent : theme.tranclucent;


  useCode(() => {
    if (blurIntensity)
      return call([blurIntensity], (value) => {
        const val = value[0];
        setIntensity(val);
      });
  }, [blurIntensity]);

  const renderContent = () => {
    return (
      <>
        <View pointerEvents="box-none" style={{ height: statusBarHeight }} />
        {children ? children : <DefaultContent {...props} />}
      </>
    );
  };

  return (
    <View
      pointerEvents="box-none"
      animated={animated}
      style={[
        {
          height: headerFullHeight,
          backgroundColor: colors.card,
          borderBottomColor: colors.border,
          shadowColor: colors.border,
        },
        styles.container,
        headerStyle,
      ]}
      {...otherProps}
    >
      {translucent ? (
        <BlurView
          pointerEvents="none"
          intensity={intensity}
          brand={dark ? "dark" : "light"}
          style={styles.blur}
        ></BlurView>
      ) : null}

      {renderContent()}
    </View>
  );
};

function DefaultContent(props: HeaderProps) {
  let {
    animated,
    start,
    end,
    title,
    backButtun,
    contentStyle,
    startSectionStyle,
    endSectionStyle,
    titleSectionStyle,
    titleTextStyle,
    showBackButton
  } = props;
  const { bold } = useAppFont();

  showBackButton = showBackButton != undefined ? showBackButton : true;

  let goBack = () => {};
  let canGoBack = false;
  let routesLength = 0;

  try {
    routesLength = useNavigationState((state) => state.routes.length);
    goBack = useNavigation().goBack;
    canGoBack = useNavigation().canGoBack() && routesLength > 1 && showBackButton;
  } catch (error) {}

  const { colors, dark } = useNavTheme();
  const { theme } = useAppTheme();
  const insets = useSafeAreaInsets();

  const headerTitleAlign = Platform.select({
    ios: "center",
    default: "left",
  });

  return (
    <View pointerEvents="box-none" style={[styles.content, contentStyle]}>
      {start ? (
        <View
          pointerEvents="box-none"
          animated={animated}
          style={[
            styles.left,
            { left: insets.left, paddingStart: theme.defaultPadding },
            startSectionStyle,
          ]}
        >
          {start}
        </View>
      ) : canGoBack ? (
        <View
          pointerEvents="box-none"
          animated={animated}
          style={[
            styles.left,
            {
              left: insets.left,

              paddingStart: 6,
            },
            startSectionStyle,
          ]}
        >
          <Button type="flat" onPress={goBack}>
            {backButtun ? (
              backButtun
            ) : (
              <Ionicons
                style={{ minHeight: 24 }}
                name={I18N.selectDir({
                  rtl: "arrow-forward",
                  ltr: "arrow-back",
                })}
                size={24}
                color={colors.primary}
              />
            )}
          </Button>
        </View>
      ) : null}
      <View
        animated={animated}
        pointerEvents="box-none"
        style={[
          headerTitleAlign === "left"
            ? {
                position: "absolute",
                left:
                  (start || canGoBack ? 56 : theme.defaultPadding) +
                  insets.left,
                right: (end ? 56 : theme.defaultPadding) + insets.right,
              }
            : {
                marginHorizontal:
                  (start || canGoBack ? 32 : theme.defaultPadding) +
                  Math.max(insets.left, insets.right),
              },
          titleSectionStyle,
        ]}
      >
        {(title as string) ? (
          <Text
            animated={animated}
            accessibilityRole="header"
            aria-level="1"
            numberOfLines={1}
            style={[
              { color: colors.text, fontFamily: bold },
              styles.title,
              titleTextStyle,
            ]}
          >
            {title}
          </Text>
        ) : (
          title
        )}
      </View>
      {end ? (
        <View
          animated={animated}
          pointerEvents="box-none"
          style={[
            styles.right,
            { right: insets.right, paddingEnd: theme.defaultPadding },
            endSectionStyle,
          ]}
        >
          {end}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      android: {
        elevation: 4,
      },
      ios: {
        shadowOpacity: 0.85,
        shadowRadius: 0,
        shadowOffset: {
          width: 0,
          height: StyleSheet.hairlineWidth,
        },
      },
      default: {
        borderBottomWidth: StyleSheet.hairlineWidth,
      },
    }),
    zIndex: 1,
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  title: Platform.select({
    ios: {
      fontSize: 17,
      fontWeight: "600",
    },
    android: {
      fontSize: 20,
      fontWeight: "normal",
    },
    default: {
      fontSize: 18,
      fontWeight: "500",
    },
  }),
  icon: {
    height: 24,
    width: 24,
    margin: 3,
    resizeMode: "contain",
  },
  touchable: {
    marginHorizontal: 11,
  },
  blur: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  },
  left: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  right: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "flex-end",
  },
});

export default Header;
