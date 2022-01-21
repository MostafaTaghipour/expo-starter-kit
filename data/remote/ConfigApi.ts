import { AxiosResponse } from "axios";
import ApiClient from "@app/net/apiClient";
import { AppVersion } from "@app/store/config/types";

export default class ConfigApi {
  private static CONTROLLER = "Config";

  static appLastVersion(): Promise<AxiosResponse<AppVersion>> {
    return ApiClient.get(`${this.CONTROLLER}/appVersion`);
  }
}
