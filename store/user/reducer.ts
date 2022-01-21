import AsyncStorage from "@react-native-community/async-storage";
import { Reducer } from "redux";
import createSecureStore from "redux-persist-expo-securestore";
import { persistReducer, PersistConfig } from "redux-persist";
import { Platform } from "react-native";
import { UserState } from "./types";
import { createReducer } from "@reduxjs/toolkit";
import {
  clearUserAction,
  fetchUserAsyncAction,
  updateUserAsyncAction,
} from "./actions";

const initialState: UserState = {
  updateUser: {
    error: undefined,
    inProgress: false,
    done: false,
  },

  user: {
    data: undefined,
    error: undefined,
    loading: false,
    loaded: false,
  },
  
};
const reducer = createReducer<UserState>(initialState, (builder) =>
  builder

    /* #region  update user */
    .addCase(updateUserAsyncAction.pending, (state) => {
      state.updateUser.inProgress = true;
    })
    .addCase(updateUserAsyncAction.fulfilled, (state, action) => {
      state.updateUser.done = true;
      state.updateUser.error = undefined;
      state.user.data = action.payload.result.data;
    })
    .addCase(updateUserAsyncAction.rejected, (state, action) => {
      state.updateUser.error = action.payload.error;
    })
    .addCase(updateUserAsyncAction.finished, (state) => {
      state.updateUser.inProgress = false;
    })
    /* #endregion */

    /* #region  fetch user */
    .addCase(fetchUserAsyncAction.pending, (state) => {
      state.user.loading = true;
      state.user.loaded = false;
    })
    .addCase(fetchUserAsyncAction.fulfilled, (state, action) => {
      state.user.data = action.payload.result.data;
      state.user.loaded = true;
      state.user.error = undefined;
    })
    .addCase(fetchUserAsyncAction.rejected, (state, action) => {
      state.user.error = action.payload.error;
      state.user.loaded = false;
    })
    .addCase(fetchUserAsyncAction.finished, (state) => {
      state.user.loading = false;
    })
    /* #endregion */

    .addCase(clearUserAction, (state, action) => {
      return initialState;
    })
);

const storage = Platform.OS == "web" ? AsyncStorage : createSecureStore();

const persistConfig: PersistConfig<UserState> = {
  key: "user",
  storage: storage,
  whitelist: ["user"],
};

export const userReducer = persistReducer(persistConfig, reducer);
