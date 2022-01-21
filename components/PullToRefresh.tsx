/**
 * Container for ScrollView/FlatList, providing custom pull-to-refresh Header support
 */
/* eslint-disable */
import React, {
  PropsWithChildren,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  PanResponder,
  StyleSheet,
  ViewStyle,
  NativeSyntheticEvent,
  NativeScrollEvent,
  View,
} from "react-native";
import { ActivityIndicator, Row, Text } from "./UIKit";
import Animated, {
  call,
  Easing,
  Extrapolate,
  interpolate,
  useCode,
} from "react-native-reanimated";
import Ionicons from "./Ionicons";
import { useAppDimensions, useAppLocale, useAppTheme } from "@app/hooks";
import { elevationStyle } from "@app/constants/Classifications";




/* #region  Loading control */
type PullToRefreshHeaderProps = {
  loadingTitle?: string;
  releaseTitle?: string;
  pullTitle?: string;
  refreshing: boolean;
  animRef: RefObject<Animated.Value<number>>;
  headerHeight: number;
  absoluteView: boolean;
} & View["props"];

const PullToRefreshHeader = (props: PullToRefreshHeaderProps) => {
  let {
    loadingTitle,
    pullTitle,
    releaseTitle,
    animRef,
    headerHeight,
    refreshing,
    absoluteView,
    ...otherProps
  } = props;

  const { t } = useAppLocale();
  const {
    theme: { colors, roundness, defaultPadding },
  } = useAppTheme();

  const elevation = elevationStyle();

  pullTitle = pullTitle != undefined ? pullTitle : t("refreshing.pull");
  loadingTitle =
    loadingTitle != undefined ? loadingTitle : t("refreshing.loading");
  releaseTitle =
    releaseTitle != undefined ? releaseTitle : t("refreshing.release");

  const percentAnim = useRef(Animated.divide(animRef.current!, headerHeight))
    .current;

  const [percent, setPercent] = useState(0);

  useCode(() => {
    if (percentAnim)
      return call([percentAnim], (value) => {
        const val = value[0];
        setPercent(val);
      });
  }, [percentAnim]);

  const rotate = interpolate(percentAnim, {
    inputRange: [0, 0.5, 1.5, 2],
    outputRange: ["0deg", "0deg", "180deg", "180deg"],
    extrapolate: Extrapolate.CLAMP,
  });

  return (
    <Animated.View
      style={[
        loadingStyles.con,
        { opacity: percentAnim, height: headerHeight },
      ]}
      {...otherProps}
    >
      <View
        style={[
          {
            padding: defaultPadding,
            backgroundColor: colors.surface,
            borderRadius: roundness,
          },
          absoluteView && {
            width: 250,
            ...elevation,
          },
        ]}
      >
        <Row style={loadingStyles.content}>
          {refreshing ? (
            <ActivityIndicator style={loadingStyles.icon} />
          ) : (
            <Animated.View
              style={[loadingStyles.icon, { transform: [{ rotate }] }]}
            >
              <Ionicons
                name={"arrow-round-down"}
                size={24}
                color={colors.brand}
              />

            </Animated.View>
          )}
          <Text>
            {percent >= 1
              ? refreshing
                ? loadingTitle
                : releaseTitle
              : pullTitle}
          </Text>
        </Row>
      </View>
    </Animated.View>
  );
};

const loadingStyles = StyleSheet.create({
  con: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  content: {
    // minWidth: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    marginEnd: 16,
  },
});

/* #endregion */

type Props = {
  // header absolute top
  headerTop: number;
  // The height of the HEADER component is also a drop-down distance triggered.
  headerHeight: number;
  // Whether it is dropped in the new request data
  refreshing: boolean;
  // Subcaps, can only be scrollView / flatlist, etc.
  children: JSX.Element;
  // When the pull-down refresh is reached, the parent is called.
  onRefresh: () => void;
  // refresh when reach at headerHeight
  needReleaseToRefresh: boolean;
  // refresh when reach at headerHeight
  absoluteView: boolean;
  //TODO
  scrollOffsetY: number;
  // title of text in refresh view
  loadingTitle?: string;
  releaseTitle?: string;
  pullTitle?: string;
} & View["props"];

