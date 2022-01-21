import { AuthState } from "./types";
import { Reducer } from "redux";
import createSecureStore from "redux-persist-expo-securestore";
import { persistReducer, PersistConfig } from "redux-persist";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { createReducer } from "@reduxjs/toolkit";


const initialState: AuthState = {
  sendOTP: {
    error: undefined,
    inProgress: false,
    done: false,
  },
  verifyOTP: {
    error: undefined,
    inProgress: false,
    done: false,
  },
  requestId: undefined,
  isNewUser: false,
};

const reducer = createReducer<AuthState>(initialState, (builder) =>
  builder

    /* #region  authentication */
    .addCase("auth/authAsyncAction_PENDING", (state) => {
      state.sendOTP.inProgress = true;
      state.sendOTP.done = false;
      state.verifyOTP.inProgress = false;
      state.verifyOTP.done = false;
      state.requestId = undefined;
    })
    .addCase("auth/authAsyncAction", (state, action) => {
      //@ts-ignore
      const { requestId } = action.payload?.result?.data;
      state.sendOTP.inProgress = false;
      state.sendOTP.done = true;
      state.sendOTP.error = undefined;
      state.requestId = requestId;
    })
    .addCase("auth/authAsyncAction_REJECTED", (state, action) => {
      //@ts-ignore
      state.sendOTP.error = action.payload.error;
      state.sendOTP.done = false;
    })
    .addCase("auth/authAsyncAction_FINISHED", (state) => {
      state.sendOTP.inProgress = false;
    })
    /* #endregion */

    /* #region  verify OTP */
    .addCase("auth/verifyOTPAsyncAction_PENDING", (state) => {
      state.verifyOTP.inProgress = true;
      state.verifyOTP.done = false;
    })
    .addCase("auth/verifyOTPAsyncAction", (state, action) => {
      //@ts-ignore
      const { isNewUser } = action.payload?.result?.data;

      state.verifyOTP.error = undefined;
      state.verifyOTP.done = true;
      state.isNewUser = isNewUser;
    })
    .addCase("auth/verifyOTPAsyncAction_REJECTED", (state, action) => {
      //@ts-ignore
      state.verifyOTP.error = action.payload.error;
      state.verifyOTP.done = false;
    })
    .addCase("auth/verifyOTPAsyncAction_FINISHED", (state) => {
      state.verifyOTP.inProgress = false;
    })
    /* #endregion */

    .addCase("auth/setCredentialsAction", (state, action) => {
      //@ts-ignore
      if (!action.payload) return;
      //@ts-ignore
      const { refreshToken, accessToken } = action.payload;

      state.refreshToken = refreshToken;
      state.accessToken = accessToken;
    })
    .addCase("auth/signoutAction", (state) => {
      return initialState;
    })
);

const storage = Platform.OS == "web" ? AsyncStorage : createSecureStore();

const persistConfig: PersistConfig<AuthState> = {
  key: "auth",
  storage: storage,
  whitelist: ["isLogedIn", "accessToken", "refreshToken"],
};

export const authReducer = persistReducer(persistConfig, reducer);
