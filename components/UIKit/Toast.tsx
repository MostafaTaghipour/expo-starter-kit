import Theme from "@app/constants/Theme";
import ThemeManager from "@app/helpers/ThemeManager";
import {
  WToast,
  WSnackBar,
  IToastOpts,
  ISnackBarOpts,
} from "./toastLib";

export class Toast extends WToast {
  static show = (option: IToastOpts) => {
    const theme = ThemeManager.theme;
    const revarseTheme = ThemeManager.reverseTheme;
    const { light, bold, regular } = ThemeManager.font;

    const { style, textStyle, ...otherOptions } = option;
    const defaultOptions: IToastOpts = {
      position: WToast.position.BOTTOM,
      style: [
        {
          backgroundColor: revarseTheme.colors.background,
          borderRadius: theme.roundness,
          minWidth: 150,
          paddingVertical: 12,
          bottom: 24,
        },
        style,
      ],
      textStyle: [
        { fontFamily: regular, color: revarseTheme.colors.text , textAlign:'center' , lineHeight : 25 },
        textStyle,
      ],
      ...otherOptions,
    };
    WToast.show(defaultOptions);
  };

  static success = (option: IToastOpts) => {
    const { style, ...otherOptions } = option;
    const opt: IToastOpts = {
      style: [
        {
          backgroundColor: Theme.light.colors.success,
        },
        style,
      ],
      ...otherOptions,
    };
    Toast.show(opt);
  };

  static error = (option: IToastOpts) => {
    const { style, ...otherOptions } = option;
    const opt: IToastOpts = {
      style: [
        {
          backgroundColor: Theme.light.colors.danger,
        },
        style,
      ],
      ...otherOptions,
    };
    Toast.show(opt);
  };

  static warning = (option: IToastOpts) => {
    const { style, ...otherOptions } = option;
    const opt: IToastOpts = {
      style: [
        {
          backgroundColor: Theme.light.colors.warning,
        },
        style,
      ],
      ...otherOptions,
    };
    Toast.show(opt);
  };
}

export class Snack extends WSnackBar {
  static show = (option: ISnackBarOpts) => {
    const theme = ThemeManager.theme;
    const revarseTheme = ThemeManager.reverseTheme;
    const { light, bold, regular } = ThemeManager.font;

    const { style, actionButtonStyle, textStyle, ...otherOptions } = option;

    const defaultOptions: ISnackBarOpts = {
      position: WSnackBar.position.BOTTOM,
      marginSafeArea: true,
      actionTextStyle: [
        { fontFamily: bold, color: revarseTheme.colors.brand },
        actionButtonStyle,
      ],
      style: [
        {
          backgroundColor: revarseTheme.colors.background,
          borderRadius: theme.roundness,
          marginHorizontal: theme.defaultPadding,
          paddingVertical: theme.defaultPadding,
        },
        style,
      ],
      textStyle: [
        { fontFamily: regular, color: revarseTheme.colors.text },
        textStyle,
      ],
      ...otherOptions,
    };
    WSnackBar.show(defaultOptions);
  };
}
