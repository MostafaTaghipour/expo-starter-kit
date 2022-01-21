import ConfigApi from "@app/data/remote/ConfigApi";
import {
  createAsyncAction,
  handleHttpError,
  isConnectToInternet,
} from "../helpers";


export const getAppLastVersionAsyncAction = createAsyncAction(
  "config/getAppLastVersionAsyncAction",
  () => ConfigApi.appLastVersion(),
  (_args, _dispatch, getState) => isConnectToInternet(),
  undefined,
  (error) => handleHttpError(error)
);

