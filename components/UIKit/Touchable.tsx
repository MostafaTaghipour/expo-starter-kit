import * as React from "react";
import { Link as DefaultLink } from "@react-navigation/native";
import {
  StyleSheet,
  Platform,
  View,
  ViewStyle,
  StyleProp,
  TouchableWithoutFeedback,
  Pressable,
  PressableStateCallbackType,
} from "react-native";
import Text from "./Text";
import { FontWeight } from "@app/types";
import Color from "color";
import { TextStyle } from "@expo/html-elements/build/primitives/Text";
import { hexToRGB } from "@app/helpers/UIHelper";
import { elevationStyle } from "@app/constants/Classifications";
import useAppTheme from "@app/hooks/useAppTheme";
import useAppFont from "@app/hooks/useAppFont";
import Animated, { SpringUtils } from "react-native-reanimated";
import { useDeviceInfo } from "@app/hooks";
import { useState } from "react";


declare type ButtonType = "raised" | "flat" | "bordered" | "block" | "light";
declare type ButtonSize = "small" | "medium" | "large";

const buttonStyle = StyleSheet.create({
  wrapper: {},
  content: {
    justifyContent: "space-around",
    alignItems: "center",
    overflow: "hidden",
    flexDirection: "row",
    // ...Platform.select({
    //   android: {
    //     flex: 1,
    //   },
    // }),
  },
  label: { textAlign: "center", textTransform: "uppercase" },
});

export type ButtonProps = {
  size: ButtonSize;
  type: ButtonType;
  fontWeight: FontWeight;
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
  color?: string;
  roundness?: number;
  elevation?: number;
  start?: React.ReactNode;
  end?: React.ReactNode;
  center?: React.ReactNode;
  contentStyle?: StyleProp<ViewStyle>;
  noPadding?: boolean;
} & TouchableProps;

const ButtonWrapper: React.FC<ButtonProps> = React.memo(
  (props: ButtonProps) => {
    let {
      style,
      children,
      type,
      size,
      color,
      roundness,
      elevation,
      disabled,
      noPadding,
      contentStyle,
      start,
      end,
      center,
      onPressIn,
      onPressOut,
      ...otherProps
    } = props;

    const [pressed, setPressed] = useState(false);
    const { theme } = useAppTheme();

    const tintColor = disabled
      ? theme.colors.disable
      : color || theme.colors.brand;
    let darkColor =
      type == "block" || type == "raised"
        ? Color(tintColor).darken(0.2).hex()
        : hexToRGB(tintColor, 0.2);

    const radius = type == "block" ? 0 : roundness || theme.roundness;
    const wrapperStyle: StyleProp<ViewStyle> = [
      buttonStyle.wrapper,
      { borderRadius: radius },
    ];

    const el = pressed
      ? 0
      : elevation != undefined
      ? elevation
      : theme.elevation;

    if (type == "block") wrapperStyle.push({ width: "100%" });

    if (type == "raised") wrapperStyle.push(elevationStyle(el));

    wrapperStyle.push(style);

    const cStyle: StyleProp<ViewStyle> = [
      buttonStyle.content,
      { borderRadius: radius },
    ];

    if (type == "block" || type == "raised")
      cStyle.push({
        backgroundColor: tintColor,
      });
    else if (type == "light")
      cStyle.push({
        backgroundColor: hexToRGB(tintColor, 0.1),
      });
    else
      cStyle.push({
        backgroundColor: "transparent",
      });

    if (type == "bordered")
      cStyle.push({
        borderColor: tintColor,
        borderWidth: size == "small" ? 1 : size == "large" ? 3 : 2,
      });

    if (size == "small" && !noPadding)
      cStyle.push({
        paddingHorizontal: 6,
        paddingVertical: Platform.select({ android: 8, default: 10 }),
      });
    else if (size == "large" && !noPadding)
      cStyle.push({
        paddingHorizontal: 12,
        paddingVertical: Platform.select({ android: 14, default: 20 }),
      });
    else if (!noPadding)
      cStyle.push({
        paddingHorizontal: 8,
        paddingVertical: Platform.select({ android: 10, default: 16 }),
      });

    if (type == "block") cStyle.push({ width: "100%" });

    cStyle.push(contentStyle);

    return (
      <Touchable
        disabled={disabled}
        style={wrapperStyle}
        contentStyle={cStyle}
        rippleColor={darkColor}
        onPressIn={(e) => {
          setPressed(true);
          onPressIn && onPressIn(e);
        }}
        onPressOut={(e) => {
          setPressed(false);
          onPressOut && onPressOut(e);
        }}
        {...otherProps}
      >
        {children}
      </Touchable>
    );
  }
);

