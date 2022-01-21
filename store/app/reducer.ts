import { AppState } from "./types";
import { persistReducer, PersistConfig } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AppState = {
  isConnectToInternet: true,
  appRunningCount: 0,
};
const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setConnectivityStatusAction(state, { payload }: PayloadAction<boolean>) {
      state.isConnectToInternet = payload;
    },
    setAppRunningCountAndLastRunningSessionIdAction(
      state,
      { payload }: PayloadAction<{ sessionId: string; appRunningCount: number }>
    ) {
      state.lastRunningSessionId = payload.sessionId;
      state.appRunningCount = payload.appRunningCount;
    },
    ignoreThisAppSessionUpdateAction(state, action) {
      const sessionId: string = action.payload;
      state.ignoreThisAppSessionUpdate = sessionId;
    },
    ignoreThisAppVersionUpdateAction(state, action) {
      const version: number = action.payload;
      state.ignoreThisAppVersionUpdate = version;
    },
  },
});

export const actions = appSlice.actions;

const persistConfig: PersistConfig<AppState> = {
  key: appSlice.name,
  storage: AsyncStorage,
  blacklist: ["isConnectToInternet"],
};

export const appReducer = persistReducer(persistConfig, appSlice.reducer);
