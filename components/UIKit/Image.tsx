import * as React from "react";
import { Image as DefaultImage } from "react-native";
import Animated from "react-native-reanimated";

type Props = { animated?: boolean };

export type ImageProps = Props & DefaultImage["props"];

export default function Image(props: ImageProps) {
  const { style, animated, ...otherProps } = props;

  return animated ? (
    <Animated.Image style={[{}, style]} {...otherProps} />
  ) : (
    <DefaultImage style={[{}, style]} {...otherProps} />
  );
}
