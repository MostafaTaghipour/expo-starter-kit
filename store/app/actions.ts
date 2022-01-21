import { createAction } from "@reduxjs/toolkit";
import { store } from "..";
import { actions } from "./reducer";

export const { setConnectivityStatusAction } = actions;

export const setAppRunningCountAndLastRunningSessionIdAction = (
  sessionId: string
) => {
  return (dispatch: any) => {
    const lastRunningSessionId = store.getState().app.lastRunningSessionId;
    const appRunningCount = store.getState().app.appRunningCount || 0;

    const count =
      lastRunningSessionId != sessionId ? appRunningCount + 1 : appRunningCount;
    dispatch(
      actions.setAppRunningCountAndLastRunningSessionIdAction({
        sessionId,
        appRunningCount: count,
      })
    );
  };
};

export const ignoreThisAppSessionUpdateAction = createAction<string>(
  "config/ignoreThisAppSessionUpdateAction"
);

export const ignoreThisAppVersionUpdateAction = createAction<number>(
  "config/ignoreThisAppVersionUpdateAction"
);
