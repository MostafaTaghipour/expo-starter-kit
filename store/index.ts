import { appReducer } from "./app/reducer";
import { Middleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import Configs from "@app/constants/Configs";
import AsyncStorage from "@react-native-community/async-storage";
import { combineReducers } from "@reduxjs/toolkit";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { authReducer } from "./auth/reducer";
import { userReducer } from "./user/reducer";
import { configReducer } from "./config/reducer";



const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  user: userReducer,
  config: configReducer
});

export type RootState = ReturnType<typeof rootReducer>;

/* #region  MiddleWares */
let middleWares: Middleware[] = getDefaultMiddleware<RootState>({
  thunk: true,
  //@ts-ignore
  serializableCheck: false,
});

middleWares.push(thunk);

/* #region  Logger */
const logger = createLogger();
if (Configs.IS_DEBUG && Configs.LOG_REDUX_ACTIONS) {
  middleWares.push(logger);
}
/* #endregion */

/* #endregion */

/* #region  Persist */
const persistConfig: PersistConfig<RootState> = {
  key: "root",
  storage: AsyncStorage,
  whitelist: [],
  version: 0,
  //@ts-ignore
  timeout: null,
};
//@ts-ignore
const persistedReducer = persistReducer<AllStates>(persistConfig, rootReducer);
/* #endregion */

export const store = configureStore({
  reducer: persistedReducer,
  middleware: middleWares,
  devTools: Configs.IS_DEBUG,
});

export const persistor = persistStore(store);
