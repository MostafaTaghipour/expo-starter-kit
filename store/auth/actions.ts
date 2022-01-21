import { ResendOTPRequestBody, VerifyOTPRequestBody } from "./types";
import AuthApi from "@app/data/remote/AuthApi";
import {
  createAsyncAction,
  handleHttpError,
  isConnectToInternet,
} from "../helpers";
import Constants from "expo-constants";
import { Snack } from "@app/components/UIKit";
import I18N from "@app/helpers/I18N";
import { clearUserAction } from "../user/actions";
import { createAction } from "@reduxjs/toolkit";


export const authAsyncAction = createAsyncAction(
  "auth/authAsyncAction",
  (username) => AuthApi.authenticate({ username: username }),
  (_args, _dispatch) => isConnectToInternet(),
  undefined,
  (error) => handleHttpError(error)
);

export const verifyOTPAsyncAction = createAsyncAction(
  "auth/verifyOTPAsyncAction",
  (args: { registrationId: string; otp: string }, _dispatch, getState) => {
    const { registrationId, otp } = args;
    const requestId = getState().auth.requestId;
    const body: VerifyOTPRequestBody = {
      code: otp,
      username: registrationId,
      requestId: requestId!!,
      deviceId: Constants.deviceId || "",
      notificationToken: undefined, //TODO: send notification token
    };
    return AuthApi.verifyCode(body);
  },
  (_args, _dispatch) => isConnectToInternet(),
  (result, _arg, dispatch) => {
    const { refreshToken, token } = result.data;
    dispatch(setCredentialsAction({ accessToken: token, refreshToken }));
  },
  (error) => handleHttpError(error)
);

export const resendOTPAsyncAction = createAsyncAction(
  "auth/resendOTPAsyncAction",
  (registrationId: string, _dispatch, getState) => {
    const requestId = getState().auth.requestId;

    const body: ResendOTPRequestBody = {
      username: registrationId,
      requestId: requestId!!,
    };

    return AuthApi.resendCode(body);
  },
  (_args, _dispatch) => isConnectToInternet(),
  () =>
    Snack.show({
      text: I18N.t("auth.otp_resent"),
      actionText: I18N.t("got_it"),
      position: Snack.position.TOP,
    }),
  (error) => handleHttpError(error)
);

export const signoutAsyncAction = createAsyncAction(
  "auth/signoutAsyncAction",
  () => AuthApi.logout(),
  (_args, dispatch) => {
    //TODO: clear all data
    dispatch(signoutAction());
    dispatch(clearUserAction());

    return isConnectToInternet();
  }
);

export const signoutAction = createAction("auth/signoutAction");

export const setCredentialsAction = createAction<{
  accessToken: string;
  refreshToken: string;
}>("auth/setCredentialsAction");