const PullToRefresh = (props: PropsWithChildren<Props>) => {
  let {
    children,
    style,
    absoluteView,
    headerHeight,
    needReleaseToRefresh,
    refreshing,
    headerTop,
    loadingTitle,
    pullTitle,
    releaseTitle,
    scrollOffsetY,
    onRefresh,
    ...otherProps
  } = props;

  const {
    window: { width },
  } = useAppDimensions();

  // Distance of current container moving
  const [containerTranslateY, setContainerTranslateY] = useState(0);

  // last scrollview scroll position
  // const [lastScrollPosition, setLastScrollPosition] = useState(0);

  // The container deviates from the distance from the top
  const containerTop = useRef(new Animated.Value<number>(0));

  // inner scroll ref
  const _scrollRef = useRef(null);

  // scroll pan responder
  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (e, gestureState) =>
          gestureState.dy > 0 && scrollOffsetY == 0,
        onPanResponderMove: (e, state) => {
          if (refreshing || scrollOffsetY > 0) return;

          if (state.dy < headerHeight * 2) {
            containerTop.current.setValue(state.dy);
          }
          if (!needReleaseToRefresh && state.dy >= headerHeight) {
            onRefresh();
          }
        },
        onPanResponderRelease: (e, state) => {
          if (refreshing) return;
          if (scrollOffsetY == 0 && state.dy > 0 && state.dy >= headerHeight) {
            // Trigger refresh
            onRefresh();
          } else {
            // Didn't get refreshing position, roll back to the top
            _resetContainerPosition();
          }
        },
      }),
    [scrollOffsetY, refreshing]
  );

  useEffect(() => {
    if (refreshing) {
      // From unloaded changes to load
      Animated.timing(containerTop.current, {
        toValue: headerHeight,
        duration: 150,
        easing: Easing.inOut(Easing.ease),
      }).start();
    } else if (!refreshing) {
      // Change from load to unloaded
      Animated.timing(containerTop.current, {
        toValue: 0,
        duration: 250,
        easing: Easing.inOut(Easing.ease),
      }).start();
    }
  }, [refreshing]);

  useCode(() => {
    if (containerTop.current)
      return call([containerTop.current], (value) => {
        const val = value[0];
        setContainerTranslateY(val);
      });
  }, [containerTop.current]);

  const _updateInnerScrollRef = (node: any) => {
    // Keep your own reference
    _scrollRef.current = node;
    // Call the original ref, if any
    //@ts-ignore
    const { ref } = children;

    if (typeof ref === "function") {
      ref(node);
    } else if (typeof ref === "object") {
      ref.current = node;
    }
  };

  const _resetContainerPosition = () => {
    Animated.timing(containerTop.current, {
      toValue: 0,
      duration: 250,
      easing: Easing.inOut(Easing.ease),
    }).start();
  };

  const _innerScrollCallback = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    // keep latest scroll y position
    // setLastScrollPosition(event.nativeEvent.contentOffset.y);

    //@ts-ignore
    const { onScroll } = children.props;

    if (onScroll && typeof onScroll === "function") onScroll(event);
  };

  const renderHeader = () => {
    const style: Animated.AnimateStyle<ViewStyle> = {
      position: "absolute",
      left: 0,
      width,
      top: (headerTop || 0) - headerHeight,
      transform: [{ translateY: containerTop.current }],
    };

    return (
      <Animated.View style={style}>
        <PullToRefreshHeader
          pullTitle={pullTitle}
          loadingTitle={loadingTitle}
          releaseTitle={releaseTitle}
          refreshing={refreshing}
          animRef={containerTop}
          headerHeight={headerHeight}
          absoluteView={absoluteView}
        />
      </Animated.View>
    );
  };

  const scrollView = React.cloneElement(children, {
    // onScroll: _innerScrollCallback,
    // onScrollEndDrag: _innerScrollEndDrag,
    // ref: this._updateInnerScrollRef,
    bounces: false,
    alwaysBounceVertical: false,
    // scrollEnabled: !refreshing,
    // ...panResponder.panHandlers,
  });

  const scrollViewTranslateY = absoluteView ? 0 : containerTop.current;

  return (
    <>
      <Animated.View
        style={[
          {
            flexGrow: 1,
            width: "100%",
            transform: [{ translateY: scrollViewTranslateY }],
          },
        ]}
        {...otherProps}
        {...panResponder.panHandlers}
      >
        {scrollView}
      </Animated.View>
      {renderHeader()}
    </>
  );
};

PullToRefresh.defaultProps = {
  refreshing: false,
  headerHeight: 70,
  needReleaseToRefresh: true,
  absoluteView: false,
};

export default PullToRefresh;
