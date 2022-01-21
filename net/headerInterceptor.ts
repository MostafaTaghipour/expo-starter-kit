import constants from "@app/constants";
import I18N from "@app/helpers/I18N";
import { getAccessToken } from "@app/store/helpers";
import { AxiosRequestConfig } from "axios";

import userAgent from "./userAgent";

const requestInterceptor = (request: AxiosRequestConfig) => {
  request.headers = requestHeaders(request.headers);
  return request;
};

export default {
  request: requestInterceptor,
};

export const requestHeaders = (def = {}) => {
  var headers = {
    ...def,
  };

  const token = getAccessToken();
  const lang = I18N.locale;
  const ua = userAgent.getUserAgent();

  headers = {
    ...headers,
    [constants.HEADER_LANG_KEY]: lang,
  };

  if (ua)
    headers = {
      ...headers,
      [constants.HEADER_USER_AGENT_KEY]: ua,
    };

  if (token)
    headers = {
      ...headers,
      [constants.HEADER_AUTH_TOKEN_KEY]: `${token}`,
    };

  return headers;
};
