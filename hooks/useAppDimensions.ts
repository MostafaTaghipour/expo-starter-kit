import { getDefaultHeaderHeight } from "@app/helpers/UIHelper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDimensions } from "react-native-web-hooks";
import { useDeviceOrientation } from "@react-native-community/hooks";
import {
  getCurrentBottomBarHeight,
  isBottomBarVisible,
} from "@app/components/BottomTabBar";


export default function useAppDimensions() {
  const dimens = useDimensions();
  const { top } = useSafeAreaInsets();
  const orientation = useDeviceOrientation();
  const headerHeight = getDefaultHeaderHeight(orientation.landscape, 0);
  const insets = useSafeAreaInsets();

  return {
    ...dimens,
    statusBarHeight: top,
    headerHeight,
    headerFullHeight: headerHeight + top,
    insets,
    orientation,
    getCurrentBottomBarHeight,
    isBottomBarVisible,
  };
}
