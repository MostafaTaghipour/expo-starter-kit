import { commonStyles } from "@app/constants/Classifications";
import useAppDimensions from "@app/hooks/useAppDimensions";
import useAppTheme from "@app/hooks/useAppTheme";
import { useBackHandler } from "@react-native-community/hooks";
import { BlurView } from "expo-blur";
import React, {
  PropsWithChildren,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  Keyboard,
  LayoutAnimation,
  Platform,
  Pressable,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ViewStyle,
} from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  State,
} from "react-native-gesture-handler";
import Animated, { Easing, spring } from "react-native-reanimated";
import View from "./View";

const { Value, interpolate, Extrapolate, timing, SpringUtils } = Animated;

const DEFAULT_DURATION = 150;

export type DialogProps = {
  position?: "top" | "bottom" | "center";
  duration?: number;
  isDismissable?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
  backdropStyle?: StyleProp<ViewStyle>;
  tranclucent?: boolean;
  spring?: boolean;
  bounce?: boolean;
  onDismiss?: () => any;
  onShow?: () => any;
};

export interface DialogRef {
  show: () => any;
  dismiss: (callback?: () => any) => any;
}

const Dialog: React.ForwardRefRenderFunction<
  DialogRef | null,
  PropsWithChildren<DialogProps>
> = (props, ref) => {
  /* #region  variables */
  let {
    onShow,
    onDismiss,
    children,
    duration,
    tranclucent,
    isDismissable,
    position,
    backdropStyle,
    contentStyle,
    bounce,
    spring: springAnim,
  } = props;
  const { screen, insets } = useAppDimensions();

  const [isOpen, setIsOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState(screen.height / 2);
  const { dark, theme } = useAppTheme();
  const isOpenAnim = useRef(new Value<number>(0)).current;

  duration = duration != undefined ? duration : DEFAULT_DURATION;
  isDismissable = isDismissable != undefined ? isDismissable : true;
  tranclucent = tranclucent != undefined ? tranclucent : theme.tranclucent;
  springAnim = springAnim != undefined ? springAnim : true;
  bounce = bounce != undefined ? bounce : true;
  position = position != undefined ? position : "center";

  const springConfig = SpringUtils.makeConfigFromBouncinessAndSpeed({
    ...SpringUtils.makeDefaultConfig(),
    bounciness: 4,
    speed: 14,
  });

  const timingConfig = {
    duration: duration!,
    easing: Easing.inOut(Easing.ease),
  };

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardWillShow",
      (e) => {
        const keyboardHeight = e.endCoordinates.height;
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setKeyboardHeight(keyboardHeight);
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardWillHide",
      () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setKeyboardHeight(0);
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  /* #endregion */

  /* #region  functions */
  useEffect(() => {
    startAnimation(isOpen ? 1 : 0);
  }, [isOpen]);

  useImperativeHandle(ref, () => ({
    show: _open,
    dismiss: (callback) => _close(true, callback),
  }));

  useBackHandler(() => {
    _close(false);
    return true;
  });

  const _open = () => {
    if (onShow) onShow();
    setIsOpen(true);
  };

  const _close = (manual: boolean, callback?: () => any) => {
    if (!isDismissable && !manual) return;

    startAnimation(0, ({ finished }) => {
      setIsOpen(false);
      if (onDismiss) onDismiss();
      if (callback) callback();
    });
  };

  const _onGestureEvent = (e: PanGestureHandlerGestureEvent) => {
    let { translationY, state } = e.nativeEvent;

    if (position == "bottom") {
      // translationY = Math.abs(translationY);
      if (translationY > contentHeight) translationY = contentHeight;
      if (translationY < -contentHeight / 2) translationY = -contentHeight / 2;

      let newValue = translationY / contentHeight;
      if (newValue < 0) {
        newValue = Math.abs(newValue) + 1;
      } else {
        newValue = 1 - newValue;
      }

      if (state == State.ACTIVE) {
        isOpenAnim.setValue(newValue);
      } else if (
        state == State.END ||
        state == State.CANCELLED ||
        state == State.FAILED
      ) {
        if (translationY > 100) {
          _close(false);
        } else {
          startAnimation(1);
        }
      }
    } else if (position == "top") {
      // translationY = Math.abs(translationY);
      if (translationY > contentHeight) translationY = contentHeight / 2;
      if (translationY < -contentHeight) translationY = -contentHeight;

      let newValue = translationY / contentHeight;

      if (newValue > 0) {
        newValue = Math.abs(newValue) + 1;
      } else {
        newValue = 1 - Math.abs(newValue);
      }

      if (state == State.ACTIVE) {
        isOpenAnim.setValue(newValue);
      } else if (
        state == State.END ||
        state == State.CANCELLED ||
        state == State.FAILED
      ) {
        if (translationY < -100) {
          _close(false);
        } else {
          startAnimation(1);
        }
      }
    }
  };

  function startAnimation(
    to: Animated.Adaptable<any>,
    callback?: (data: { finished: boolean }) => any
  ) {
    if (springAnim)
      spring(isOpenAnim, {
        ...springConfig,
        toValue: to,
      }).start(callback);
    else
      timing(isOpenAnim, {
        toValue: to,
        ...timingConfig,
      }).start(callback);
  }

  /* #endregion */

  /* #region  styles */

  // const _elevationStyle = elevationStyle();

  const backDropOpacity = interpolate(isOpenAnim, {
    inputRange: [0, 1],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP,
  });

  //@ts-ignore
  const backdropAnimStyle: StyleProp<ViewStyle> = { opacity: backDropOpacity };

  const contentOpacity = interpolate(isOpenAnim, {
    inputRange: [0, 1],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP,
  });
  const contentScale = interpolate(isOpenAnim, {
    inputRange: [0, 1],
    outputRange: [1.1, 1],
    extrapolate: Extrapolate.CLAMP,
  });
  const contentTranslateBottom = interpolate(isOpenAnim, {
    inputRange: [0, 1, bounce ? 2 : 1],
    outputRange: [contentHeight, 0, bounce ? -contentHeight / 2 : 0],
    extrapolate: Extrapolate.CLAMP,
  });
  const contentTranslateTop = interpolate(isOpenAnim, {
    inputRange: [0, 1, bounce ? 2 : 1],
    outputRange: [-contentHeight, 0, bounce ? contentHeight / 2 : 0],
    extrapolate: Extrapolate.CLAMP,
  });
  //@ts-ignore
  const contentAnimCenterStyle: StyleProp<ViewStyle> = {
    opacity: contentOpacity,
    transform: [
      {
        scale: contentScale,
      },
    ],
  };
  //@ts-ignore
  const contentAnimBottomStyle: StyleProp<ViewStyle> = {
    transform: [
      {
        translateY: contentTranslateBottom,
      },
    ],
  };
  //@ts-ignore
  const contentAnimTopStyle: StyleProp<ViewStyle> = {
    transform: [
      {
        translateY: contentTranslateTop,
      },
    ],
  };
  /* #endregion */

  /* #region  render */
  const backdrop = tranclucent ? (
    <BlurView
      brand={dark ? "light" : "dark"}
      intensity={50}
      style={[styles.backdrop, { opacity: 1 }, backdropStyle]}
    />
  ) : (
    <View
      animated
      style={[styles.backdrop, backdropStyle, backdropAnimStyle]}
    />
  );

  const renderContent = () => {
    let marginBottom =
      position == "bottom"
        ? insets.bottom +
          Platform.select({ ios: 0, default: theme.defaultPadding })
        : 0;
    let cStyle = {};

    if (contentStyle) {
      //@ts-ignore
      const { marginBottom: mBottom, ...c } = contentStyle;
      cStyle = c;
      if (mBottom != undefined) marginBottom = mBottom;
    }

    const style = [
      styles.content,
      // _elevationStyle,
      {
        margin: theme.defaultPadding,
        borderRadius: theme.roundness,
        backgroundColor: theme.colors.surface,
        marginBottom:
          position == "bottom" ? marginBottom + keyboardHeight : marginBottom,
        marginTop: position == "top" ? insets.top : 0,
      },
      cStyle,
    ];
    return tranclucent ? (
      <BlurView brand={dark ? "dark" : "light"} intensity={100} style={style}>
        {children}
      </BlurView>
    ) : (
      <View style={style}>{children}</View>
    );
  };

  return isOpen ? (
    <>
      {backdrop}
      <View style={styles.keyboardAvoidingView}>
        <TouchableOpacity
          disabled={!isDismissable}
          style={[
            styles.container,
            {
              justifyContent:
                position == "center"
                  ? "center"
                  : position == "bottom"
                  ? "flex-end"
                  : "flex-start",
            },
          ]}
          activeOpacity={1}
          onPress={() => _close(false)}
        >
          <PanGestureHandler
            enabled={isDismissable}
            onGestureEvent={_onGestureEvent}
            onHandlerStateChange={_onGestureEvent}
          >
            <Animated.View
              style={[
                commonStyles.full_width,
                position == "center"
                  ? contentAnimCenterStyle
                  : position == "bottom"
                  ? contentAnimBottomStyle
                  : contentAnimTopStyle,
              ]}
            >
              <Pressable
                onLayout={(e) => setContentHeight(e.nativeEvent.layout.height)}
                onPress={() => true}
                style={commonStyles.full_width}
              >
                {renderContent()}
              </Pressable>
            </Animated.View>
          </PanGestureHandler>
        </TouchableOpacity>
      </View>
    </>
  ) : null;
  /* #endregion */
};

export default React.forwardRef(Dialog);

const styles = StyleSheet.create({
  content: {
    alignSelf: "center",
    maxWidth: 500,
  },
  backdrop: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    // zIndex : 100
  },
  keyboardAvoidingView: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
