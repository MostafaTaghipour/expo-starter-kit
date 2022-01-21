import { Action } from "redux";
import { PostRequestState } from "../types";

export interface AuthToken {
  refreshToken: string;
  token: string;
}

export interface AuthRequestBody {
  username: string;
}

export interface AuthResponseBody {
  requestId: string;
}

export interface ResendOTPRequestBody {
  username: string;
  requestId: string;
}

export interface VerifyOTPRequestBody {
  code: string;
  username: string;
  requestId: string;
  deviceId: string;
  notificationToken?: string;
}

export interface VerifyOTPResponseBody extends AuthToken {
  isNewUser: boolean;
}

// state
export interface AuthState {
  sendOTP: PostRequestState;
  verifyOTP: PostRequestState;
  requestId?: string;
  isNewUser: boolean;
  accessToken?: string;
  refreshToken?: string;
}
