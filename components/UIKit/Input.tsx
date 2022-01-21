import ThemeManager from "@app/helpers/ThemeManager";
import useAppFont from "@app/hooks/useAppFont";
import useAppLocale from "@app/hooks/useAppLocale";
import useAppTheme from "@app/hooks/useAppTheme";
import { ViewStyle } from "@expo/html-elements/build/primitives/View";
import React, { useImperativeHandle, useRef } from "react";
import {
  Animated,
  Text,
  TextInput as DefaultTextInput,
  View,
  StyleSheet,
  StyleProp,
  TextStyle,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  Platform,
} from "react-native";

const FONT_SIZE = 17;
const LABEL_FONT_SIZE = 14;
const PADDING = 12;
const PADDING_TOP = 24;

export type TextInputProps = DefaultTextInput["props"] & {
  inputStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle> & {
    focusedMarginStart?: number;
    unfocusedMarginStart?: number;
  };
  containerStyle?: StyleProp<ViewStyle>;
  lablePosition?: "top" | "inside" | "floating";
  padding?: number;
  disabled?: boolean;
  editable?: boolean;
  roundness?: number;
  error?: string;
  errorLabelStyle?: StyleProp<TextStyle>;
  start?: React.ReactNode;
  end?: React.ReactNode;
};

const FloatingLabel = React.memo(
  ({
    isFocused,
    label,
    onPress,
    style,
    padding,
    color,
    start,
  }: {
    isFocused: boolean;
    label: string;
    onPress: () => any;
    style?: StyleProp<TextStyle> & {
      focusedMarginStart?: number;
      unfocusedMarginStart?: number;
    };
    padding: number;
    color: string;
    start: number;
  }) => {
    const { dark, theme } = useAppTheme();
    const font = useAppFont();
    const animatedIsFocused = useRef(new Animated.Value(isFocused ? 0 : 1));
    React.useEffect(() => {
      const to = isFocused ? 1 : 0;

      chnageAnim(to);
      return () => {};
    }, [isFocused]);

    const chnageAnim = (to: number) => {
      Animated.timing(animatedIsFocused.current, {
        toValue: to,
        duration: 200,
        useNativeDriver: false,
      }).start();
    };

    const labelStyle = {
      start: animatedIsFocused.current.interpolate({
        inputRange: [0, 1],
        outputRange: [
          style?.unfocusedMarginStart || start,
          style?.focusedMarginStart || 0,
        ],
      }),

      top: animatedIsFocused.current.interpolate({
        inputRange: [0, 1],
        outputRange: [PADDING_TOP + padding, 0],
      }),
      fontSize: animatedIsFocused.current.interpolate({
        inputRange: [0, 1],
        outputRange: [FONT_SIZE, LABEL_FONT_SIZE],
      }),
      color: animatedIsFocused.current.interpolate({
        inputRange: [0, 1],
        outputRange: ["#808080", color],
      }),
    };
    return (
      //@ts-ignore
      <Animated.Text
        style={[
          labelStyle,
          styles.floatingLabel,
          { fontFamily: font.regular },
          style,
        ]}
        onPress={onPress}
      >
        {label}
      </Animated.Text>
    );
  }
);

const Input: React.ForwardRefRenderFunction<
  DefaultTextInput,
  TextInputProps
> = (props, ref) => {
  let {
    placeholder,
    lablePosition,
    padding,
    value,
    style,
    inputStyle,
    labelStyle,
    containerStyle,
    disabled,
    editable,
    roundness,
    error,
    errorLabelStyle,
    start,
    end,
    onFocus,
    onBlur,
    ...otherProps
  } = props;
  const { dark, theme } = useAppTheme();
  const { isRTL, locale } = useAppLocale();
  const font = useAppFont();
  const [isFocused, setIsFocused] = React.useState(false);

  const inputRef = React.useRef<DefaultTextInput>(null);
  useImperativeHandle(ref, () => inputRef.current!);
  lablePosition = lablePosition || "floating";
  padding = padding != undefined ? padding : PADDING;
  roundness = roundness != undefined ? roundness : theme.roundness;
  editable = editable != undefined ? editable : true;

  const focused =
    isFocused ||
    (value != "" &&
      value != undefined &&
      value != null &&
      !disabled &&
      editable);

  const tintColor = disabled
    ? theme.colors.disable
    : error
    ? theme.colors.danger
    : theme.colors.brand;
  const color = focused
    ? tintColor
    : error
    ? theme.colors.danger
    : theme.colors.border;
  const borderColor = isFocused
    ? tintColor
    : error
    ? theme.colors.danger
    : theme.colors.border;
  const textAlign = isRTL ? "right" : "left";

  const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(true);
    onFocus && onFocus(e);
  };
  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(false);
    onBlur && onBlur(e);
  };

  return (
    <View
      pointerEvents={!editable ? "none" : undefined}
      style={[
        styles.container,
        { paddingTop: lablePosition == "floating" ? PADDING_TOP : 0 },
        style,
      ]}
    >
      {placeholder && lablePosition == "top" && (
        <Text
          style={[
            styles.topLabel,
            {
              fontFamily: font.regular,
              color: "#808080",
            },
            labelStyle,
          ]}
        >
          {placeholder}
        </Text>
      )}
      <View
        style={[
          styles.inputContainer,
          {
            borderBottomColor: borderColor,
            borderColor: borderColor,
            borderRadius: roundness,
            padding,
          },
          containerStyle,
        ]}
      >
        {start}
        <DefaultTextInput
          style={[
            styles.input,
            {
              fontFamily: font.regular,
              color: disabled ? theme.colors.disable : theme.colors.text,
              textAlign,
              marginStart: start ? padding : 0,
              marginEnd: end ? padding : 0,
              // marginTop: Platform.OS == "android" && locale == "fa" ? -12 : 0,
            },
            inputStyle,
          ]}
          underlineColorAndroid="transparent"
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={value}
          blurOnSubmit
          editable={!disabled && editable}
          selectionColor={theme.colors.brand}
          ref={inputRef}
          placeholder={lablePosition == "inside" ? placeholder : undefined}
          placeholderTextColor={
            lablePosition == "inside" ? "#808080" : undefined
          }
          {...otherProps}
        />
        {end}
      </View>
      {placeholder && lablePosition == "floating" && (
        <FloatingLabel
          isFocused={focused}
          label={placeholder}
          onPress={() => {
            
            if (disabled || !editable) return;
            inputRef.current?.focus();
          }}
          style={labelStyle}
          padding={padding}
          color={tintColor}
          start={padding}
        />
      )}

      {error && (
        <Text
          style={[
            styles.errorLabel,
            { fontFamily: font.light, color: theme.colors.danger },
            errorLabelStyle,
          ]}
        >
          {error}
        </Text>
      )}
    </View>
  );
};

export default React.memo(React.forwardRef(Input));

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  inputContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderWidth: 0.8,
    // flex: 1,
    // minHeight: 55
    // borderBottomWidth: 3,
  },

  input: {
    fontSize: FONT_SIZE,
    flex: 1,
    height: "100%",
    paddingVertical: 0,
    borderWidth: 0,
  },
  floatingLabel: { position: "absolute" },
  topLabel: { fontSize: LABEL_FONT_SIZE, marginBottom: 4 },
  errorLabel: { fontSize: LABEL_FONT_SIZE - 2, marginTop: 4 },
});
