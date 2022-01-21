import AuthApi from "@app/data/remote/AuthApi";
import { HttpError } from "@app/net/types";
import { Snack, Toast } from "@app/components/UIKit";
import I18N from "@app/helpers/I18N";
import {
  ActionCreatorWithPayload,
  createAction,
  Dispatch,
} from "@reduxjs/toolkit";
import { AsyncActionCreator, Await } from "./types";
import { store } from ".";
import {
  setCredentialsAction,
  signoutAction,
  signoutAsyncAction,
} from "./auth/actions";
import { clearUserAction } from "./user/actions";

export function createAsyncAction<
  ActionType extends string,
  PayloadCreator extends AsyncActionCreator<any, Dispatch, any, undefined>
>(
  type: ActionType,
  payloadCreator: PayloadCreator,
  before?: (
    args: Parameters<PayloadCreator>[0] | undefined,
    dispatch: any,
    getState: any,
    extra: any
  ) => boolean | undefined,
  onSuccess?: (
    result: Await<ReturnType<PayloadCreator>>,
    args: Parameters<PayloadCreator>[0] | undefined,
    dispatch: any,
    getState: any,
    extra: any
  ) => any,
  onFailur?: (
    error: any,
    args: Parameters<PayloadCreator>[0] | undefined,
    dispatch: any,
    getState: any,
    extra: any
  ) => any,
  after?: (
    args: Parameters<PayloadCreator>[0] | undefined,
    dispatch: any,
    getState: any,
    extra: any
  ) => any
) {
  type ActionParams = Parameters<PayloadCreator>[0];

  const fulfilled = createAction(type) as ActionCreatorWithPayload<
    { args: ActionParams; result: Await<ReturnType<PayloadCreator>> },
    ActionType
  >;

  const pending = createAction(type + "_PENDING") as ActionCreatorWithPayload<
    { args: ActionParams },
    string
  >;

  const finished = createAction(type + "_FINISHED") as ActionCreatorWithPayload<
    { args: ActionParams },
    string
  >;

  const rejected = createAction(type + "_REJECTED") as ActionCreatorWithPayload<
    { args: ActionParams; error: Error },
    string
  >;

  function actionCreator(args?: ActionParams) {
    return async (dispatch: any, getState: any, extra: any) => {
      try {
        const shouldContinuo = before
          ? before(args, dispatch, getState, extra)
          : true;
        if (shouldContinuo == false) return;

        dispatch(pending({ args }));
        const result: Await<ReturnType<PayloadCreator>> = await payloadCreator(
          args,
          dispatch,
          getState,
          extra
        );

        if (onSuccess) onSuccess(result, args, dispatch, getState, extra);
        dispatch(fulfilled({ args, result }));
      } catch (err) {
        if (onFailur) onFailur(err, args, dispatch, getState, extra);
        dispatch(rejected({ args, error: err }));
      } finally {
        if (after) after(args, dispatch, getState, extra);
        dispatch(finished({ args }));
      }
    };
  }

  actionCreator.pending = pending;
  actionCreator.rejected = rejected;
  actionCreator.fulfilled = fulfilled;
  actionCreator.finished = finished;

  return actionCreator;
}

export const handleHttpError = (error: any, showErrorMessage = true) => {
  const httpError = error as HttpError;
  if (httpError) {
    if (showErrorMessage)
      Toast.error({
        text: httpError.userMessage || I18N.t("error.net_general"),
      });
  }
};

export const isConnectToInternet = (showWarningMessage = true): boolean => {
  const connected = store.getState().app.isConnectToInternet;

  if (showWarningMessage && !connected) {
    Snack.show({
      text: I18N.t("error.no_internet"),
      actionText: I18N.t("got_it"),
    });
  }
  return connected;
};

export const signOut = () => {
  const _dispatch = store.dispatch;
  _dispatch(setCredentialsAction({ refreshToken: "", accessToken: "" }));
};

export const setCredentials = (token: string, refreshToken: string) => {
  const _dispatch = store.dispatch;
  _dispatch(setCredentialsAction({ accessToken: token, refreshToken }));
};

export const getRefreshToken = () => store.getState().auth.refreshToken;
export const getAccessToken = () => store.getState().auth.accessToken;
