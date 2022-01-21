import AsyncStorage from "@react-native-community/async-storage";
import { persistReducer, PersistConfig } from "redux-persist";
import { createReducer } from "@reduxjs/toolkit";
import { ConfigState } from "./types";
import { getAppLastVersionAsyncAction } from "./actions";

const initialState: ConfigState = {};
const reducer = createReducer<ConfigState>(
  initialState,
  (builder) =>
    builder

      /* #region  app version */
      .addCase(getAppLastVersionAsyncAction.fulfilled, (state, action) => {
        state.appVersion = action.payload.result.data;
      })
  /* #endregion */
);

const persistConfig: PersistConfig<ConfigState> = {
  key: "config",
  storage: AsyncStorage,
  // whitelist: ["user", "userAchievements"],
};

export const configReducer = persistReducer(persistConfig, reducer);
