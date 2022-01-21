import { Alert, Platform } from "react-native";
import {
  AlertConfiguration,
  ConfirmConfiguration,
} from "@app/types";


/* #region  Alert */
export const showNativeAlert = (config: AlertConfiguration) => {
  var alert = new NativeAlert(config.message);

  if (config.title) alert.setTitle(config.title);
  if (config.buttonTitle) alert.setButtonTitle(config.buttonTitle);
  if (config.onButtonPress) alert.onButtonPress(config.onButtonPress);

  alert.show();
};
export class NativeAlert {
  private _title: string = "";
  private readonly _message: string;
  private _buttonTitle: string = "OK";
  private _onButtonPress?: () => any;

  constructor(message: string) {
    this._message = message;
  }

  setTitle(title: string) {
    this._title = title;
    return this;
  }

  setButtonTitle(title: string) {
    this._buttonTitle = title;
    return this;
  }

  onButtonPress(onPress: () => any) {
    this._onButtonPress = onPress;
    return this;
  }

  show() {
    if (Platform.OS == "web") {
      alert(`${this._title}\n${this._message}`);
      if (this._onButtonPress) this._onButtonPress();
    } else {
      Alert.alert(
        this._title,
        this._message,
        [{ text: this._buttonTitle, onPress: () => this._onButtonPress }],
        { cancelable: false }
      );
    }
  }
}
/* #endregion */

/* #region  Confirm */
export const showNativeConfirm = (config: ConfirmConfiguration) => {
  var confirm = new NativeConfirm(config.message);

  if (config.title) confirm.setTitle(config.title);
  if (config.negativeButtonTitle)
    confirm.setNegativeButtonTitle(config.negativeButtonTitle);
  if (config.positiveButtonTitle)
    confirm.setPositiveButtonTitle(config.positiveButtonTitle);
  if (config.onNegativeButtonPress)
    confirm.onNegativeButtonPress(config.onNegativeButtonPress);
  if (config.onPositiveButtonPress)
    confirm.onPositiveButtonPress(config.onPositiveButtonPress);

  confirm.show();
};
export class NativeConfirm {
  private _title: string = "";
  private readonly _message: string;
  private _positiveButtonTitle: string = "Yes";
  private _negativeButtonTitle: string = "No";
  private _onPositiveButtonPress: () => any = () => {};
  private _onNegativeButtonPress: () => any = () => {};

  constructor(message: string) {
    this._message = message;
  }

  setTitle(title: string) {
    this._title = title;
    return this;
  }

  setPositiveButtonTitle(title: string) {
    this._positiveButtonTitle = title;
    return this;
  }
  setNegativeButtonTitle(title: string) {
    this._negativeButtonTitle = title;
    return this;
  }

  onPositiveButtonPress(onPress: () => any) {
    this._onPositiveButtonPress = onPress;
    return this;
  }

  onNegativeButtonPress(onPress: () => any) {
    this._onNegativeButtonPress = onPress;
    return this;
  }

  show() {
    if (Platform.OS == "web") {
      const res = window.confirm(`${this._title}\n${this._message}`);
      if (res) this._onPositiveButtonPress();
      else this._onNegativeButtonPress();
    } else {
      Alert.alert(
        this._title,
        this._message,
        [
          {
            text: this._positiveButtonTitle,
            onPress: () => this._onPositiveButtonPress(),
          },
          {
            text: this._negativeButtonTitle,
            onPress: () => this._onNegativeButtonPress(),
          },
        ],
        { cancelable: false }
      );
    }
  }
}
/* #endregion */
