import * as React from "react";
import { StyleProp, Text as DefaultText, TextStyle } from "react-native";

import {
  H1 as DefaultH1,
  H2 as DefaultH2,
  H3 as DefaultH3,
  H4 as DefaultH4,
  P as DefultP,
} from "@expo/html-elements";
import { FontWeight } from "@app/types";
import Animated from "react-native-reanimated";
import useAppTheme from "@app/hooks/useAppTheme";
import useAppFont from "@app/hooks/useAppFont";

type Props = {
  fontWeight: FontWeight;
  animated?: boolean;
};


export type TextProps = Props & DefaultText["props"];

export default function Text(props: TextProps) {
  const { style, animated, ...otherProps } = props;
  const { theme } = useAppTheme();
  const font = useAppFont();

  const defaultStyle: StyleProp<TextStyle> = {
    color: theme.colors.text,
    fontWeight: "normal",
    fontFamily: font[props.fontWeight],
    marginVertical: 0,
    textAlign: "left",
    // lineHeight: 25,
  };
  return animated ? (
    <Animated.Text style={[defaultStyle, style]} {...otherProps} />
  ) : (
    <DefaultText style={[defaultStyle, style]} {...otherProps} />
  );
}
Text.defaultProps = {
  fontWeight: "regular",
};

export function Caption(props: TextProps) {
  const { style, ...otherProps } = props;
  const { theme } = useAppTheme();
  const font = useAppFont();

  return (
    <DefaultText
      style={[
        {
          color: theme.colors.textSecondary,
          fontWeight: "normal",
          fontFamily: font[props.fontWeight],
          fontSize: 12,
          marginVertical: 0,
          textAlign: "left",
        },
        style,
      ]}
      {...otherProps}
    />
  );
}
Caption.defaultProps = {
  fontWeight: "light",
};

export function H1(props: TextProps) {
  const { style, ...otherProps } = props;
  const { theme } = useAppTheme();
  const font = useAppFont();

  return (
    <DefaultH1
      style={[
        {
          color: theme.colors.text,
          fontWeight: "normal",
          fontFamily: font[props.fontWeight],
          marginVertical: 0,
          textAlign: "left",
        },
        style,
      ]}
      {...otherProps}
    />
  );
}
H1.defaultProps = {
  fontWeight: "bold",
};

export function H2(props: TextProps) {
  const { style, ...otherProps } = props;
  const { theme } = useAppTheme();
  const font = useAppFont();

  return (
    <DefaultH2
      style={[
        {
          color: theme.colors.text,
          fontWeight: "normal",
          fontFamily: font[props.fontWeight],
          marginVertical: 0,
          textAlign: "left",
        },
        style,
      ]}
      {...otherProps}
    />
  );
}
H2.defaultProps = {
  fontWeight: "bold",
};

export function H3(props: TextProps) {
  const { style, ...otherProps } = props;
  const { theme } = useAppTheme();
  const font = useAppFont();

  return (
    <DefaultH3
      style={[
        {
          color: theme.colors.text,
          fontWeight: "normal",
          fontFamily: font[props.fontWeight],
          marginVertical: 0,
          textAlign: "left",
        },
        style,
      ]}
      {...otherProps}
    />
  );
}
H3.defaultProps = {
  fontWeight: "bold",
};

export function H4(props: TextProps) {
  const { style, ...otherProps } = props;
  const { theme } = useAppTheme();
  const font = useAppFont();

  return (
    <DefaultH4
      style={[
        {
          color: theme.colors.text,
          fontWeight: "normal",
          fontFamily: font[props.fontWeight],
          marginVertical: 0,
          textAlign: "left",
        },
        style,
      ]}
      {...otherProps}
    />
  );
}
H4.defaultProps = {
  fontWeight: "bold",
};

export function P(props: TextProps) {
  const { style, ...otherProps } = props;
  const { theme } = useAppTheme();
  const font = useAppFont();

  return (
    <DefultP
      style={[
        {
          color: theme.colors.text,
          fontWeight: "normal",
          fontFamily: font[props.fontWeight],
          marginVertical: 0,
          textAlign: "left",
          lineHeight: 25, 
        },
        style,
      ]}
      {...otherProps}
    />
  );
}
P.defaultProps = {
  fontWeight: "regular",
};
