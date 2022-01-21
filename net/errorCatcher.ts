import { AxiosError, AxiosResponse, AxiosInstance } from "axios";
import HttpStatusCode, { HttpError } from "./types";

import AuthApi from "@app/data/remote/AuthApi";

import { getRefreshToken, setCredentials, signOut } from "@app/store/helpers";

const responseInterceptor = (response: AxiosResponse) => {
  // write down your request intercept.
  return response;
};

const errorInterceptor = (webApi: AxiosInstance, err: AxiosError<any>) => {
  var res: Error = err;

  if (
    err.isAxiosError &&
    err.response != undefined &&
    err.response.data != undefined
  ) {
    //@ts-ignore
    const httpError: HttpError = {
      userMessage: err.response.data.message,
      developerMessage: err.response.data.developerMessage,
      moreInfo: err.response.data.moreInfo,
      errorCode: err.response.data.code,
      statusCode: err.response.status,
      originalError: err,
    };
    res = httpError;

    if (httpError.statusCode == HttpStatusCode.Unauthorized)
      return resetTokenAndReattemptRequest(webApi, httpError);
  }

  return Promise.reject(res);
};

export default {
  response: responseInterceptor,
  error: errorInterceptor,
};

/************** REFRESH TOKEN *************/
let isAlreadyFetchingAccessToken = false;
type oldRequestCallback = () => any;
const MAX_RETRY = 3;
let retryCounter = 0;
// This is the list of waiting requests that will retry after the JWT refresh complete
let subscribers: oldRequestCallback[] = [];

const resetTokenAndReattemptRequest = async (
  webApi: AxiosInstance,
  error: HttpError
): Promise<any> => {
  try {
    // check if retry not more then max retry
    if (retryCounter > MAX_RETRY) {
      retryCounter = 0;
      return Promise.reject(error);
    }

    // Your own mechanism to get the refresh token to refresh the JWT token
    var refresh = getRefreshToken();

    if (!refresh) {
      // We can't refresh, throw the error anyway
      signOut();
      return Promise.reject(error);
    }

    // increase retry cou
    retryCounter = retryCounter + 1;

    /* Proceed to the token refresh procedure
			We create a new Promise that will retry the request,
			clone all the request configuration from the failed
			request in the error object. */

    const retryOriginalRequest = new Promise((resolve) => {
      /* We need to add the request retry to the queue
					since there another request that already attempt to
					refresh the token */
      addSubscriber(() => {
        resolve(webApi(error.originalError.config));
      });
    });

    if (!isAlreadyFetchingAccessToken) {
      isAlreadyFetchingAccessToken = true;

      const response = await AuthApi.refreshToken(refresh);

      const newToken = response.data.token;
      const newRefreshToken = response.data.refreshToken;

      if (!newToken) {
        signOut();
        return Promise.reject(error);
      }

      setCredentials(newToken, newRefreshToken);

      isAlreadyFetchingAccessToken = false;
      retryCounter = 0
      onAccessTokenFetched();
    }
    return retryOriginalRequest;
  } catch (err) {
    return Promise.reject(err);
  }
};

const onAccessTokenFetched = () => {
  // When the refresh is successful, we start retrying the requests one by one and empty the queue
  subscribers.forEach((callback) => {
    callback();
  });
  subscribers = [];
};

const addSubscriber = (callback: oldRequestCallback) => {
  subscribers.push(callback);
};
