import {
  FlatList as GestureHandlerFlatList,
  ScrollView as _ScrollView,
} from "react-native-gesture-handler";
import { FlatListProps, SectionList, SectionListProps } from "react-native";
import * as React from "react";
import Animated from "react-native-reanimated";

const FlatListComponent = Animated.createAnimatedComponent(
  GestureHandlerFlatList
);

export const AnimatedFlatList = React.forwardRef(
  (props: FlatListProps<any>, ref) => {
    let _ref = React.useRef();

    //@ts-ignore
    React.useImperativeHandle(ref, () => _ref.current.getNode());

    return <FlatListComponent {...props} ref={_ref} />;
  }
);

const SectionListComponent = Animated.createAnimatedComponent(SectionList);

export const AnimatedSectionList = React.forwardRef(
  (props: SectionListProps<any>, ref) => {
    let _ref = React.useRef();

    //@ts-ignore
    React.useImperativeHandle(ref, () => _ref.current.getNode());

    return <SectionListComponent {...props} ref={_ref} />;
  }
);
