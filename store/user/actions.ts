import UserApi from "@app/data/remote/UserApi";
import { createAction } from "@reduxjs/toolkit";
import {
  createAsyncAction,
  handleHttpError,
  isConnectToInternet,
} from "../helpers";
import { UpdateUserRequestBody } from "./types";

export const updateUserAsyncAction = createAsyncAction(
  "user/updateUserAsyncAction",
  (body: UpdateUserRequestBody) => UserApi.put(body),
  (_args, _dispatch, getState) => isConnectToInternet(),
  undefined,
  (error) => handleHttpError(error)
);


export const fetchUserAsyncAction = createAsyncAction(
  "user/fetchUserAsyncAction",
  () => UserApi.get(),
  (_args, _dispatch, getState) => isConnectToInternet(),
  undefined,
  (error) => handleHttpError(error)
);

export const clearUserAction = createAction("user/clearUserAction");