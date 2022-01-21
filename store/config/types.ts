
export interface ConfigState {
  appVersion?: AppVersion;
}

export interface AppVersion {
  buildNumber: number;
  description?: string;
  force: boolean;
  name: string;
  url: string;
}
