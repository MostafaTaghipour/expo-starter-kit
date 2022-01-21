import * as VP from "@react-native-community/viewpager";
import { I18nManager } from "react-native";
import React, {
  PropsWithChildren,
  useImperativeHandle,
  createRef,
} from "react";

export interface ViewPagerProps extends VP.ViewPagerProps {}

export interface ViewPagerRef {
  setPage: (selectedPage: number) => any;
  setPageWithoutAnimation: (selectedPage: number) => any;
}

const ViewPager: React.ForwardRefRenderFunction<
  ViewPagerRef | null,
  PropsWithChildren<ViewPagerProps>
> = (props, ref) => {
  const viewPagerRef = React.createRef<VP.default>();
  const isRTL = I18nManager.isRTL;
  const lastIndex = React.Children.count(props.children) - 1;

  const setPage = (selectedPage: number) => {
    viewPagerRef.current!.setPage(normalizeIndex(selectedPage));
  };

  const setPageWithoutAnimation = (selectedPage: number) => {
    viewPagerRef.current!.setPageWithoutAnimation(normalizeIndex(selectedPage));
  };

  useImperativeHandle(ref, () => ({
    setPage,
    setPageWithoutAnimation,
  }));

  const normalizeIndex = (index?: number): number => {
    const i = index || 0;
    return isRTL ? lastIndex - i : i;
  };

  return (
    <VP.default
      {...props}
      ref={viewPagerRef}
      initialPage={normalizeIndex(props.initialPage)}
      onPageSelected={(e) => {
        e.nativeEvent.position = normalizeIndex(e.nativeEvent.position);
        if (props.onPageSelected) props.onPageSelected(e);
      }}
      onPageScroll={(e) => {
        e.nativeEvent.position = normalizeIndex(e.nativeEvent.position);
        if (props.onPageScroll) props.onPageScroll(e);
      }}
    >
      {isRTL
        ? React.Children.map(props.children, (item) => item)?.reverse()
        : props.children}
    </VP.default>
  );
};

export default React.forwardRef(ViewPager);
