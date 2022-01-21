import constants from "@app/constants";
import { commonStyles, elevationStyle } from "@app/constants/Classifications";
import ThemeManager from "@app/helpers/ThemeManager";
import {
  useAppDimensions,
  useAppLocale,
  useAppTheme,
  useGetRequestStatus,
} from "@app/hooks";
import { GetPaginationRequestState, GetRequestState } from "@app/store/types";
import { AntDesign } from "@expo/vector-icons";
import React, {
  PropsWithChildren,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  FlatListProps,
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";
import Animated, {
  call,
  diffClamp,
  Extrapolate,
  interpolate,
  log,
  SpringUtils,
  useCode,
  useValue,
} from "react-native-reanimated";
import { AnimatedFlatList } from "./Animated";
import ContentStatusHandler, {
  ContentStatusHandlerProps,
} from "./ContentStatusHandler";
import Ionicons from "./Ionicons";
import PullToRefresh from "./PullToRefresh";
import { ActivityIndicator, Button, Col, H4, Row, Text, View } from "./UIKit";


export type PagedListProps = ContentStatusHandlerProps &
  FlatListProps<any> & {
    firstPageIndex?: number;
    pageSize?: number;
    scrollViewProps?: any;
    state: GetPaginationRequestState;
    onLoad: (page: number, force: boolean) => any;
    loadMoreType: "infiniteScroll" | "loadButton";
    refreshable: boolean;
    enableScrollToTop: false;
    //TODO
    scrollOffsetY?: Animated.Value<number>;
  };
const PagedList = (props: PropsWithChildren<PagedListProps>) => {
  // destructuring props
  let {
    scrollViewProps,
    onLoad,
    firstPageIndex,
    pageSize,
    loadMoreType,
    refreshable,
    scrollOffsetY,
    ...otherPagedListProps
  } = props;

  // destructuring ContentStatusHandlerProps
  const {
    state,
    showDisconnectViewIfNeed,
    showEmptyViewIfNeed,
    showErrorViewIfNeed,
    showLoadingViewIfNeed,
    children,
    onRetry,
    emptyViewIcon,
    emptyViewTitle,
    emptyViewSubtitle,
    disconnectViewIcon,
    disconnectViewTitle,
    disconnectViewSubtitle,
    errorViewIcon,
    errorViewTitle,
    enableScrollToTop,
    errorViewSubtitle,
    ...flatListProps
  } = otherPagedListProps;

  const {
    theme: {
      defaultPadding,
      colors: { brand: tintColor, disable: disableColor },
    },
  } = useAppTheme();
  const {
    insets: { bottom },
  } = useAppDimensions();
  const { t } = useAppLocale();
  const [refreshing, setRefreshing] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const _scrollRef = useRef(null);
  useCode(() => {
    if (scrollOffsetY)
      return call([scrollOffsetY], (value) => {
        const val = value[0];
        setScrollY(val);
      });
  }, [scrollOffsetY]);

  // destructuring FlatListProps
  const { data, loaded, loading, page: lastPage, error } = state;
  firstPageIndex =
    firstPageIndex != undefined ? firstPageIndex : constants.FIRST_PAGE_NUMBER;
  pageSize = pageSize != undefined ? pageSize : constants.DEFAULT_PAGE_SIZE;

  useEffect(() => {
    if (!loading) setRefreshing(false);
  }, [loading]);

  // load more function
  const loadMoreData = () => {
    loadData(lastPage + 1, false);
  };

  // load function
  const loadData = (page = firstPageIndex, force = true) => {
    // if already loading data dont continuo
    if (!force && loading) return;

    // if all data loaded dont coninuo
    if (!force && state.total <= page! * pageSize!) return;

    // call load function
    onLoad(page!, force);
  };

  const _updateInnerScrollRef = (node: any) => {
    // Keep your own reference
    _scrollRef.current = node;
    // Call the original ref, if any
    //@ts-ignore
    const { ref } = scrollViewProps;

    if (typeof ref === "function") {
      ref(node);
    } else if (typeof ref === "object") {
      ref.current = node;
    }
  };

  const renderFooter = () => {
    if (!loading && !error && loadMoreType != "loadButton") return null;
    return (
      <View
        style={[
          styles.footer,
          {
            padding: defaultPadding,
          },
        ]}
      >
        {loading ? (
          <ActivityIndicator size="small" color={tintColor} />
        ) : error ? (
          <Row
            style={[
              commonStyles.full_width,
              commonStyles.align_items_end,
              commonStyles.justify_content_space_between,
            ]}
          >
            {errorViewIcon || (
              <AntDesign name="warning" size={50} color={disableColor} />
            )}
            <Col
              style={[commonStyles.flex_1, commonStyles.margin_horizontal_8]}
            >
              <H4>{errorViewTitle || t("error.general")}</H4>
              <Text style={commonStyles.margin_top_8}>
                {errorViewSubtitle ||
                  error.userMessage ||
                  t("error.general_desc")}
              </Text>
            </Col>
            <Button
              size="small"
              type="bordered"
              onPress={() => loadMoreData()}
              title={t("retry")}
            />
          </Row>
        ) : loadMoreType == "loadButton" ? (
          <Button
            title={t("more_items")}
            type="bordered"
            size="small"
            style={styles.loadMoreButton}
            onPress={loadMoreData}
          />
        ) : null}
      </View>
    );
  };

  const renderList = () => {
    return (
      <AnimatedFlatList
        {...scrollViewProps}
        style={styles.list}
        onEndReached={
          loadMoreType == "infiniteScroll" && !error ? loadMoreData : undefined
        }
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={renderFooter}
        {...flatListProps}
        contentContainerStyle={[
          scrollViewProps?.contentContainerStyle,
          { paddingBottom: bottom + defaultPadding },
          flatListProps.contentContainerStyle,
        ]}
        data={flatListProps.data || data}
        ref={_updateInnerScrollRef}
      />
    );
  };

  return (
    <ContentStatusHandler
      {...{
        state,
        showDisconnectViewIfNeed,
        showEmptyViewIfNeed,
        showErrorViewIfNeed,
        showLoadingViewIfNeed,
        emptyViewIcon,
        emptyViewTitle,
        emptyViewSubtitle,
        disconnectViewIcon,
        disconnectViewTitle,
        disconnectViewSubtitle,
        errorViewIcon,
        errorViewTitle,
        errorViewSubtitle,
      }}
      onRetry={loadData}
    >
      {refreshable && scrollOffsetY ? (
        <PullToRefresh
          headerTop={scrollViewProps.contentContainerStyle.paddingTop}
          refreshing={refreshing}
          onRefresh={() => {
            loadData();
            setRefreshing(true);
          }}
          scrollOffsetY={scrollY}
        >
          {renderList()}
        </PullToRefresh>
      ) : (
        renderList()
      )}
      {enableScrollToTop && scrollOffsetY && (
        <ScrollToTop
          yOffset={scrollY}
          //@ts-ignore
          marginBottom={flatListProps?.contentContainerStyle?.paddingBottom}
          scrollRef={_scrollRef}
        ></ScrollToTop>
      )}
    </ContentStatusHandler>
  );
};

PagedList.defaultProps = {
  showDisconnectViewIfNeed: true,
  showEmptyViewIfNeed: true,
  showErrorViewIfNeed: true,
  showLoadingViewIfNeed: true,
  loadMoreType: "infiniteScroll",
  data: undefined,
  refreshable: false,
  enableScrollToTop: true,
};

export default PagedList;

/* #region  Scroll to top */
const FAB_SIZE = 50;

//todo hide on scroll down
const ScrollToTop = React.memo(
  (props: {
    yOffset: number;
    marginBottom?: number;
    threshold?: number;
    scrollRef: RefObject<any>;
  }) => {
    let { yOffset, marginBottom, threshold, scrollRef } = props;

    const {
      insets: { bottom },
    } = useAppDimensions();

    const {
      theme: { defaultPadding },
    } = useAppTheme();

    marginBottom =
      marginBottom != undefined ? marginBottom : bottom + defaultPadding;

    threshold = threshold != undefined ? threshold : 200;

    const [isShow, setIsShow] = useState(false);

    useEffect(() => {
      startAnimation(isShow ? 1 : 0);
    }, [isShow]);

    const isShowAnim = useRef(new Animated.Value<number>(0)).current;

    const springConfig = SpringUtils.makeConfigFromBouncinessAndSpeed({
      ...SpringUtils.makeDefaultConfig(),
      bounciness: 4,
      speed: 14,
    });

    const startAnimation = (
      to: Animated.Adaptable<any>,
      callback?: (data: { finished: boolean }) => any
    ) => {
      Animated.spring(isShowAnim, {
        ...springConfig,
        toValue: to,
      }).start(callback);
    };

    const show = () => {
      if (isShow) return;
      setIsShow(true);
    };

    const hide = () => {
      if (!isShow) return;
      setIsShow(false);
    };

    const scrollToTop = () => {
      if (scrollRef.current.scrollToOffset) {
        scrollRef.current.scrollToOffset({ animated: true, offset: 0 });
      } else if (scrollRef.current.scrollTo({ x: 0, y: 0, animated: true })) {
        scrollRef.current.scrollTo({ x: 0, y: 0, animated: true });
      }
    };

    const prevY = useRef(0);

    const direction: "up" | "down" | "no_chnage" =
      yOffset > prevY.current
        ? "down"
        : yOffset < prevY.current
        ? "up"
        : "no_chnage";

    prevY.current = yOffset;

    if (yOffset < threshold) hide();
    if (direction == "up" && yOffset > threshold) show();
    if (direction == "down") hide();

    const translateY = interpolate(isShowAnim, {
      inputRange: [0, 1],
      outputRange: [FAB_SIZE + marginBottom, 0],
      extrapolate: Extrapolate.CLAMP,
    });

    return (
      <Animated.View
        style={[
          styles.fab,
          {
            height: FAB_SIZE,
            bottom: marginBottom,
            start: defaultPadding,
            transform: [{ translateY }],
          },
        ]}
      >
        <Button onPress={scrollToTop} noPadding>
          <Ionicons
            style={[
              {
                width: FAB_SIZE,
                height: FAB_SIZE,
                lineHeight: FAB_SIZE,
                textAlign: "center",
              },
            ]}
            name={"arrow-up"}
            size={24}
            color={ThemeManager.reverseTheme.colors.text}
          />
        </Button>
      </Animated.View>
    );
  }
);
/* #endregion */

const styles = StyleSheet.create({
  list: { width: "100%", flex: 1, flexGrow: 1 },
  footer: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadMoreButton: {
    minWidth: 150,
  },
  fab: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
});