const Button = (props: ButtonProps) => {
  const {
    start: start,
    end: end,
    type,
    size,
    color,
    fontWeight,
    children,
    noPadding,
  } = props;
  const { theme } = useAppTheme();
  const font = useAppFont();

  const tintColor = props.disabled
    ? theme.colors.disable
    : color || theme.colors.brand;

  const renderCenter = () => {
    const { title, center: center, titleStyle } = props;
    if (title) {
      const labelStyle: StyleProp<TextStyle> = [
        buttonStyle.label,
        {
          fontFamily: font[fontWeight],
        },
      ];

      if (type == "block" || type == "raised")
        labelStyle.push({
          color: "#fff",
        });
      else
        labelStyle.push({
          color: tintColor,
        });

      if (size == "small")
        labelStyle.push({
          fontSize: 13,
        });
      else if (size == "large")
        labelStyle.push({
          fontSize: 17,
        });
      else
        labelStyle.push({
          fontSize: 15,
        });

      if (size == "small" && !noPadding)
        labelStyle.push({
          marginHorizontal: 4,
        });
      else if (size == "large" && !noPadding)
        labelStyle.push({
          marginHorizontal: 12,
        });
      else if (!noPadding)
        labelStyle.push({
          marginHorizontal: 8,
        });

      labelStyle.push(titleStyle);

      return (
        //@ts-ignore
        <Text pointerEvents="none" style={labelStyle}>
          {title}
        </Text>
      );
    } else if (center) {
      return center;
    }
    return <View></View>;
  };

  return (
    <ButtonWrapper {...props}>
      {children ? (
        children
      ) : (
        <>
          {start}
          {renderCenter()}
          {end}
        </>
      )}
    </ButtonWrapper>
  );
};
Button.defaultProps = {
  size: "medium",
  type: "raised",
  fontWeight: "bold",
};

export const ButtonComponent = React.memo(Button);

/*******   Link  ******/
export type LinkProps = {} & React.ComponentProps<typeof DefaultLink>;

export function Link(props: LinkProps) {
  const { style, ...otherProps } = props;
  const { theme } = useAppTheme();
  const font = useAppFont();

  return (
    <DefaultLink
      style={[{ color: theme.colors.brand, fontFamily: font.bold }, style]}
      {...otherProps}
    />
  );
}

/*****   Touchable   *****/
export type TouchableProps = {
  rippleBorderless?: boolean;
  rippleColor?: string;
  activeOpacity?: number;
  contentStyle?:
    | StyleProp<ViewStyle>
    | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>);
} & View["props"] &
  React.ComponentProps<typeof Pressable>;

export const Touchable: React.FC<TouchableProps> = React.memo(
  (props: TouchableProps) => {
    let {
      style,
      children,
      rippleBorderless,
      disabled,
      activeOpacity,
      rippleColor,
      contentStyle,
      onPress,
      onPressIn,
      onPressOut,
      onLongPress,
      delayLongPress,
      hitSlop,
      pressRetentionOffset,
      android_disableSound,
      testOnly_pressed,
      ...otherProps
    } = props;

    const touchable = onPress != undefined;
    activeOpacity = activeOpacity != undefined ? activeOpacity : 0.8;
    rippleBorderless = rippleBorderless != undefined ? rippleBorderless : false;
    rippleColor = rippleColor || hexToRGB("#cccccc", 0.2);
    const { isAndroid } = useDeviceInfo();

    return (
      <View
        style={[isAndroid ? { overflow: "hidden" } : null, style]}
        {...otherProps}
      >
        <Pressable
          android_ripple={{
            color: rippleColor,
            borderless: rippleBorderless,
          }}
          disabled={!touchable || disabled}
          style={({ pressed }) => {
            const s =
              typeof contentStyle === "function"
                ? contentStyle({ pressed })
                : contentStyle;

            return [
              {
                opacity: pressed && !isAndroid ? activeOpacity : 1,
                // flex: 1,
              },
              s,
            ];
          }}
          onPress={onPress}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          onLongPress={onLongPress}
          delayLongPress={delayLongPress}
          hitSlop={hitSlop}
          pressRetentionOffset={pressRetentionOffset}
          android_disableSound={android_disableSound}
          testOnly_pressed={testOnly_pressed}
        >
          {children}
        </Pressable>
      </View>
    );
  }
);

/*******   ScaleButton  ******/
export type ScaleButtonProps = {
  minScale?: number;
} & View["props"] &
  React.ComponentProps<typeof TouchableWithoutFeedback>;

export function ScaleButton(props: ScaleButtonProps) {
  let { style, children, minScale, ...otherProps } = props;
  minScale = minScale || 0.5;
  const animatedValue = new Animated.Value(1);

  const springConfig = {
    damping: 10,
    mass: 1,
    stiffness: 200,
  };

  const handlePressIn = () => {
    Animated.spring(animatedValue, {
      ...SpringUtils.makeDefaultConfig(),
      ...springConfig,
      toValue: minScale!,
    }).start();
  };
  const handlePressOut = () => {
    Animated.spring(animatedValue, {
      ...SpringUtils.makeDefaultConfig(),
      ...springConfig,
      toValue: 1,
    }).start();
  };

  const animatedStyle = {
    transform: [{ scale: animatedValue }],
  };

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View style={[style, animatedStyle]} {...otherProps}>
        {children}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}
