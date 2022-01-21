import React, { useEffect, useState } from "react";
import {
  Platform,
  View as DefaultView,
  StyleSheet,
  StyleProp,
  ViewStyle,
  KeyboardAvoidingView,
  ScrollView,
  View,
  KeyboardAvoidingViewProps,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLayout } from "react-native-web-hooks";

import { Main } from "@expo/html-elements";
import { useAppTheme, useAppDimensions } from "@app/hooks";
import Animated from "react-native-reanimated";
import { useHeaderHeight } from "@react-navigation/stack";
import constants from "@app/constants";
import { commonStyles } from "@app/constants/Classifications";

type Props = {
  tranclucent?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
  safeArea?: {
    top?: boolean;
    bottom?: boolean;
    start?: boolean;
    end?: boolean;
  };
  inset?: { top?: number; bottom?: number; start?: number; end?: number };
  keyboardAvoiding?: boolean;
};


export type ContentViewProps = Props &
  DefaultView["props"] &
  ScrollView["props"] &
  KeyboardAvoidingViewProps;

const ContentView: React.ForwardRefRenderFunction<
  ScrollView | null,
  ContentViewProps
> = (props, ref) => {
  let {
    tranclucent,
    style,
    contentContainerStyle,
    contentStyle,
    safeArea,
    scrollEventThrottle,
    showsVerticalScrollIndicator,
    scrollEnabled,
    inset,
    keyboardAvoiding,
    keyboardVerticalOffset,
    behavior,
    ...otherProps
  } = props;

  const [bottomBarHeight, setBottomBarHeight] = useState(0);
  const { onLayout, width } = useLayout();
  const { theme } = useAppTheme();
  const { bottom, top, left, right } = useSafeAreaInsets();
  const { getCurrentBottomBarHeight } = useAppDimensions();
  const headerHeight = useHeaderHeight();


  tranclucent = tranclucent != undefined ? tranclucent : theme.tranclucent;
  keyboardAvoiding = keyboardAvoiding != undefined ? keyboardAvoiding : true;

  safeArea = safeArea || { top: false, bottom: false, start: true, end: true };

  const defaultTopPadding = tranclucent
    ? headerHeight + theme.defaultPadding
    : theme.defaultPadding;
  const defaultBottomPadding = tranclucent
    ? bottomBarHeight + theme.defaultPadding
    : theme.defaultPadding;

  inset = inset || {
    top: defaultTopPadding,
    bottom: defaultBottomPadding,
    start: theme.defaultPadding,
    end: theme.defaultPadding,
  };

  const paddingTop =
    (safeArea.top ? top : 0) +
    (inset.top != undefined ? inset.top : defaultTopPadding);
  const paddingBottom =
    Platform.select({
      ios: 0, // keyboardAvoiding &&  keyboardShown ? keyboardHeight : 0,
      default: 0,
    }) +
    (safeArea.bottom ? bottom : 0) +
    (inset.bottom != undefined ? inset.bottom : defaultBottomPadding);
  const paddingStart =
    (safeArea.start ? left : 0) +
    (inset.start != undefined ? inset.start : theme.defaultPadding);
  const paddingEnd =
    (safeArea.end ? right : 0) +
    (inset.end != undefined ? inset.end : theme.defaultPadding);

  let _ref = React.useRef(null);

  //@ts-ignore
  React.useImperativeHandle(ref, () => _ref.current?.getNode());

  useEffect(() => {
    setTimeout(() => {
      setBottomBarHeight(getCurrentBottomBarHeight());
    }, 0);
  }, []);

  const renderContent = () => {
    return (
      <Main
        style={[
          styles.main,
          {
            paddingStart: paddingStart,
            paddingEnd: paddingEnd,
            paddingBottom,
            paddingTop,
            opacity: width === 0 ? 0 : 1,
            width: "100%",
          },
          width > constants.MAX_WIDTH && { width: constants.MAX_WIDTH },
          contentStyle,
        ]}
      >
        {props.children}
      </Main>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: "padding", default: undefined })}
      style={commonStyles.flex_1}
      enabled={keyboardAvoiding}
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      {scrollEnabled == false ? (
        <View
          onLayout={onLayout as any}
          style={[
            { backgroundColor: theme.colors.background },
            styles.scrollView,
            styles.scrollViewContent,
            contentContainerStyle,
            style,
          ]}
          {...otherProps}
        >
          {renderContent()}
        </View>
      ) : (
        <Animated.ScrollView
          ref={_ref}
          scrollEnabled={scrollEnabled}
          scrollEventThrottle={scrollEventThrottle || 1}
          onLayout={onLayout as any}
          contentContainerStyle={[
            styles.scrollViewContent,
            contentContainerStyle,
          ]}
          style={[
            { backgroundColor: theme.colors.background },
            styles.scrollView,
            style,
          ]}
          showsVerticalScrollIndicator={showsVerticalScrollIndicator || false}
          {...otherProps}
        >
          {renderContent()}
        </Animated.ScrollView>
      )}
    </KeyboardAvoidingView>
  );
};

export default React.forwardRef(ContentView);

const styles = StyleSheet.create({
  main: {
    alignItems: "center",
  },

  scrollView: {
    flex: 1,
    ...Platform.select({
      web: {
        ...StyleSheet.absoluteFillObject,
        overflow: "scroll",
      },
    }),
  },


  scrollViewContent: {
    alignItems: "center",
    flexGrow: 1,
    ...Platform.select({
      web: {
        transitionDuration: "0.5s",
        transitionProperty: "all",
      },
    }),
  },
});
