import { AuthResponseBody, VerifyOTPResponseBody } from "@app/store/auth/types";

const authResponse: AuthResponseBody = {
  requestId: "aaaaaa",
};

const verifyResponse: VerifyOTPResponseBody = {
  token: "TOKEN",
  refreshToken: "REFRESH_TOKEN",
  isNewUser: true,
};

export default {
  authResponse,
  verifyResponse,
};
