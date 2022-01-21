import axios, { AxiosInstance, Method } from "axios";
import logger from "./logger";
import errorCatcher from "./errorCatcher";
import headerInterceptor from "./headerInterceptor";
import mocker from "./mocker";
import { addMockData } from "../data/mock";
import Configs from "@app/constants/Configs";


// set base url
const ApiClient: AxiosInstance = axios.create({
  baseURL: Configs.API_URL,
});

// set request timeout
ApiClient.defaults.timeout = Configs.NETWORK_REQUEST_TIMEOUT_IN_SEC * 1000;

// enable request logger
if (Configs.LOG_NETWORK_REQUEST && Configs.IS_DEBUG)
  ApiClient.interceptors.request.use(logger.request, logger.error);

// use header intercepter for adding headers like token language and ...
ApiClient.interceptors.request.use(headerInterceptor.request);

// use mock intercepter for mock data
if (Configs.USE_MOCK_DATA) {
  ApiClient.interceptors.request.use(mocker.requestInterceptor, (error) =>
    Promise.reject(error)
  );

  ApiClient.interceptors.response.use(
    mocker.responseInterceptor,
    mocker.errorInterceptor
  );
}

// enable response logger
if (Configs.LOG_NETWORK_REQUEST && Configs.IS_DEBUG)
  ApiClient.interceptors.response.use(logger.response, logger.error);

// use error cacher
ApiClient.interceptors.response.use(errorCatcher.response, (error) =>
  errorCatcher.error(ApiClient, error)
);

// enabel mock data
if (Configs.USE_MOCK_DATA) {
  addMockData();
  mocker.enableMocking();
}

export default ApiClient;
