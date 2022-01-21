import { Scope, TranslateOptions } from "i18n-js";

export declare type FontWeight = "regular" | "bold" | "light";
export declare type DirectionType = "rtl" | "ltr";
export declare type PossibleLocales = "fa" | "en";
export declare type ThemeType = "light" | "dark";
export declare type TranslateType = (
  scope: Scope,
  options?: TranslateOptions
) => string;

/* #region  Messages */
export interface ToastConfiguration {
  text: string;
  actionText?: string;
  type?: "danger" | "success" | "warning";
  duration?: number;
  onDismiss?: () => any;
  onActionClick?: () => any;
}

export interface ConfirmConfiguration {
  title?: string;
  message: string;
  positiveButtonTitle?: string;
  negativeButtonTitle?: string;
  onPositiveButtonPress?: () => any;
  onNegativeButtonPress?: () => any;
}

export interface AlertConfiguration {
  title?: string;
  message: string;
  buttonTitle?: string;
  onButtonPress?: () => any;
}
/* #endregion */
