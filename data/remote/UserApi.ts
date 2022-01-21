import { AxiosResponse } from "axios";
import ApiClient from "@app/net/apiClient";
import { UpdateUserRequestBody, User } from "@app/store/user/types";

export default class UserApi {
  private static CONTROLLER = "User";

  static put(body: UpdateUserRequestBody): Promise<AxiosResponse<User>> {
    return ApiClient.put(this.CONTROLLER, body);
  }

  static get(): Promise<AxiosResponse<User>> {
    return ApiClient.get(this.CONTROLLER);
  }
}
