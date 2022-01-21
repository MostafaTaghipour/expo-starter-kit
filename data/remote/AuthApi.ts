import {
  AuthRequestBody,
  AuthResponseBody,
  VerifyOTPRequestBody,
  VerifyOTPResponseBody,
  ResendOTPRequestBody,
  AuthToken,
} from "@app/store/auth/types";
import { AxiosResponse } from "axios";
import ApiClient from "@app/net/apiClient";

export default class AuthApi {
  private static CONTROLLER = "Authentication";

  static authenticate(
    body: AuthRequestBody
  ): Promise<AxiosResponse<AuthResponseBody>> {
    return ApiClient.post(this.CONTROLLER, body);
  }

  static verifyCode(
    body: VerifyOTPRequestBody
  ): Promise<AxiosResponse<VerifyOTPResponseBody>> {
    return ApiClient.post(`${this.CONTROLLER}/verifyOTP`, body);
  }

  static resendCode(body: ResendOTPRequestBody): Promise<AxiosResponse<any>> {
    return ApiClient.post(`${this.CONTROLLER}/resendOTP`, body);
  }

  static refreshToken(refreshToken: string): Promise<AxiosResponse<AuthToken>> {
    return ApiClient.post<AuthToken>(`${this.CONTROLLER}/refreshToken`, {
      refreshToken,
    });
  }

  static logout(): Promise<AxiosResponse<any>> {
    return ApiClient.post(`${this.CONTROLLER}/logout`);
  }
}
