import { Platform } from "react-native";

export const hexToRGB = (hex: string, alpha?: number): string => {
  var r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  } else {
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }
};

export const stringToColor = (value: string): string => {
  var hash = 0;
  for (var i = 0; i < value.length; i++) {
    hash = value.charCodeAt(i) + ((hash << 5) - hash);
  }

  var c = (hash & 0x00ffffff).toString(16).toUpperCase();

  return "#" + ("00000".substring(0, 6 - c.length) + c);
};

export const isColorLight = (color: string): boolean => {
  const hex = color.replace("#", "");
  const c_r = parseInt(hex.substr(0, 2), 16);
  const c_g = parseInt(hex.substr(2, 2), 16);
  const c_b = parseInt(hex.substr(4, 2), 16);
  const brightness = (c_r * 299 + c_g * 587 + c_b * 114) / 1000;
  return brightness > 155;
};

export const getDefaultHeaderHeight = (
  isLandscape: boolean,
  statusBarHeight: number
): number => {
  let headerHeight;

  if (Platform.OS === "ios") {
    if (isLandscape && !Platform.isPad) {
      headerHeight = 32;
    } else {
      headerHeight = 44;
    }
  } else if (Platform.OS === "android") {
    headerHeight = 56;
  } else {
    headerHeight = 64;
  }

  return headerHeight + statusBarHeight;
};

export const getDefaultBottomBarHeight = (
  isLandscape: boolean,
  bottomInset: number
): number => {
  let height;

  if (isLandscape) {
    height = 29;
  } else {
    height = 49;
  }

  return height + bottomInset;
};

export const setTabbarVisibility = (
  navigation: any,
  tabBarVisible: boolean
) => {
  navigation.dangerouslyGetParent()?.setOptions({
    tabBarVisible,
  });
};
