import { elevationStyle } from "@app/constants/Classifications";
import useAppTheme from "@app/hooks/useAppTheme";
import * as React from "react";
import { View as DefaultView } from "react-native";
import Animated from "react-native-reanimated";

type Props = { animated?: boolean };

export type ViewProps = Props & DefaultView["props"];

export default function View(props: ViewProps) {
  const { style, animated, ...otherProps } = props;

  return animated ? (
    <Animated.View style={[{}, style]} {...otherProps} />
  ) : (
    <DefaultView style={[{}, style]} {...otherProps} />
  );
}

export function Row(props: ViewProps) {
  const { style, ...otherProps } = props;

  return (
    <DefaultView style={[{ flexDirection: "row" }, style]} {...otherProps} />
  );
}

export function Col(props: ViewProps) {
  const { style, ...otherProps } = props;

  return (
    <DefaultView style={[{ flexDirection: "column" }, style]} {...otherProps} />
  );
}

export function Hr(props: ViewProps) {
  const { style, ...otherProps } = props;
  const { theme } = useAppTheme();

  return (
    <DefaultView
      style={[
        { height: 1, flex: 1, backgroundColor: theme.colors.border },
        style,
      ]}
      {...otherProps}
    />
  );
}

export type CardProps = { elevation?: number } & DefaultView["props"];

export function Card(props: CardProps) {
  const { style, elevation, ...otherProps } = props;
  const { theme } = useAppTheme();
  const el = elevation || theme.elevation;

  const elStyle = elevationStyle(el);

  return (
    <DefaultView
      style={[
        {
          backgroundColor: theme.colors.surface,
          borderRadius: theme.roundness,
        },
        elStyle,
        style,
      ]}
      {...otherProps}
    />
  );
}


export const Reverse: React.FC = (props) => {
  const children = React.Children.toArray(props.children).reverse();
  return <>{children}</>;
};
