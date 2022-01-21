import { FilterExpression, ListRequestOption } from "@app/net/types";
import {
  Action,
  ActionCreatorWithPayload,
  createAction,
  Dispatch,
  ThunkAction,
} from "@reduxjs/toolkit";
import { RootState, store } from ".";

export type Await<T> = T extends {
  then(onfulfilled?: (value: infer U) => unknown): unknown;
}
  ? U
  : T;

export type AsyncActionCreator<
  A,
  D extends Dispatch,
  S extends any,
  E extends any
> = (args: A, dispatch: D, getState: () => S, extra: E) => any;

export interface GetRequestState<T = any> {
  data?: T;
  error?: any;
  loading: boolean;
  loaded: boolean;
}
export interface GetPaginationRequestState<T = any> extends GetRequestState<T> {
  page: number;
  total: number;
}

export interface PostRequestState<T = any> {
  data?: T;
  error?: any;
  inProgress: boolean;
  done: boolean;
}
