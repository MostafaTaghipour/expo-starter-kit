// state
export interface AppState {
  isConnectToInternet: boolean;
  lastRunningSessionId?: string;
  appRunningCount: number;
  ignoreThisAppVersionUpdate?: number;
  ignoreThisAppSessionUpdate?: string;
}
