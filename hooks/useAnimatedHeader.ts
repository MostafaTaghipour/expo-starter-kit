import Animated, {
  call,
  cond,
  diffClamp,
  Easing,
  eq,
  Extrapolate,
  interpolate,
  interpolateColors,
  set,
  timing,
  useCode,
  useValue,
} from "react-native-reanimated";
import useAppDimensions from "./useAppDimensions";
import { useTheme as useNavTheme } from "@react-navigation/native";
import {
  Platform,
  StyleProp,
  ViewStyle,
  TextStyle,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
} from "react-native";
import useAppTheme from "./useAppTheme";
import { RefObject, useRef } from "react";

export type HeaderAnimationConfig = {
  minHeight?: number;
  maxHeight?: number;
  enableSnapping?: boolean;
  hideOnScroll?: boolean;
  hideOnScrollOffset?: number;
  enableBounce?: boolean;
  bounceOffset?: number;
  hasStart?: boolean;
  translucent?: boolean;
};

export enum HeaderState {
  COLLAPSED = 0,
  IDLE,
  EXPAND,
}

export default function useAnimatedHeader(config: HeaderAnimationConfig) {
  /* #region  variables */
  let {
    minHeight,
    maxHeight,
    enableSnapping,
    hideOnScroll,
    hideOnScrollOffset,
    enableBounce,
    bounceOffset,
    translucent,
    hasStart,
  } = config;

  const { headerFullHeight, statusBarHeight } = useAppDimensions();
  const { colors } = useNavTheme();
  const { theme } = useAppTheme();

  minHeight = minHeight || headerFullHeight;
  maxHeight = maxHeight || minHeight + 60;
  if (maxHeight < minHeight) maxHeight = minHeight;
  const isCollapsable = maxHeight > minHeight;
  const range = maxHeight - minHeight;
  const mid = range / 2;
  hideOnScroll = hideOnScroll != undefined ? hideOnScroll : true;
  hideOnScrollOffset = hideOnScroll
    ? hideOnScrollOffset != undefined
      ? hideOnScrollOffset
      : 500
    : 0;
  enableSnapping = enableSnapping != undefined ? enableSnapping : true;
  enableBounce =
    (enableBounce != undefined ? enableBounce : true) && isCollapsable;
  bounceOffset = enableBounce
    ? bounceOffset != undefined
      ? bounceOffset
      : 100
    : 0;
  translucent = translucent != undefined ? translucent : theme.tranclucent;
  hasStart = hasStart != undefined ? hasStart : true;

  const scrollRef = useRef(null);

  
  const scrollTo =
    //@ts-ignore
    scrollRef.current?.scrollTo ||
    //@ts-ignore
    (scrollRef.current?.getNode
      ? //@ts-ignore
        scrollRef.current?.getNode()?.scrollTo
      : undefined) ||
    //@ts-ignore
    (scrollRef.current?.getScrollResponder
      ? //@ts-ignore
        scrollRef.current?.getScrollResponder()?.scrollTo
      : undefined);

  let headerState = HeaderState.EXPAND;
  let yOffsetCurrent = 0;
  const yOffset = useValue<number>(0);
  const intensity = useValue<number>(0);

  /* #endregion */

  /* #region  functions */
  useCode(() => {
    return call([yOffset], (value) => {
      const val = value[0];
      yOffsetCurrent = val;
      if (val == 0) headerState = HeaderState.EXPAND;
      else if (val >= range) headerState = HeaderState.COLLAPSED;
      else headerState = HeaderState.IDLE;

      let ints = 0;
      if (yOffsetCurrent > mid) {
        const mul = 100 / range;
        ints = mul * yOffsetCurrent;
      } else {
        ints = 0;
      }

      ints = ints <= 100 ? ints : 100;

      intensity.setValue(ints);
    });
  }, [yOffset]);

  const scrollEvent = Animated.event([
    {
      nativeEvent: {
        contentOffset: {
          y: yOffset,
        },
      },
    },
  ]);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = event.nativeEvent.contentOffset.y;
    yOffset.setValue(y);
  };

  const onScrollEndDrag = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = event.nativeEvent.contentOffset.y;
    handleSnapping(y);
  };

  const handleSnapping = (y: number) => {
    if (enableSnapping) {
      if (y > mid && y <= range) {
      
        if (scrollTo) scrollTo({ y: range, animated: true });
      } else if (y <= mid && y > 0) {
        if (scrollTo) scrollTo({ y: 0, animated: true });
      }
    }
  };

  /* #endregion */

  /* #region  styles */

  const headerHeight = interpolate(yOffset, {
    inputRange: [-bounceOffset, 0, range],
    outputRange: [maxHeight + bounceOffset, maxHeight, minHeight],
    extrapolate: Extrapolate.CLAMP,
  });

  const diffClampTranslateY = diffClamp(
    yOffset,
    0,
    maxHeight + minHeight + hideOnScrollOffset
  );

  const headerTranslateY = interpolate(diffClampTranslateY, {
    inputRange: [
      0,
      maxHeight + hideOnScrollOffset,
      maxHeight + minHeight + hideOnScrollOffset,
    ],
    outputRange: [0, 0, -minHeight],
    extrapolate: Extrapolate.CLAMP,
  });

  const _headerShadowMax = 0.85;
  const _headerShadowMin = isCollapsable ? 0 : _headerShadowMax;
  const headerShadowOpacity = interpolate(yOffset, {
    inputRange: [0, range / 2, range],
    outputRange: [_headerShadowMin, _headerShadowMin, _headerShadowMax],
    extrapolate: Extrapolate.CLAMP,
  });
  const _headerElevationMax = translucent ? 1 : 4;
  const _headerElevationMin = isCollapsable ? 0 : _headerElevationMax;
  const headerElevation = interpolate(yOffset, {
    inputRange: [0, range / 2, range],
    outputRange: [
      _headerElevationMin,
      _headerElevationMin,
      _headerElevationMax,
    ],
    extrapolate: Extrapolate.CLAMP,
  });
  const _headerBackgroundMax = colors.card;
  const _headerBackgroundMin = isCollapsable
    ? colors.background
    : _headerBackgroundMax;
  const headerBackground = interpolateColors(yOffset, {
    inputRange: [0, range / 2, range],
    outputColorRange: [
      _headerBackgroundMin,
      _headerBackgroundMin,
      _headerBackgroundMax,
    ],
  });

  //@ts-ignore
  const headerStyle: StyleProp<ViewStyle> = {
    position: "absolute",
    top: hideOnScroll ? headerTranslateY : 0,
    right: 0,
    left: 0,
    height: headerHeight,
    backgroundColor: translucent ? "transparent" : headerBackground,
    shadowOpacity: headerShadowOpacity,
    elevation: headerElevation,
  };

  const _titleStart = hasStart ? 40 : 0;
  const _headerTitleStartMax = _titleStart;
  const _headerTitleStartMin = isCollapsable ? 0 : _headerTitleStartMax;
  const headerTitleStart = interpolate(yOffset, {
    inputRange: [0, range],
    outputRange: [_headerTitleStartMin, _headerTitleStartMax],
    extrapolate: Extrapolate.CLAMP,
  });
  //@ts-ignore
  const headerTitleSectionStyle: StyleProp<ViewStyle> = {
    position: "absolute",
    left: headerTitleStart,
    ...Platform.select({
      ios: {
        bottom: 12,
      },
      default: { bottom: 10 },
    }),

    marginHorizontal: theme.defaultPadding,
  };

  const _headerTitleMinFontSize = Platform.select({
    ios: 17,
    android: 20,
    default: 18,
  });
  const _headerTitleMaxFontSize: number = isCollapsable
    ? Platform.select({
        ios: 31,
        android: 33,
        default: 32,
      })
    : _headerTitleMinFontSize;

  const headerTitleFontSize = interpolate(yOffset, {
    inputRange: [-bounceOffset, 0, range],
    outputRange: [
      
      enableBounce ? _headerTitleMaxFontSize + 30 : _headerTitleMaxFontSize,
      _headerTitleMaxFontSize,
      _headerTitleMinFontSize,
    ],
    extrapolate: Extrapolate.CLAMP,
  });
  //@ts-ignore
  const headerTitleStyle: StyleProp<TextStyle> = {
    fontSize: headerTitleFontSize,
  };

  //@ts-ignore
  const headerStartSectionStyle: StyleProp<ViewStyle> = {
    bottom: undefined,
    height: minHeight - statusBarHeight,
  };
  //@ts-ignore
  const headerEndSectionStyle: StyleProp<ViewStyle> = {
    bottom: undefined,
    height: minHeight - statusBarHeight,
  };

  const contentContainerStyle: StyleProp<ViewStyle> = {
    paddingTop: maxHeight,
  };
  /* #endregion */

  return {
    state: headerState,
    y: yOffset,
    minHeight,
    maxHeight,
    range,
    headerProps: {
      blurIntensity: intensity,
      animated: true,
      headerStyle,
      startSectionStyle: headerStartSectionStyle,
      endSectionStyle: headerEndSectionStyle,
      titleSectionStyle: headerTitleSectionStyle,
      titleTextStyle: headerTitleStyle,
      translucent,
    },
    scrollViewProps: {
      scrollEventThrottle: 1,
      animated: true,
      contentContainerStyle,
      onScroll:scrollEvent,
      onScrollEndDrag,
      translucent,
      ref: scrollRef,
    },
  };
}
