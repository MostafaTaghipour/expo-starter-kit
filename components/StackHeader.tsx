import {
  Header as DefaultHeader,
  HeaderBackground as DefaultHeaderBackground,
  StackHeaderProps,
} from "@react-navigation/stack";
import React from "react";
import {
  View,
  StyleSheet,
  Platform,
  Animated,
  ViewProps,
  StyleProp,
  ViewStyle,
} from "react-native";
import { BlurView } from "expo-blur";
import { useAppTheme } from "@app/hooks";

type Props = {
  translucent?: boolean;
} & StackHeaderProps;


//todo hide on scroll down
export default function StackHeader(props: Props) {
  const { dark } = useAppTheme();
  const { translucent, ...otherProps } = props;

  return translucent ? (
    <BlurView brand={dark ? "dark" : "light"} intensity={100}>
      <DefaultHeader {...otherProps} />
    </BlurView>
  ) : (
    <View>
      <DefaultHeader {...otherProps} />
    </View>
  );
}

declare type BackgroundProps = ViewProps & {
  style?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
  children?: React.ReactNode;
  translucent?: boolean;
};

export function StackHeaderBackground(props: BackgroundProps) {
  const { dark } = useAppTheme();
  const { translucent, style, ...otherProps } = props;

  return (
    <DefaultHeaderBackground
      {...otherProps}
      style={[style, translucent ? styles.translucentBackground : null]}
    />
  );
}

const styles = StyleSheet.create({
  translucentBackground: {
    flex: 1,
    backgroundColor: "transparent",
    ...Platform.select({
      android: {
        elevation: 1,
      },
      default: {
        borderBottomWidth: StyleSheet.hairlineWidth,
      },
    }),
  },
});
