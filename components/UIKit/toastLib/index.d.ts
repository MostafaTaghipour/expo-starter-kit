import { ReactNode, Component } from "react";
import { Animated, TextStyle, ViewStyle, StyleProp } from "react-native";

export interface IToastOpts {
  text?: string;
  content?: React.ReactNode;
  duration?: number;
  position?: number;
  inEasing?: (value: number) => number;
  textColor?: string;
  textStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  backgroundColor?: string;
  icon?: ReactNode;
}

export class WToast {
  static show: (option: IToastOpts) => void;
  static hide: () => void;
  static duration: {
    LONG: number;
    SHORT: number;
  };
  static position: {
    TOP: number;
    CENTER: number;
    BOTTOM: number;
  };
}

export interface ISnackBarOpts {
  text?: string;
  content?: React.ReactNode;
  duration?: number;
  position?: number;
  style?: StyleProp<ViewStyle>;
  inEasing?: (value: number) => number;
  textColor?: string;
  textStyle?: StyleProp<TextStyle>;
  backgroundColor?: string;
  actionText?: string;
  actionTextColor?: string;
  actionTextStyle?: StyleProp<TextStyle>;
  actionButtonStyle?: StyleProp<ViewStyle>;
  isAllowSlideExit?: boolean;
  marginSafeArea?: boolean;
  onActionHide?: (isSlideHide: boolean) => void;
}

export class WSnackBar {
  static show: (option: ISnackBarOpts) => void;
  static hide: () => void;
  static duration: {
    LONG: number;
    SHORT: number;
    INDEFINITE: number;
  };
  static position: {
    TOP: number;
    BOTTOM: number;
  };
}

export interface IModalOpts {
  data: string;
  position?: number;
  inEasing?: (value: number) => number;
  textColor?: string;
  backgroundColor?: string;
  icon?: ReactNode;
  onRequestClose?: () => void;
}

export class WModal {
  static show: (option: IModalOpts) => void;
  static hide: () => void;

  static position: {
    TOP: number;
    CENTER: number;
    BOTTOM: number;
  };
}

const toastInstance = (opt: IToastOpts) => {};

export interface IModalShowToastProps {
  toastInstance: (func: any) => toastInstance;
}

export class WModalShowToastView extends Component<IModalShowToastProps> {}

const ToastDefaultOpt: IToastOpts;
const SnackBarDefaultOpt: ISnackBarOpts;

export {
  WModal,
  WSnackBar,
  WToast,
  WModalShowToastView,
  ToastDefaultOpt,
  SnackBarDefaultOpt,
};
